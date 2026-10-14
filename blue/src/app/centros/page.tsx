import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MapaCentros from "../components/MapaCentros";
import { centros } from "../data/centros";
import { USTA, distanciaKm } from "../data/config";

const GRUPOS = [
{ cat: "acopio", titulo: "Centros de acopio", desc: "Solo reciben y compran el plástico; luego lo venden a transformadores." },
{ cat: "transformador", titulo: "Transformadores", desc: "Procesan el plástico o lo usan para fabricar nuevos productos." },
] as const;

export default function CentrosPage() {
return (
    <main className="min-h-screen bg-blue-50 text-gray-900">
    <Header />
    <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-1 text-3xl font-black text-blue-950">Centros de recolección en Bucaramanga</h1>
        <p className="mb-8 text-sm text-gray-600">Distancias en línea recta desde la {USTA.nombre}.</p>

        <section className="mb-12">
        <h2 className="mb-1 text-xl font-bold text-blue-800">Mapa de cercanía</h2>
        <p className="mb-4 text-sm text-gray-600">Mueve el radio para ver qué centros quedan cerca de la universidad.</p>
        <MapaCentros />
        </section>

        <h2 className="mb-6 text-xl font-bold text-blue-800">Catálogo completo</h2>
        {GRUPOS.map((g) => (
        <section key={g.cat} className="mb-10">
            <h2 className="text-xl font-bold text-blue-800">{g.titulo}</h2>
            <p className="mb-4 text-sm text-gray-600">{g.desc}</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {centros
                .filter((c) => c.categoria === g.cat)
                .sort((a, b) => distanciaKm(a.lat, a.lng) - distanciaKm(b.lat, b.lng))
                .map((c) => (
                <Link key={c.id} href={`/centros/${c.id}`}
                    className="flex flex-col justify-between rounded-2xl border border-blue-100 border-l-4 border-l-blue-600 bg-white p-6 shadow-sm hover:shadow-lg">
                    <div>
                    <div className="mb-1 flex items-start justify-between gap-2">
                        <h3 className="text-lg font-bold text-blue-950">{c.nombre_organizacion}</h3>
                        <span className="shrink-0 rounded-full bg-blue-950 px-2.5 py-1 text-xs font-bold text-white">{distanciaKm(c.lat, c.lng).toFixed(1)} km</span>
                    </div>
                    <p className="mb-3 text-xs font-semibold text-blue-600">{c.tipo_entidad}</p>
                    <p className="line-clamp-2 text-sm text-gray-600">📍 {c.contacto.direccion}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                    {c.plasticos_aceptados.map((p) => (
                        <span key={p} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">{p}</span>
                    ))}
                    </div>
                </Link>
                ))}
            </div>
        </section>
        ))}
    </div>
    <Footer />
    </main>
);
}