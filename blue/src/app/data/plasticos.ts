export interface Plastico {
id: string;
nombre: string;
  codigo: string; // código de identificación de resina
descripcion_corta: string;
descripcion_larga: string;
  origen_postindustrial: string; // de dónde sale como residuo industrial
usos_reciclado: string[];
imagen: string;
}

// IMÁGENES: crea la carpeta blue/public/images/plasticos/ y guarda ahí una foto por plástico
// (ej. /images/plasticos/pet.jpg). Mientras tanto todos usan el LOGO.
export const plasticos: Plastico[] = [
{
    id: "PET", nombre: "PET", codigo: "Código 1",
    descripcion_corta: "Polietileno Tereftalato",
    descripcion_larga: "Plástico transparente y ligero. Muy utilizado en botellas de bebidas y envases de alimentos.",
    origen_postindustrial: "Recortes de preformas, láminas termoformadas y rechazo de líneas de embotellado.",
    usos_reciclado: ["Fibra textil", "Flejes", "Láminas", "Botellas nuevas (grado alimenticio)"],
    imagen: "/images/plasticos/pet.jpg", // IMAGEN: pellets u hojuela (flake) de PET
},
{
    id: "HDPE", nombre: "HDPE", codigo: "Código 2",
    descripcion_corta: "Polietileno de Alta Densidad",
    descripcion_larga: "Plástico fuerte y resistente a la humedad. Usado en envases de detergentes, champús y tuberías.",
    origen_postindustrial: "Rebabas de soplado e inyección, canecas, tapas y tubería fuera de especificación.",
    usos_reciclado: ["Tubería", "Canecas y estibas", "Madera plástica", "Envases no alimenticios"],
    imagen: "/images/plasticos/hdpe.jpg", // IMAGEN: envases o pellets de HDPE
},
{
    id: "PVC", nombre: "PVC", codigo: "Código 3",
    descripcion_corta: "Policloruro de Vinilo",
    descripcion_larga: "Plástico rígido o flexible, resistente a químicos y a la intemperie. Usado en tuberías, perfiles y cables.",
    origen_postindustrial: "Recortes de tubería y perfiles, y aislamiento de cable de la construcción.",
    usos_reciclado: ["Tubería no presurizada", "Perfiles", "Suelas y mangueras", "Conduit eléctrico"],
    imagen: "/images/plasticos/pvc.jpg", // IMAGEN: tubería o recortes de PVC
},
{
    id: "LDPE", nombre: "LDPE", codigo: "Código 4",
    descripcion_corta: "Polietileno de Baja Densidad",
    descripcion_larga: "Plástico flexible y liviano. Se usa en bolsas, películas y plástico de embalaje.",
    origen_postindustrial: "Film de embalaje (vinipel), rollos de estirable y bolsas con defecto de planta.",
    usos_reciclado: ["Bolsas de basura", "Film agrícola", "Mangueras", "Pellets para extrusión"],
    imagen: "/images/plasticos/ldpe.jpg", // IMAGEN: rollo de film/vinipel LDPE
},
{
    id: "LLDPE", nombre: "LLDPE", codigo: "Código 4",
    descripcion_corta: "Polietileno Lineal de Baja Densidad",
    descripcion_larga: "Película muy resistente al rasgado y a la perforación. Base del film estirable industrial.",
    origen_postindustrial: "Film estirable de paletizado y recortes de extrusión.",
    usos_reciclado: ["Film estirable reciclado", "Bolsas industriales", "Películas agrícolas"],
    imagen: "/images/plasticos/lldpe.jpg", // IMAGEN: film estirable en paleta
},
{
    id: "PP", nombre: "PP", codigo: "Código 5",
    descripcion_corta: "Polipropileno",
    descripcion_larga: "Resistente al calor y a productos químicos. Se usa en tapas de botellas, pitillos y envases de yogur.",
    origen_postindustrial: "Rebabas de inyección, tapas, bigbags (fibra tejida) y piezas automotrices.",
    usos_reciclado: ["Piezas inyectadas", "Cajas y canastillas", "Sacos tejidos", "Fibras"],
    imagen: "/images/plasticos/pp.jpg", // IMAGEN: tapas o pellets de PP
},
{
    id: "PS", nombre: "PS", codigo: "Código 6",
    descripcion_corta: "Poliestireno",
    descripcion_larga: "Plástico rígido y quebradizo, fácil de moldear. Usado en vasos, bandejas y carcasas.",
    origen_postindustrial: "Recortes de termoformado de bandejas y vasos, y piezas inyectadas rechazadas.",
    usos_reciclado: ["Perchas", "Reglas y útiles", "Molduras", "Aislantes"],
    imagen: "/images/plasticos/ps.jpg", // IMAGEN: bandejas o vasos de PS
},
{
    id: "EPS", nombre: "EPS", codigo: "Código 6",
    descripcion_corta: "Poliestireno Expandido (icopor)",
    descripcion_larga: "Espuma muy ligera con gran capacidad de aislamiento y amortiguación. Usada en empaques de protección y neveras.",
    origen_postindustrial: "Recortes de corte de bloques, empaques de electrodomésticos y cajas de protección.",
    usos_reciclado: ["Bloques de construcción ligeros", "Molduras", "Pellets de PS", "Relleno aislante"],
    imagen: "/images/plasticos/eps.jpg", // IMAGEN: bloque o empaque de icopor
},
{
    id: "ABS", nombre: "ABS", codigo: "Código 7",
    descripcion_corta: "Acrilonitrilo Butadieno Estireno",
    descripcion_larga: "Plástico duro, resistente a impactos y con buen acabado. Usado en carcasas, juguetes y piezas automotrices.",
    origen_postindustrial: "Rebabas y piezas defectuosas de inyección, carcasas de equipos y restos de impresión 3D.",
    usos_reciclado: ["Carcasas", "Piezas automotrices no visibles", "Filamento para impresión 3D"],
    imagen: "/images/plasticos/abs.jpg", // IMAGEN: piezas de ABS o filamento 3D
},
{
    id: "PC", nombre: "PC", codigo: "Código 7",
    descripcion_corta: "Policarbonato",
    descripcion_larga: "Plástico transparente y muy resistente a golpes y calor. Usado en láminas, lentes, cascos y discos.",
    origen_postindustrial: "Recortes de láminas, lentes y piezas ópticas, y rebabas de inyección.",
    usos_reciclado: ["Carcasas eléctricas", "Láminas no ópticas", "Mezclas (blends) con ABS"],
    imagen: "/images/plasticos/pc.jpg", // IMAGEN: lámina o pellets de policarbonato
},
{
    id: "PA", nombre: "PA", codigo: "Código 7",
    descripcion_corta: "Poliamida (Nylon)",
    descripcion_larga: "Plástico técnico fuerte, resistente al desgaste y a la fricción. Usado en engranajes, fibras y cuerdas.",
    origen_postindustrial: "Residuos de hilatura, recortes de redes y cuerdas, y piezas técnicas inyectadas.",
    usos_reciclado: ["Engranajes y bujes", "Fibras", "Piezas técnicas moldeadas"],
    imagen: "/images/plasticos/pa.jpg", // IMAGEN: engranajes o hilo de nylon
},
{
    id: "PMMA", nombre: "PMMA", codigo: "Código 7",
    descripcion_corta: "Polimetilmetacrilato (acrílico)",
    descripcion_larga: "Plástico rígido muy transparente y resistente a la intemperie. Usado en avisos, vitrinas y láminas.",
    origen_postindustrial: "Recortes de corte láser y CNC de avisos, vitrinas y láminas.",
    usos_reciclado: ["Láminas recicladas", "Piezas decorativas", "Despolimerización a monómero"],
    imagen: "/images/plasticos/pmma.jpg", // IMAGEN: láminas de acrílico
},
{
    id: "PU", nombre: "PU", codigo: "Código 7",
    descripcion_corta: "Poliuretano",
    descripcion_larga: "Material versátil en espuma o sólido: colchones, suelas, aislamiento y recubrimientos.",
    origen_postindustrial: "Recortes de espuma de colchones y muebles, y retales de suelas.",
    usos_reciclado: ["Espuma aglomerada", "Relleno acolchado", "Pisos deportivos"],
    imagen: "/images/plasticos/pu.jpg", // IMAGEN: espuma de poliuretano
},
{
    id: "PLA", nombre: "PLA", codigo: "Código 7",
    descripcion_corta: "Ácido Poliláctico (bioplástico)",
    descripcion_larga: "Bioplástico de origen vegetal, compostable en condiciones industriales. Usado en empaques e impresión 3D.",
    origen_postindustrial: "Residuos de impresión 3D y recortes de empaques compostables.",
    usos_reciclado: ["Filamento 3D reciclado", "Compostaje industrial"],
    imagen: "/images/plasticos/pla.jpg", // IMAGEN: filamento o pellets de PLA
},
];