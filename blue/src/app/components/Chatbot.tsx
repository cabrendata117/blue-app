"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Mensaje = { role: "user" | "assistant"; content: string };

const MAX_CARACTERES = 500;
const BIENVENIDA: Mensaje = {
role: "assistant",
content: "¡Hola! Soy el asistente de Blue. Pregúntame por tipos de plástico, sus fichas técnicas o qué centros de Bucaramanga los reciben.",
};

// Convierte los enlaces internos (/centros/ID, /plasticos/ID, /aliado-principal) en links clicables
function ConEnlaces({ texto }: { texto: string }) {
const partes = texto.split(/(\/(?:centros|plasticos)\/[A-Za-z0-9-]+|\/aliado-principal)/g);
return (
    <>
    {partes.map((p, i) =>
        i % 2 === 1
        ? <Link key={i} href={p} className="font-semibold text-blue-700 underline">{p}</Link>
        : <span key={i}>{p}</span>
    )}
    </>
);
}

// Botón flotante + panel de chat. Se carga en el layout para que aparezca en todas las páginas.
export default function Chatbot() {
const [abierto, setAbierto] = useState(false);
const [mensajes, setMensajes] = useState<Mensaje[]>([BIENVENIDA]);
const [texto, setTexto] = useState("");
const [cargando, setCargando] = useState(false);
const fin = useRef<HTMLDivElement>(null);
const entrada = useRef<HTMLTextAreaElement>(null);

useEffect(() => { fin.current?.scrollIntoView({ behavior: "smooth" }); }, [mensajes, cargando]);
useEffect(() => { if (abierto) entrada.current?.focus(); }, [abierto]);

async function enviar() {
    const pregunta = texto.trim();
    if (!pregunta || cargando) return;
    const nuevos: Mensaje[] = [...mensajes, { role: "user", content: pregunta }];
    setMensajes(nuevos);
    setTexto("");
    setCargando(true);
    try {
    const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // La bienvenida no se envía; el servidor además recorta a los últimos 6 mensajes
        body: JSON.stringify({ mensajes: nuevos.slice(1).slice(-6) }),
    });
    const j = await r.json().catch(() => ({}));
    const respuesta = r.ok ? j.respuesta : j.error ?? "Algo falló. Intenta de nuevo.";
    setMensajes((m) => [...m, { role: "assistant", content: respuesta }]);
    } catch {
    setMensajes((m) => [...m, { role: "assistant", content: "No hay conexión. Revisa tu internet e intenta de nuevo." }]);
    } finally {
    setCargando(false);
    }
}

return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
    {abierto && (
        <section role="dialog" aria-label="Chat de Blue"
        className="mb-3 flex h-[min(32rem,75vh)] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl"
        onKeyDown={(e) => e.key === "Escape" && setAbierto(false)}>
        <header className="flex items-center justify-between bg-blue-950 px-4 py-3 text-white">
            <div>
            <p className="font-bold">Asistente Blue</p>
            <p className="text-xs text-blue-200">Plásticos y centros de Bucaramanga</p>
            </div>
            <button type="button" onClick={() => setAbierto(false)} aria-label="Cerrar chat"
            className="rounded-lg px-2 py-1 text-xl leading-none hover:bg-blue-800">×</button>
        </header>

        <div className="flex-1 space-y-3 overflow-y-auto bg-blue-50 p-4 text-sm" aria-live="polite">
            {mensajes.map((m, i) => (
            <p key={i} className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 ${m.role === "user" ? "ml-auto bg-blue-600 text-white" : "bg-white text-gray-800 shadow-sm"}`}>
                {m.role === "assistant" ? <ConEnlaces texto={m.content} /> : m.content}
            </p>
            ))}
            {cargando && <p className="w-fit rounded-2xl bg-white px-3 py-2 text-gray-500 shadow-sm">Escribiendo…</p>}
            <div ref={fin} />
        </div>

        <form className="border-t border-blue-100 p-3" onSubmit={(e) => { e.preventDefault(); enviar(); }}>
            <div className="flex items-end gap-2">
            <label htmlFor="chat-blue" className="sr-only">Escribe tu pregunta</label>
            <textarea id="chat-blue" ref={entrada} rows={2} value={texto} maxLength={MAX_CARACTERES}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviar(); } }}
                placeholder="Ej: ¿Quién recibe LDPE?"
                className="flex-1 resize-none rounded-lg border border-blue-200 px-3 py-2 text-sm focus:border-blue-600 focus:outline-none" />
            <button type="submit" disabled={cargando || !texto.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50">Enviar</button>
            </div>
            <p className="mt-1 text-right text-[11px] text-gray-400">{texto.length}/{MAX_CARACTERES} · Enter para enviar</p>
        </form>
        </section>
    )}

    <button type="button" onClick={() => setAbierto((a) => !a)} aria-expanded={abierto}
        aria-label={abierto ? "Cerrar chat de Blue" : "Abrir chat de Blue"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300">
        {abierto ? "×" : "💬"}
    </button>
    </div>
);
}
