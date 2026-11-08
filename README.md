# Blue — Conectando hoy el plástico del mañana

Plataforma web que centraliza información sobre **plásticos postindustriales** y los **centros de acopio y transformadores** de Bucaramanga, tomando como punto de referencia la Universidad Santo Tomás (USTA) Bucaramanga.

> Proyecto integrador 2026-2 · Ingeniería Mecatrónica · Universidad Santo Tomás, Seccional Bucaramanga

---

## 1. ¿Qué problema resuelve?

Las fábricas generan recortes, rebabas y sobrantes de plástico que nunca llegaron a un consumidor (plástico **postindustrial**). Es un material limpio y fácil de reciclar, pero hoy es difícil saber:

- qué tipo de plástico es y cómo se recicla,
- qué centros lo reciben y en qué cantidades,
- cuáles solo lo acopian y cuáles lo transforman,
- qué tan lejos está cada centro.

Según Vanguardia (2025), solo cerca del 3,6 % de los residuos sólidos del Área Metropolitana de Bucaramanga se reutiliza. Blue reúne esa información en un solo lugar.

**Postindustrial vs. postconsumo**

| | Postindustrial | Postconsumo |
|---|---|---|
| Origen | Sale de la fábrica durante la producción | Lo usó una persona |
| Ejemplos | Film sobrante, rebabas de inyección, canecas con defecto, recortes de tubería | Botellas de gaseosa, bolsas de papas, tapas |

## 2. Funcionalidades

- **Inicio:** explicación del problema, diferencia postindustrial/postconsumo y el ciclo del plástico (generación → acopio → transformación).
- **Plásticos:** catálogo con ficha técnica de cada polímero: densidad (flota o se hunde), punto de fusión, índice de fluidez (MFI), banda NIR, reciclabilidad, proceso de reciclaje, diferencias por color, ejemplos y usos al reciclarlo.
- **Centros:** catálogo separado en **centros de acopio** (solo reciben y compran) y **transformadores** (procesan o fabrican producto nuevo), con distancia en línea recta desde la USTA.
- **Mapa de cercanía:** mapa con radio ajustable (1–15 km) y filtros Todos / Acopio / Transformadores.
- **Detalle de cada centro:** dirección, teléfono, horario, plásticos que recibe, cantidades mínimas y máximas para persona natural y empresa, servicios B2B, botón "Abrir en Maps" y "Ruta desde la USTA".
- **Aliado principal:** pestaña dedicada a la planta transformadora visitada, con fotos, videos y una descripción basada en la visita.
- **Chatbot:** asistente que responde preguntas sobre plásticos y centros usando los datos de la base de datos.

## 3. Tecnologías

| Capa | Herramienta |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Base de datos | Supabase (PostgreSQL) |
| Mapas | Leaflet + react-leaflet + OpenStreetMap |
| Chatbot | API de Groq (modelo de lenguaje) |
| Despliegue | Render |

## 4. Estructura del proyecto

```
blue/
├── public/
│   ├── logo_Blue.jpeg
│   ├── images/
│   │   ├── landing/        generacion.jpg, acopio.jpg, transformacion.jpg
│   │   ├── centros/        <id-del-centro>.jpg
│   │   ├── plasticos/      <id>.jpg y <id>-ejemplo-1..3.jpg
│   │   └── aliado/         portadas de los videos
│   └── videos/             videos del aliado principal
├── supabase/
│   └── blue_base_de_datos.sql      tablas, políticas y datos iniciales
└── src/app/
    ├── page.tsx                    inicio
    ├── plasticos/                  lista y /[id]
    ├── centros/                    lista con mapa y /[id]
    ├── aliado-principal/           fotos y videos de la visita
    ├── api/chat/route.ts           ruta del chatbot (servidor)
    ├── components/                 Header, Footer, Foto, MapaCentros, MapaLeaflet, Chatbot
    └── data/
        ├── config.ts               ubicación de la USTA y distancia (Haversine)
        ├── tipos.ts                tipos TypeScript
        ├── mapeo.ts                filas de la base de datos → objetos de la app
        └── db.ts                   consultas a Supabase
```

## 5. Base de datos

Cuatro tablas normalizadas en Supabase:

