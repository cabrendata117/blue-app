import Link from "next/link";
import Header from "../components/Header";
import Foto from "../components/Foto";
import Footer from "../components/Footer";
import { plasticos } from "../data/plasticos";

export default function PlasticosPage() {
return (
    <main className="min-h-screen bg-blue-50 text-gray-900">
    <Header />
    <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="mb-1 text-3xl font-black text-blue-950">Tipos de plásticos industriales</h1>
        <p className="mb-8 text-sm text-gray-600">Entra a cada uno para ver su ficha técnica y cómo se recicla.</p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plasticos.map((p) => (
            <Link key={p.id} href={`/plasticos/${p.id}`} className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm hover:shadow-lg">
            <div className="relative h-36 bg-blue-50">
                {/* IMAGEN: foto del plástico (ver data/plasticos.ts) */}
                <Foto src={p.imagen} alt={p.nombre} />
            </div>
            <div className="p-5">
                <h2 className="text-2xl font-black text-blue-700">{p.nombre}</h2>
                <p className="mb-2 text-sm font-semibold text-gray-500">{p.descripcion_corta}</p>
                <p className="line-clamp-3 text-sm text-gray-700">{p.descripcion_larga}</p>
            </div>
            </Link>
        ))}
        </div>
    </div>
    <Footer />
    </main>
);
}