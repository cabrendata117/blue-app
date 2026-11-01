"use client";
import { useEffect, useState } from "react";
import Foto from "./Foto";

export interface FotoGaleria { src: string; alt: string; texto: string }

// Galería responsive con lightbox simple (sin librerías): clic para ampliar, Esc para cerrar, flechas para navegar.
export function Galeria({ fotos }: { fotos: FotoGaleria[] }) {
const [abierta, setAbierta] = useState<number | null>(null);
const cerrar = () => setAbierta(null);
const mover = (paso: number) => setAbierta((i) => (i === null ? i : (i + paso + fotos.length) % fotos.length));

useEffect(() => {
    if (abierta === null) return;
    const tecla = (e: KeyboardEvent) => {
    if (e.key === "Escape") cerrar();
    if (e.key === "ArrowRight") mover(1);
    if (e.key === "ArrowLeft") mover(-1);
    };
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
});

const f = abierta === null ? null : fotos[abierta];
return (
    <>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {fotos.map((foto, i) => (
        <button key={foto.src} type="button" onClick={() => setAbierta(i)}
            className="group overflow-hidden rounded-2xl border border-blue-100 bg-white text-left shadow-sm hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
            <span className="relative block aspect-square bg-blue-50">
            <Foto src={foto.src} alt={foto.alt} className="object-cover transition group-hover:scale-105" sizes="(max-width: 640px) 50vw, 300px" />
            </span>
            <span className="block px-3 py-2 text-xs font-semibold text-blue-900">{foto.texto}</span>
        </button>
        ))}
    </div>

    {f && (
        <div role="dialog" aria-modal="true" aria-label={f.texto} onClick={cerrar}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-950/90 p-4">
        <div className="relative h-[75vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Foto src={f.src} alt={f.alt} className="object-contain" sizes="100vw" />
        </div>
        <p className="mt-3 text-center text-sm font-semibold text-white">{f.texto} · {abierta! + 1}/{fotos.length}</p>
        <div className="mt-3 flex gap-3" onClick={(e) => e.stopPropagation()}>
            <button type="button" onClick={() => mover(-1)} className="rounded-lg bg-white/15 px-4 py-2 font-semibold text-white hover:bg-white/25" aria-label="Foto anterior">←</button>
            <button type="button" onClick={cerrar} className="rounded-lg bg-white px-4 py-2 font-semibold text-blue-900 hover:bg-blue-100">Cerrar</button>
            <button type="button" onClick={() => mover(1)} className="rounded-lg bg-white/15 px-4 py-2 font-semibold text-white hover:bg-white/25" aria-label="Foto siguiente">→</button>
        </div>
        </div>
    )}
    </>
);
}

// Video con póster. Si el archivo no existe, muestra un aviso en vez de un reproductor roto. Sin autoplay.
export function Video({ src, poster, titulo, vertical = false }: { src: string; poster: string; titulo: string; vertical?: boolean }) {
const [fallo, setFallo] = useState(false);
return (
    <figure className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
    <div className={`${vertical ? "aspect-[9/16]" : "aspect-video"} bg-blue-950`}>
        {fallo ? (
        <p className="flex h-full items-center justify-center p-4 text-center text-sm text-blue-200">Video no disponible por ahora</p>
        ) : (
        <video controls preload="metadata" playsInline poster={poster} src={src} aria-label={titulo}
            className="h-full w-full object-contain" onError={() => setFallo(true)} />
        )}
    </div>
    <figcaption className="px-3 py-2 text-sm font-semibold text-blue-900">{titulo}</figcaption>
    </figure>
);
}