| Tabla | Contenido |
|---|---|
| `plasticos` | Nombre, código, descripciones, origen postindustrial, usos al reciclar, imagen |
| `fichas_tecnicas` | Densidad, fusión, MFI, NIR, reciclabilidad, colores, proceso, ejemplos |
| `centros` | Datos de contacto, coordenadas, categoría, servicios B2B, mínimos y máximos, horario, imagen, `datos_confirmados` |
| `centros_plasticos` | Relación entre centros y plásticos que reciben |

Las tablas tienen seguridad por filas (RLS) con política de **solo lectura pública**. La app usa únicamente la clave pública (*publishable*).

## 6. Instalación local

Requisitos: Node.js 20 o superior y una cuenta de Supabase.

1. **Instala las dependencias**
   ```bash
   cd blue
   npm install
   ```
2. **Crea la base de datos:** en Supabase abre *SQL Editor*, pega el contenido de `supabase/blue_base_de_datos.sql` y ejecútalo. Si agregaste el aliado principal, ejecuta también su script SQL.
3. **Crea el archivo `.env.local`** junto a `package.json` (usa `.env.local.example` como guía):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
   GROQ_API_KEY=tu_clave_de_groq
   ```
   `GROQ_API_KEY` **no** lleva el prefijo `NEXT_PUBLIC_`, para que la clave quede solo en el servidor.
4. **Ejecuta el proyecto**
   ```bash
   npm run dev
   ```
   Abre http://localhost:3000. Reinicia el servidor cada vez que cambies `.env.local`.

## 7. Despliegue en Render

1. Sube el proyecto a GitHub (el archivo `.env.local` **no** se sube).
2. En Render crea un *Web Service* desde el repositorio.
3. Comandos: build `npm install && npm run build`, start `npm start`.
4. En *Environment* agrega las tres variables del paso 6.

## 8. Datos: qué está confirmado y qué no

Este proyecto distingue entre datos verificados y estimados:

- Los centros con `datos_confirmados = false` muestran el aviso *"dato estimado, pendiente de confirmar con el centro"*.
- Los **plásticos aceptados**, las **cantidades mínimas y máximas**, algunos servicios y los **horarios** de varios centros son estimaciones y deben confirmarse llamando al centro.
- Las **coordenadas** son aproximadas (se obtuvieron de las direcciones) y la ubicación de la USTA también es aproximada.
- Las **bandas NIR** y los valores de las fichas técnicas son **valores típicos**; cambian según el grado y el fabricante.
- Las imágenes marcadas como *"Imagen hecha con IA"* o *"Imagen de referencia"* no son fotos reales del lugar.
- La descripción del aliado principal se basa en lo observado en fotos y videos de la visita.

## 9. Limitaciones y trabajo futuro

- [ ] Ampliar el catálogo a 50 o más plásticos con ficha técnica y foto (hoy son 14).
- [ ] Inicio de sesión que distinga **persona natural** y **empresa**, mostrando los mínimos y máximos que le corresponden.
- [ ] Filtros por densidad y color en la página de Plásticos.
- [ ] Confirmar por teléfono los datos de cada centro y verificar las coordenadas.
- [ ] Reemplazar las imágenes provisionales por fotos reales.
- [ ] Casos específicos de reciclaje postindustrial (por ejemplo, sobrantes de film que se convierten en mangueras).
- [ ] Obtener y archivar el permiso de publicación de la planta aliada.

## 10. Uso de inteligencia artificial

Se utilizó **Claude** (Anthropic) como apoyo durante el desarrollo del proyecto, por ejemplo para:

- orientar el diseño de la estructura del sitio y de la base de datos,
- escribir y depurar código (Next.js, TypeScript, Tailwind, Leaflet y Supabase),
- organizar la información de plásticos y centros,
- preparar textos, guías paso a paso y este documento.

El chatbot del sitio funciona con un modelo de lenguaje a través de la API de Groq. Algunas imágenes de apoyo se generaron con herramientas de IA y están identificadas en la página. Todo el contenido fue revisado por el autor, y los datos sin verificar están señalados como estimados.

## 11. Autor y créditos

- **Autor:** Carlos Andrés Mora López, Ingeniería Mecatrónica, USTA Bucaramanga.
- **Asesor:** [NOMBRE DEL ASESOR]
- **Aliado principal:** [NOMBRE DE LA PLANTA]. Agradecemos la visita y la autorización para usar sus imágenes.
- **Datos y mapas:** © colaboradores de OpenStreetMap.

## 12. Licencia

[POR DEFINIR]. Es un proyecto académico; confirma con la universidad antes de elegir una licencia.
