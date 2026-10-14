import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Foto from "../../components/Foto";
import { centros } from "../../data/centros";
import { plasticos } from "../../data/plasticos";
import { fichas } from "../../data/fichas";

export default async function PlasticoPage({ params }: { params: Promise<{ id: string }> }) {
const { id } = await params;
const p = plasticos.find((x) => x.id === id);
if (!p) notFound();
const f = fichas[p.id];
const colorRec = f ? { Alta: "text-emerald-400", Media: "text-amber-300", Baja: "text-red-300" }[f.reciclabilidad] : "";
const aceptan = centros.filter((c) => c.plasticos_aceptados.includes(p.id));

return (
    <main className="min-h-screen bg-blue-50 text-gray-900">
    <Header />
    <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href="/plasticos" className="text-sm font-semibold text-blue-700 hover:underline">← Volver a plásticos</Link>

        <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
        <div className="relative h-56 bg-blue-50">
            {/* IMAGEN: foto del plástico (ver data/plasticos.ts) */}
            <Foto src={p.imagen} alt={p.nombre} />
        </div>
        <div className="p-6">
            <h1 className="text-4xl font-black text-blue-700">{p.nombre}</h1>
            <p className="mb-4 font-semibold text-gray-500">{p.descripcion_corta} · {p.codigo}</p>
            <p className="mb-6 text-gray-700">{p.descripcion_larga}</p>

            {f && (
            <>
                <h2 className="mb-3 text-xl font-black text-blue-950">Ficha técnica del polímero</h2>
                <div className="mb-6 rounded-2xl bg-blue-950 p-5 text-white">
                <p className="text-3xl font-black text-blue-300">{p.nombre}</p>
                <p className="mb-3 text-sm text-blue-200">{p.descripcion_corta}</p>
                <dl className="divide-y divide-blue-800 text-sm">
                    {[
                    ["Densidad (g/cm³)", `${f.densidad} · ${f.flota ? "flota" : "se hunde"} en agua`],
                    ["Punto de fusión", f.fusion],
                    ["Índice de fluidez (MFI)", f.mfi],
                    ["Banda NIR característica", f.nir],
                    ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2">
                        <dt className="text-blue-300">{k}</dt>
                        <dd className="text-right font-semibold">{v}</dd>
                    </div>
                    ))}
                    <div className="flex justify-between gap-4 py-2">
                    <dt className="text-blue-300">Reciclabilidad</dt>
                    <dd className={`font-bold ${colorRec}`}>{f.reciclabilidad}</dd>
                    </div>
                </dl>
                <p className="mt-2 text-xs text-blue-300">{f.reciclabilidad_nota}</p>
                </div>

                <h2 className="mb-2 font-bold text-blue-950">Proceso de reciclaje del {p.nombre}</h2>
                <ol className="mb-6 space-y-2 text-sm text-gray-700">
                {f.proceso.map((paso, i) => (
                    <li key={paso} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{i + 1}</span>
                    <span>{paso}</span>
                    </li>
                ))}
                </ol>

                <h2 className="mb-2 font-bold text-blue-950">Diferencias por color</h2>
                <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {f.colores.map((c) => <li key={c}>{c}</li>)}
                </ul>

                <h2 className="mb-2 font-bold text-blue-950">Más ejemplos</h2>
                {/* IMÁGENES: una foto por ejemplo, con el nombre /images/plasticos/<id en minúscula>-ejemplo-1.jpg, -ejemplo-2.jpg, -ejemplo-3.jpg
                    (ej. pet-ejemplo-1.jpg = preformas de botella). Mientras tanto se muestra el LOGO. */}
                <div className="mb-6 grid grid-cols-3 gap-3">
                {f.ejemplos.map((e, i) => (
                    <figure key={e} className="overflow-hidden rounded-xl border border-blue-100">
                    <div className="relative h-24 bg-blue-50">
                        <Foto src={`/images/plasticos/${p.id.toLowerCase()}-ejemplo-${i + 1}.jpg`} alt={e} />
                    </div>
                    <figcaption className="p-2 text-center text-xs font-semibold text-gray-600">{e}</figcaption>
                    </figure>
                ))}
                </div>
                <p className="mb-6 text-xs text-gray-400">Valores típicos; cambian según el grado y el fabricante. Las bandas NIR son aproximadas.</p>
            </>
            )}

            <h2 className="mb-1 font-bold text-blue-950">¿Cómo sale como residuo industrial?</h2>
            <p className="mb-6 text-sm text-gray-700">{p.origen_postindustrial}</p>

            <h2 className="mb-2 font-bold text-blue-950">Usos al reciclarlo</h2>
            <ul className="mb-6 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {p.usos_reciclado.map((u) => <li key={u}>{u}</li>)}
            </ul>

            <h2 className="mb-2 font-bold text-blue-950">Centros que lo reciben</h2>
            {aceptan.length === 0 ? (
            <p className="text-sm text-gray-500">Aún no hay centros registrados para este plástico.</p>
            ) : (
            <div className="flex flex-wrap gap-2">
                {aceptan.map((c) => (
                <Link key={c.id} href={`/centros/${c.id}`} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100">{c.nombre_organizacion}</Link>
                ))}
            </div>
            )}
        </div>
        </div>
    </div>
    </main>
);
}