import Link from "next/link";
import { connection } from "next/server";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Foto from "../components/Foto";
import { Galeria, Video, type FotoGaleria } from "../components/GaleriaAliado";
import { getCentro } from "../data/db";
import { distanciaKm, rutaDesdeUSTA } from "../data/config";

// Aliado principal de Blue. Los datos de contacto vienen de la tabla centros (supabase/agregar_aliado.sql).
// Permiso de la empresa para publicar nombre, fotos y videos: SÍ (confirmado en la visita).
const ID = "manpoplast";
const FOTOS = "/images/centros/manpoplast";

// Pasos del proceso, según lo que se vio en las fotos y videos de la visita
const PASOS = [
  { titulo: "Recepción y pesaje", texto: "El material llega en bolsas y lonas y se pesa en una báscula de plataforma.", foto: "recepcion-bascula.jpg", alt: "Bolsa con plástico sobre una báscula de plataforma" },
  { titulo: "Aglutinado", texto: "Una aglutinadora compacta el plástico liviano (bolsas y película) antes de fundirlo.", foto: "aglutinado-maquina.jpg", alt: "Operario de espaldas trabajando en la máquina aglutinadora" },
  { titulo: "Extrusión", texto: "La extrusora funde el material y lo saca como un cordón continuo de plástico.", foto: "extrusion.jpg", alt: "Extrusora con plástico fundido saliendo del cabezal" },
  { titulo: "Enfriamiento", texto: "La manguera recién formada pasa por una tina larga con agua y un halador la va jalando.", foto: "enfriamiento-tina.jpg", alt: "Manguera pasando por la tina de agua de enfriamiento" },
  { titulo: "Enrollado y producto final", texto: "La manguera se enrolla y se guarda en rollos listos para la venta.", foto: "mangueras-rollos.jpg", alt: "Rollos de manguera negra almacenados en la planta" },
];

const GALERIA: FotoGaleria[] = [
  { src: "pancarta-productos.jpg", texto: "Pancarta de productos", alt: "Pancarta de Manpoplast con mangueras, postes, sillas y cercas plásticas" },
  { src: "punto-ecologico.jpg", texto: "Punto ecológico", alt: "Punto ecológico de Manpoplast con muestras de los estados del plástico" },
  { src: "manpomadera-plastica.jpg", texto: "Manpomadera plástica", alt: "Letrero de Manpoplast: Manpomadera plástica" },
  { src: "material-molido-lonas.jpg", texto: "Material en lonas", alt: "Lonas con plástico molido de varios colores" },
  { src: "rollos-pelicula.jpg", texto: "Rollos de película", alt: "Rollos de película plástica impresa apilados" },
  { src: "paca-botellas.jpg", texto: "Botellas recolectadas", alt: "Bolsa grande llena de botellas plásticas" },
  { src: "aglutinado-maquina.jpg", texto: "Aglutinadora", alt: "Operario de espaldas en la máquina aglutinadora" },
  { src: "extrusion.jpg", texto: "Extrusora", alt: "Extrusora con plástico fundido" },
  { src: "halador-manguera.jpg", texto: "Halador", alt: "Halador de banda que jala la manguera" },
  { src: "mangueras-rollos.jpg", texto: "Mangueras", alt: "Rollos de manguera negra" },
  { src: "postes-plasticos.jpg", texto: "Postes plásticos", alt: "Postes plásticos negros apoyados en una estructura" },
  { src: "silla-madera-plastica.jpg", texto: "Silla", alt: "Silla de listones grises a la entrada de la planta" },
  { src: "estado-peletizado.jpg", texto: "Peletizado", alt: "Muestra de plástico peletizado verde" },
  { src: "estado-molido.jpg", texto: "Molido", alt: "Muestra de plástico molido" },
  { src: "estado-aglutinado.jpg", texto: "Aglutinado", alt: "Muestra de plástico aglutinado" },
  { src: "estado-soplao.jpg", texto: "Soplao", alt: "Muestra de plástico soplado en trozos de colores" },
  { src: "ecobotellas.jpg", texto: "Ecobotellas", alt: "Dos ecobotellas rellenas de empaques plásticos" },
].map((f) => ({ ...f, src: `${FOTOS}/${f.src}` }));

const HORIZONTALES = [
  { n: 1, titulo: "Blue × Manpoplast" },
  { n: 2, titulo: "El proceso en 5 pasos" },
  { n: 3, titulo: "Recorrido por la planta" },
  { n: 4, titulo: "Entrevista" },
];
const VERTICALES = [
  { n: 1, titulo: "De bolsa a manguera" },
  { n: 2, titulo: "Cinco estados del plástico" },
  { n: 3, titulo: "¿Qué es una ecobotella?" },
  { n: 4, titulo: "Ecobotella bien hecha vs. mal hecha" },
  { n: 5, titulo: "Todo se pesa" },
  { n: 6, titulo: "Postes plásticos" },
  { n: 7, titulo: "Conoce a nuestro aliado" },
  { n: 8, titulo: "La voz de la planta" },
  { n: 9, titulo: "Prueba de la botella" },
];

