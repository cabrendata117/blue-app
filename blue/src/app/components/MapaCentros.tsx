"use client";
import { Component, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { centros } from "../data/centros";
import { distanciaKm } from "../data/config";

// Leaflet solo funciona en el navegador, por eso se carga sin SSR
const MapaLeaflet = dynamic(() => import("./MapaLeaflet"), {
ssr: false,
loading: () => <div className="flex h-[480px] items-center justify-center rounded-2xl bg-blue-50 text-sm text-blue-700">Cargando mapa…</div>,
});

// Si el mapa falla, muestra el mensaje del error en la página en vez de quedar en blanco
class LimiteError extends Component<{ children: ReactNode }, { error: string | null }> {
state = { error: null as string | null };
static getDerivedStateFromError(e: Error) { return { error: e.message }; }
render() {
    if (this.state.error)
    return (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-6 text-sm text-red-800">
        <p className="font-bold">No se pudo cargar el mapa</p>
        <p className="mt-1 break-words font-mono">{this.state.error}</p>
        </div>
    );
    return this.props.children;
}
}

const FILTROS = [
{ id: "todos", texto: "Todos" },
{ id: "acopio", texto: "Acopio" },
{ id: "transformador", texto: "Transformadores" },
];

export default function MapaCentros() {
const [radio, setRadio] = useState(5);
const [categoria, setCategoria] = useState("todos");

const dentro = centros
    .filter((c) => categoria === "todos" || c.categoria === categoria)
    .map((c) => ({ c, d: distanciaKm(c.lat, c.lng) }))
    .filter((x) => x.d <= radio)
    .sort((a, b) => a.d - b.d);

return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
    <div>
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-blue-100 bg-white p-4">
        <label className="flex min-w-[220px] flex-1 items-center gap-3 text-sm font-semibold text-blue-950">
            Radio: <span className="w-14 text-blue-700">{radio} km</span>
            <input type="range" min={1} max={15} step={1} value={radio} onChange={(e) => setRadio(Number(e.target.value))} className="flex-1 accent-blue-600" />
        </label>
        <div className="flex gap-2">
            {FILTROS.map((f) => (
            <button key={f.id} onClick={() => setCategoria(f.id)}
                className={`rounded-full px-3 py-1 text-xs font-bold ${categoria === f.id ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700 hover:bg-blue-100"}`}>
                {f.texto}
            </button>
            ))}
        </div>
        </div>
        <LimiteError><MapaLeaflet radioKm={radio} categoria={categoria} /></LimiteError>
        <p className="mt-2 text-xs text-gray-500">
        Azul = acopio · Naranja = transformador · Gris = fuera del radio. Distancias en línea recta, con coordenadas aproximadas.
        </p>
    </div>

    <aside className="rounded-2xl border border-blue-100 bg-white p-5">
        <h3 className="font-bold text-blue-950">{dentro.length} {dentro.length === 1 ? "centro dentro" : "centros dentro"} de {radio} km</h3>
        {dentro.length === 0 ? (
        <p className="mt-3 text-sm text-gray-500">No hay centros en este radio. Aumenta el radio.</p>
        ) : (
        <ul className="mt-3 max-h-[420px] space-y-3 overflow-y-auto">
            {dentro.map(({ c, d }) => (
            <li key={c.id}>
                <Link href={`/centros/${c.id}`} className="flex items-start justify-between gap-2 text-sm hover:text-blue-700">
                <span className="font-semibold">{c.nombre_organizacion}</span>
                <span className="shrink-0 rounded-full bg-blue-950 px-2 py-0.5 text-xs font-bold text-white">{d.toFixed(1)} km</span>
                </Link>
            </li>
            ))}
        </ul>
        )}
    </aside>
    </div>
);
}