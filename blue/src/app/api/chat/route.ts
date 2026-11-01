// Chatbot de Blue: recibe la conversación, arma el contexto con datos reales de Supabase y pregunta a Groq.
// La clave GROQ_API_KEY se lee SOLO aquí (servidor). Nunca debe llevar el prefijo NEXT_PUBLIC_.
import { NextResponse } from "next/server";
import { getCentros, getPlasticosDetalle } from "../../data/db";

// Modelo de Groq (fácil de cambiar). llama-3.3-70b-versatile se apagó el 16/08/2026 para cuentas gratis;
// Groq recomienda openai/gpt-oss-120b como reemplazo. Lista vigente: https://console.groq.com/docs/models
const MODELO = "openai/gpt-oss-120b";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const MAX_CARACTERES = 500; // largo máximo de cada mensaje
const MAX_HISTORIAL = 6; // últimos mensajes que se envían a Groq
const LIMITE_POR_MINUTO = 10; // peticiones por IP

type Mensaje = { role: "user" | "assistant"; content: string };

// Límite simple por IP, en memoria (se reinicia si el servidor se reinicia; suficiente para un proyecto)
const visitas = new Map<string, number[]>();
function superaLimite(ip: string) {
  const ahora = Date.now();
  const recientes = (visitas.get(ip) ?? []).filter((t) => ahora - t < 60_000);
  recientes.push(ahora);
  visitas.set(ip, recientes);
  if (visitas.size > 5000) visitas.clear(); // evita que el mapa crezca sin fin
  return recientes.length > LIMITE_POR_MINUTO;
}

function error(mensaje: string, status: number) {
  return NextResponse.json({ error: mensaje }, { status });
}

// Valida el cuerpo: { mensajes: [{ role, content }] } y se queda con los últimos MAX_HISTORIAL
function validar(cuerpo: unknown): Mensaje[] | string {
  const lista = (cuerpo as { mensajes?: unknown })?.mensajes;
  if (!Array.isArray(lista) || lista.length === 0) return "Escribe una pregunta.";
  const mensajes = lista.slice(-MAX_HISTORIAL);
  for (const m of mensajes) {
    if (!m || (m.role !== "user" && m.role !== "assistant") || typeof m.content !== "string") return "Formato de mensaje no válido.";
    if (m.content.trim().length === 0) return "El mensaje está vacío.";
    if (m.content.length > MAX_CARACTERES) return `El mensaje supera ${MAX_CARACTERES} caracteres.`;
  }
  if (mensajes[mensajes.length - 1].role !== "user") return "El último mensaje debe ser tuyo.";
  return mensajes.map((m) => ({ role: m.role, content: m.content.trim() }));
}

// Contexto compacto con los datos reales de Blue (centros + plásticos con ficha)
async function contexto() {
  const [centros, plasticos] = await Promise.all([getCentros(), getPlasticosDetalle()]);
  const p = plasticos.map((x) => {
    const f = x.ficha;
    const ficha = f
      ? ` | densidad ${f.densidad} g/cm³, ${f.flota ? "flota" : "no flota"} en agua, fusión ${f.fusion}, reciclabilidad ${f.reciclabilidad} (${f.reciclabilidad_nota})`
      : "";
    return `- ${x.id} (${x.codigo}) [/plasticos/${x.id}]: ${x.descripcion_corta} Origen postindustrial: ${x.origen_postindustrial}. Usos del reciclado: ${x.usos_reciclado.join(", ")}${ficha}`;
  });
  const c = centros.map((x) =>
    `- ${x.nombre_organizacion} [/centros/${x.id}]${x.id === "manpoplast" ? " (ALIADO PRINCIPAL de Blue, ver /aliado-principal)" : ""}: ${x.categoria === "acopio" ? "centro de acopio" : "transformador"}, ${x.tipo_entidad}. ` +
    `Dirección: ${x.contacto.direccion}. Teléfono: ${x.contacto.telefono}. Horario: ${x.horario}. ` +
    `Recibe: ${x.plasticos_aceptados.join(", ") || "sin dato"}. Persona natural: ${x.persona_natural}. Empresa: ${x.empresa}. ` +
    `Servicios B2B: ${x.servicios_b2b.join("; ") || "sin dato"}. ${x.datos_confirmados ? "Datos confirmados." : "DATOS ESTIMADOS (plásticos y cantidades por confirmar)."}`
  );
  return `PLÁSTICOS:\n${p.join("\n")}\n\nCENTROS EN BUCARAMANGA:\n${c.join("\n")}`;
}

const INSTRUCCIONES = `Eres el asistente de Blue, una plataforma del proyecto integrador de la Universidad Santo Tomás Bucaramanga que conecta plásticos postindustriales con centros de acopio y transformadores de Bucaramanga.
Reglas:
- Responde SOLO sobre Blue: plásticos postindustriales, tipos de plástico y sus fichas técnicas, centros de acopio y transformadores de Bucaramanga, qué recibe cada centro y el aliado principal (Manpoplast S.A.S).
- Usa ÚNICAMENTE los DATOS de abajo. Nunca inventes teléfonos, direcciones, horarios, precios ni cantidades.
- Si la pregunta es de otro tema, di amablemente que solo puedes ayudar con temas de Blue.
- Si los datos no alcanzan para responder, di que no lo sabes y sugiere llamar al centro (usando el teléfono que aparece en los datos, si existe).
- Si usas un dato marcado como ESTIMADO, avisa que debe confirmarse con el centro.
- Responde en español, corto (máximo 4 frases o una lista breve), con tono amable. Cita los nombres de los centros o plásticos y, cuando puedas, su enlace interno tal como aparece en los datos (por ejemplo /centros/ID o /plasticos/ID).
- No uses tablas ni encabezados; texto simple.

DATOS:
`;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "local";
  if (superaLimite(ip)) return error("Estás enviando muchos mensajes. Espera un minuto e inténtalo de nuevo.", 429);

  let cuerpo: unknown;
  try {
    cuerpo = await req.json();
  } catch {
    return error("Petición no válida.", 400);
  }
  const mensajes = validar(cuerpo);
  if (typeof mensajes === "string") return error(mensajes, 400);

  const clave = process.env.GROQ_API_KEY;
  if (!clave) return error("El chat no está configurado todavía (falta GROQ_API_KEY en el servidor).", 503);

  let datos: string;
  try {
    datos = await contexto();
  } catch {
    return error("No pude leer los datos de Blue en este momento. Intenta más tarde.", 503);
  }

  try {
    const r = await fetch(GROQ_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${clave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODELO,
        messages: [{ role: "system", content: INSTRUCCIONES + datos }, ...mensajes],
        temperature: 0.2,
        max_completion_tokens: 1024,
        reasoning_effort: "low",
      }),
      signal: AbortSignal.timeout(30_000),
    });
    if (r.status === 429) return error("El asistente está muy ocupado (límite de Groq). Intenta en un minuto.", 429);
    if (r.status === 401) return error("La clave de Groq no es válida. Revisa GROQ_API_KEY.", 503);
    if (!r.ok) {
      console.error("Groq respondió", r.status, await r.text().catch(() => ""));
      return error("El asistente no pudo responder. Intenta de nuevo.", 502);
    }
    const j = await r.json();
    const respuesta: string | undefined = j?.choices?.[0]?.message?.content?.trim();
    if (!respuesta) return error("El asistente no devolvió respuesta. Intenta de nuevo.", 502);
    return NextResponse.json({ respuesta });
  } catch (e) {
    console.error("Error llamando a Groq:", e);
    return error("No hay conexión con el asistente (revisa tu internet). Intenta de nuevo.", 504);
  }
}
