import Link from "next/link";
import Header from "./components/Header";
import Foto from "./components/Foto";
import Footer from "./components/Footer";
import { centros } from "./data/centros";
import { plasticos } from "./data/plasticos";

// IMÁGENES de la landing: crea blue/public/images/landing/ y guarda ahí las fotos indicadas en cada paso.
const CICLO = [
  { titulo: "1. Generación", texto: "Las fábricas generan recortes, rebabas y sobrantes al producir. Es plástico limpio que nunca llegó a un consumidor.", foto: "generacion.jpg", ej: "foto de rebabas o scrap de una línea de producción" },
  { titulo: "2. Acopio y separación", texto: "Los centros de acopio compran el material, lo separan por tipo y color, y lo compactan.", foto: "acopio.jpg", ej: "foto de pacas de plástico en una bodega de acopio" },
  { titulo: "3. Transformación", texto: "Las plantas lo trituran, lo lavan y lo vuelven pellet o producto nuevo, como las mangueras.", foto: "transformacion.jpg", ej: "foto de pellets o de una línea de extrusión" },
];

export default function Home() {
  return (
    <main className="bg-blue-50 text-gray-900">
      <Header />

      <section className="bg-gradient-to-b from-blue-950 to-blue-800 px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-300">Bucaramanga · Plásticos postindustriales</p>
          <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">Conectando hoy el plástico del mañana</h1>
          <p className="mt-4 max-w-xl text-lg text-blue-100">Información, centros de recolección y orientación para dar una segunda vida al plástico industrial.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/centros" className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-800 hover:bg-blue-100">Ver centros de recolección</Link>
            <Link href="/plasticos" className="rounded-lg border border-blue-300 px-6 py-3 font-semibold hover:bg-blue-700">Explorar plásticos</Link>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-100 bg-white px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 text-center sm:grid-cols-3">
          <div><p className="text-4xl font-black text-blue-700">{centros.length}</p><p className="text-sm text-gray-600">centros mapeados desde la USTA</p></div>
          <div><p className="text-4xl font-black text-blue-700">{plasticos.length}</p><p className="text-sm text-gray-600">plásticos con ficha técnica</p></div>
          <div><p className="text-4xl font-black text-blue-700">≈3,6 %</p><p className="text-sm text-gray-600">de los residuos sólidos del Área Metropolitana se reutiliza (Vanguardia, 2025)</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-2 text-3xl font-black text-blue-950">¿Qué son los plásticos postindustriales?</h2>
        <p className="mb-8 max-w-3xl text-gray-700">
          Son los residuos plásticos que se generan dentro de una fábrica durante la producción: recortes, rebabas, sobrantes de rollos y empaques de materia prima. Aún no llegaron al consumidor, por eso suelen estar limpios y son más fáciles de reciclar.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-l-4 border-l-blue-600 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-blue-700">Postindustrial</h3>
            <p className="mt-2 text-sm text-gray-700">Sale de la industria, sin relación con el consumo humano.</p>
            <p className="mt-3 text-sm font-semibold text-gray-500">Ejemplos: sobrante de film de una planta de rollos, rebabas de inyección, canecas con defecto, recortes de tubería.</p>
          </div>
          <div className="rounded-2xl border-l-4 border-l-gray-400 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-600">Postconsumo</h3>
            <p className="mt-2 text-sm text-gray-700">Es el que una persona ya usó: comió o tomó algo y el envase quedó.</p>
            <p className="mt-3 text-sm font-semibold text-gray-500">Ejemplos: botellas de gaseosa, bolsas de papas, tapas, envases de yogur.</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-black text-blue-950">El ciclo del plástico postindustrial</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {CICLO.map((c) => (
              <div key={c.titulo} className="overflow-hidden rounded-2xl border border-blue-100 shadow-sm">
                <div className="relative h-44 bg-blue-50">
                  {/* IMAGEN: {c.ej} -> /images/landing/{c.foto}  (por ahora se muestra el logo) */}
                  <Foto src={`/images/landing/${c.foto}`} alt={c.titulo} />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-blue-800">{c.titulo}</h3>
                  <p className="mt-1 text-sm text-gray-700">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-600">
            Ejemplo en Bucaramanga: el sobrante que deja una planta al fabricar rollos de empaque se usa para fabricar mangueras en otra planta.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 text-center">
        <h2 className="text-3xl font-black text-blue-950">Cada kilo cuenta</h2>
        <p className="mx-auto mt-2 max-w-xl text-gray-700">Encuentra qué plástico tienes y a dónde llevarlo.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/centros" className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Ver mapa y centros</Link>
          <Link href="/plasticos" className="rounded-lg border border-blue-600 px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50">Ver tipos de plásticos</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}