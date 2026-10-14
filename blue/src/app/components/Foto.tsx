"use client";
import { useState } from "react";
import Image from "next/image";
import { LOGO } from "../data/config";

const ETIQUETAS = { ia: "Imagen hecha con IA", referencia: "Imagen de referencia" };

// Muestra la foto real. Si el archivo todavía no existe en public/, muestra el logo (sin errores).
// La etiqueta (opcional) solo aparece cuando la foto real sí cargó.
export default function Foto({ src, alt, className = "object-cover", etiqueta }: {
src: string; alt: string; className?: string; etiqueta?: "ia" | "referencia";
}) {
const [fallo, setFallo] = useState(false);
return (
    <>
    <Image
        src={fallo ? LOGO : src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className={fallo ? "object-contain p-6" : className}
        onError={() => setFallo(true)}
    />
    {etiqueta && !fallo && (
        <span className="absolute bottom-3 right-3 rounded-full bg-blue-950/85 px-3 py-1 text-xs font-semibold text-white">
        {ETIQUETAS[etiqueta]}
        </span>
    )}
    </>
);
}