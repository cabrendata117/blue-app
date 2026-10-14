import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Foto from "../../components/Foto";
import { centros } from "../../data/centros";
import { distanciaKm, rutaDesdeUSTA } from "../../data/config";

export default async function CentroPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
const c = centros.find((x) => x.id === id);
if (!c) notFound();

return (
    <main className="min-h-screen bg-blue-50 text-gray-900">
    <Header />
    <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/centros" className="text-sm font-semibold text-blue-700 hover:underline">← Volver a centros</Link>

        <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="relative h-56 border-b border-blue-100 bg-white">
            {/* IMAGEN: foto del centro (ver data/centros.ts) */}
            <Foto src={c.imagen} alt={c.nombre_organizacion} className="object-contain p-4" etiqueta={c.etiqueta_imagen} />
        </div>
        <div className="p-6">
            <h1 className="text-3xl font-black text-blue-950">{c.nombre_organizacion}</h1>
            <p className="font-semibold text-blue-600">{c.tipo_entidad}</p>
            <div className="mb-5 mt-2 flex flex-wrap gap-2 text-xs font-bold">
            <span className="rounded-full bg-blue-950 px-3 py-1 text-white">{distanciaKm(c.lat, c.lng).toFixed(1)} km desde la USTA (línea recta)</span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">{c.categoria === "acopio" ? "Centro de acopio" : "Transformador"}</span>
            </div>

            <div className="mb-6 space-y-2 rounded-lg bg-blue-50 p-4 text-sm">
            <p>📍 <b>Dirección:</b> {c.contacto.direccion}</p>
            <p>📞 <b>Teléfono:</b> {c.contacto.telefono}</p>
            <p>🕒 <b>Horario:</b> {c.horario}</p>
            {c.contacto.sitio_web !== "N/A" && (
                <p>🌐 <b>Web:</b>{" "}
                <a href={c.contacto.sitio_web} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{c.contacto.sitio_web}</a>
                </p>
            )}
            </div>

            <h2 className="mb-2 font-bold text-blue-950">¿Cuánto reciben?</h2>
            <div className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-lg border border-blue-100 p-3"><p className="font-bold text-blue-800">Persona natural</p><p className="text-gray-700">{c.persona_natural}</p></div>
            <div className="rounded-lg border border-blue-100 p-3"><p className="font-bold text-blue-800">Empresa</p><p className="text-gray-700">{c.empresa}</p></div>
            </div>

            <h2 className="mb-2 font-bold text-blue-950">Plásticos que recibe</h2>
            <div className="mb-6 flex flex-wrap gap-2">
            {c.plasticos_aceptados.map((p) => (
                <Link key={p} href={`/plasticos/${p}`} className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-800">{p}</Link>
            ))}
            </div>

            <h2 className="mb-2 font-bold text-blue-950">Servicios corporativos (B2B)</h2>
            <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {c.servicios_b2b.map((s) => <li key={s}>{s}</li>)}
            </ul>

            <div className="flex flex-wrap gap-3">
            <a href={c.contacto.link_maps} target="_blank" rel="noopener noreferrer"
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white hover:bg-blue-700">Abrir en Maps</a>
            <a href={rutaDesdeUSTA(c.contacto.direccion)} target="_blank" rel="noopener noreferrer"
            className="rounded-lg border border-blue-600 px-6 py-2.5 font-semibold text-blue-700 hover:bg-blue-50">Ruta desde la USTA</a>
            </div>
        </div>
        </div>
    </div>
    </main>
);
}