export default async function AliadoPage() {
  await connection(); // lee la base de datos en cada visita (no la deja congelada al compilar)
  const c = await getCentro(ID);
  const nombre = c?.nombre_organizacion ?? "Manpoplast S.A.S";

  return (
    <main className="min-h-screen bg-blue-50 text-gray-900">
      <Header />

      <section className="bg-gradient-to-b from-blue-950 to-blue-800 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-800">Aliado principal</span>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">{nombre}</h1>
          <p className="mt-2 text-lg text-blue-100">{c?.tipo_entidad ?? "Planta transformadora: mangueras y postes plásticos"}</p>
          {c && (
            <p className="mt-4 inline-block rounded-full bg-blue-950/60 px-3 py-1 text-xs font-bold">
              {distanciaKm(c.lat, c.lng).toFixed(1)} km desde la USTA (línea recta, ubicación aproximada)
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-12">
        {/* Descripción: basada SOLO en lo que se vio en la visita */}
        <section className="grid gap-8 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-bold text-blue-950">Quiénes son</h2>
            <p>{nombre} es una planta transformadora ubicada en el barrio Comuneros de Bucaramanga. Su pancarta la presenta como fabricante de mangueras y postes plásticos ecológicos, y en la planta se ven rollos de manguera negra y postes plásticos terminados.</p>
            <p>En la visita se vio plástico guardado en lonas: bolsas, película, material molido de varios colores, rollos de película impresa y botellas. El material que entra se pesa en una báscula antes de procesarse.</p>
            <p>El proceso que se observó es el de una línea de manguera: una aglutinadora compacta el plástico liviano, una extrusora lo funde y lo saca como un cordón continuo, la manguera se enfría en una tina larga con agua mientras un halador la jala, y al final se enrolla.</p>
            <p>La planta tiene un &quot;Punto ecológico&quot; donde muestra las formas que toma el plástico (original, molido, aglutinado, peletizado y soplado) y ejemplos de ecobotellas. En sus letreros también aparece su línea de madera plástica.</p>
            <p className="rounded-lg border border-blue-100 bg-white px-3 py-2 text-xs text-gray-500">
              Descripción basada en nuestra visita; datos por confirmar con la empresa (tipos exactos de plástico, cantidades y horario).
            </p>
          </div>

          {/* Contacto: mismo formato que la ficha de centro */}
          <div className="h-fit overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
            <div className="relative h-48 border-b border-blue-100 bg-white">
              <Foto src={c?.imagen ?? `${FOTOS}/pancarta-productos.jpg`} alt={`Pancarta de ${nombre}`} className="object-contain p-3" />
            </div>
            {c ? (
              <div className="p-5">
                <div className="mb-5 space-y-2 rounded-lg bg-blue-50 p-4 text-sm">
                  <p>📍 <b>Dirección:</b> {c.contacto.direccion}</p>
                  <p>📞 <b>Teléfono:</b> {c.contacto.telefono}</p>
                  <p>🕒 <b>Horario:</b> {c.horario}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={c.contacto.link_maps} target="_blank" rel="noopener noreferrer"
                     className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Abrir en Maps</a>
                  <a href={rutaDesdeUSTA(c.contacto.direccion)} target="_blank" rel="noopener noreferrer"
                     className="rounded-lg border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50">Ruta desde la USTA</a>
                </div>
              </div>
            ) : (
              <p className="p-5 text-sm text-gray-600">Datos de contacto pendientes: ejecuta <code>supabase/agregar_aliado.sql</code> en Supabase.</p>
            )}
          </div>
        </section>

        {/* Pasos del proceso */}
        <section>
          <h2 className="mb-1 text-2xl font-bold text-blue-950">Así transforman el plástico</h2>
          <p className="mb-6 text-sm text-gray-600">Pasos que vimos en la línea de manguera.</p>
          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="overflow-hidden rounded-2xl border border-blue-100 border-t-4 border-t-blue-600 bg-white shadow-sm">
                <div className="relative h-44 bg-blue-50">
                  <Foto src={`${FOTOS}/${p.foto}`} alt={p.alt} />
                </div>
                <div className="p-4">
                  <p className="text-xs font-bold text-blue-600">Paso {i + 1}</p>
                  <h3 className="font-bold text-blue-950">{p.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-600">{p.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Videos */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-blue-950">Videos de la visita</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {HORIZONTALES.map((v) => (
              <Video key={v.n} titulo={v.titulo} src={`/videos/aliado-horizontal-${v.n}.mp4`} poster={`/images/aliado/aliado-horizontal-${v.n}.jpg`} />
            ))}
          </div>
          <h3 className="mb-3 mt-10 text-lg font-bold text-blue-800">Clips cortos</h3>
          <div className="flex snap-x gap-4 overflow-x-auto pb-4">
            {VERTICALES.map((v) => (
              <div key={v.n} className="w-52 shrink-0 snap-start">
                <Video vertical titulo={v.titulo} src={`/videos/aliado-vertical-${v.n}.mp4`} poster={`/images/aliado/aliado-vertical-${v.n}.jpg`} />
              </div>
            ))}
          </div>
        </section>

        {/* Galería */}
        <section>
          <h2 className="mb-1 text-2xl font-bold text-blue-950">Galería</h2>
          <p className="mb-6 text-sm text-gray-600">Haz clic en una foto para ampliarla.</p>
          <Galeria fotos={GALERIA} />
        </section>

        {/* Enlaces */}
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-bold text-blue-950">Más sobre {nombre}</h2>
          {c && c.plasticos_aceptados.length > 0 && (
            <>
              <p className="mb-2 text-sm text-gray-600">
                Plásticos que procesa{!c.datos_confirmados && " (estimado a partir de la visita, pendiente de confirmar)"}:
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {c.plasticos_aceptados.map((p) => (
                  <Link key={p} href={`/plasticos/${p}`} className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white hover:bg-blue-800">{p}</Link>
                ))}
              </div>
            </>
          )}
          <Link href={`/centros/${ID}`} className="inline-block rounded-lg bg-blue-950 px-6 py-2.5 font-semibold text-white hover:bg-blue-800">Ver ficha del centro</Link>
        </section>
      </div>
      <Footer />
    </main>
  );
}
