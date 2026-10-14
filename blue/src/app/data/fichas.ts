// FICHAS TÉCNICAS por plástico (la clave es el id de data/plasticos.ts).
// Valores típicos de literatura técnica: varían según el grado del fabricante.
// ⚠ Las bandas NIR están en nm y son APROXIMADAS: confírmalas con un espectro de referencia antes de la sustentación.
export interface Ficha {
  densidad: string; // g/cm³
  flota: boolean; // ¿flota en agua? (clave para separar por densidad)
fusion: string;
  mfi: string; // índice de fluidez
nir: string;
reciclabilidad: "Alta" | "Media" | "Baja";
reciclabilidad_nota: string;
  colores: string[]; // cómo cambia el valor según el color
  proceso: string[]; // reciclaje mecánico de ESTE plástico
  ejemplos: string[]; // objetos de ejemplo (cada uno lleva su foto aparte)
}

export const fichas: Record<string, Ficha> = {
PET: {
    densidad: "1,38–1,40", flota: false, fusion: "250–260 °C",
    mfi: "20–40 g/10 min (en PET se usa más la viscosidad intrínseca, 0,72–0,84 dL/g)",
    nir: "≈1130 / 1660 / 2130 nm", reciclabilidad: "Alta",
    reciclabilidad_nota: "Es el plástico con mejor mercado de reciclaje; el cristal (transparente) vale más.",
    colores: ["Transparente (cristal): mayor valor", "Verde y azul: valor medio", "Ámbar u opaco: menor valor"],
    proceso: ["Separar por color y retirar tapas y etiquetas", "Triturar en hojuela (flake)", "Lavado en caliente con soda cáustica", "Flotación: el PET se hunde y las tapas (PP/PE) flotan", "Secado, extrusión y pelletizado (SSP si será grado alimenticio)"],
    ejemplos: ["Preformas de botella", "Lámina termoformada (bandejas)", "Fibra o cinta de embalaje"],
},
HDPE: {
    densidad: "0,94–0,97", flota: true, fusion: "130–137 °C", mfi: "0,2–20 g/10 min (190 °C/2,16 kg, según grado)",
    nir: "≈1215 / 1730 / 2310 nm", reciclabilidad: "Alta",
    reciclabilidad_nota: "Muy reciclable; el natural (lechoso) es el más valioso.",
    colores: ["Natural: mayor valor", "Blanco: valor medio", "Colores mezclados u oscuros: menor valor"],
    proceso: ["Separar de PP (ambos flotan: se distingue por MFI y NIR)", "Retirar tapas, etiquetas y tapones", "Triturar y lavar", "Secar y extruir", "Filtrar y pelletizar"],
    ejemplos: ["Canecas rotas", "Rebabas de soplado", "Tubería fuera de especificación"],
},
PVC: {
    densidad: "1,30–1,45", flota: false, fusion: "Sin fusión definida: se procesa a 160–200 °C", mfi: "No aplica (se mide el valor K)",
    nir: "≈1190 / 1710 / 2320 nm (detección débil; se apoya con rayos X)", reciclabilidad: "Baja",
    reciclabilidad_nota: "Se degrada con el calor y libera cloro; nunca debe mezclarse con PET.",
    colores: ["Blanco o gris: más fácil de reutilizar", "Colores y aislamiento de cable: se separa antes"],
    proceso: ["Separar del PET (contaminante crítico)", "Retirar metal y cobre de cables", "Triturar y micronizar", "Mezclar con estabilizantes térmicos", "Extruir a baja temperatura"],
    ejemplos: ["Recortes de tubería", "Perfiles de ventana", "Aislante de cable"],
},
LDPE: {
    densidad: "0,91–0,93", flota: true, fusion: "105–115 °C", mfi: "0,3–50 g/10 min (190 °C/2,16 kg; film 0,5–3)",
    nir: "≈1215 / 1730 / 2310 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Muy reciclable si está limpio; el film sucio o con comida pierde valor.",
    colores: ["Transparente: mayor valor", "Negro o de color: menor valor"],
    proceso: ["Separar film limpio de film sucio o con sangre", "Triturar o aglomerar (densificar)", "Lavado por fricción", "Secado por centrífuga", "Extruir y pelletizar"],
    ejemplos: ["Vinipel / film de embalaje", "Bolsas con defecto de planta", "Sobrante de rollos (se usa para mangueras)"],
},
LLDPE: {
    densidad: "0,91–0,94", flota: true, fusion: "115–125 °C", mfi: "0,5–5 g/10 min (190 °C/2,16 kg, film)",
    nir: "≈1215 / 1730 / 2310 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Igual que el LDPE: depende de que el film esté limpio.",
    colores: ["Transparente: mayor valor", "Colores o impreso: menor valor"],
    proceso: ["Retirar cartón y cintas del rollo", "Aglomerar o triturar", "Lavar y secar", "Extruir con filtro fino", "Pelletizar"],
    ejemplos: ["Film estirable de paletizado", "Core de rollos con film", "Recortes de extrusión"],
},
PP: {
    densidad: "0,89–0,92", flota: true, fusion: "160–170 °C", mfi: "1–40 g/10 min (230 °C/2,16 kg)",
    nir: "≈1190 / 1720 / 2310 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Buen mercado; la contaminación con otros polímeros baja sus propiedades mecánicas.",
    colores: ["Natural: mayor valor", "Colores claros: valor medio", "Negro: menor valor"],
    proceso: ["Separar de HDPE por NIR", "Retirar metales y etiquetas", "Triturar y lavar", "Secar", "Extruir con desgasificación y pelletizar"],
    ejemplos: ["Tapas de botella", "Bigbags tejidos", "Piezas automotrices"],
},
PS: {
    densidad: "1,04–1,06", flota: false, fusion: "Amorfo: ablanda ~100 °C, se procesa a 180–240 °C", mfi: "2–30 g/10 min (200 °C/5 kg)",
    nir: "≈1140 / 1680 / 2170 nm", reciclabilidad: "Baja",
    reciclabilidad_nota: "Frágil y con pocos compradores; funciona mejor en recorte industrial limpio.",
    colores: ["Cristal (transparente): mayor valor", "Blanco o de color: menor valor"],
    proceso: ["Separar por tipo (cristal / alto impacto)", "Triturar", "Lavar y secar", "Extruir", "Pelletizar"],
    ejemplos: ["Recortes de bandejas", "Vasos termoformados", "Carcasas inyectadas"],
},
EPS: {
    densidad: "0,015–0,03 (expandido)", flota: true, fusion: "Amorfo: ablanda ~100 °C", mfi: "No aplica (se densifica antes)",
    nir: "≈1140 / 1680 / 2170 nm", reciclabilidad: "Baja",
    reciclabilidad_nota: "Pesa muy poco y ocupa mucho; solo es rentable si se densifica en origen.",
    colores: ["Blanco limpio: único con mercado claro", "Con comida o pintura: sin valor"],
    proceso: ["Separar icopor limpio", "Triturar en frío", "Compactar o fundir para densificar", "Extruir a pellet de PS", "Usar en moldeo o aislantes"],
    ejemplos: ["Empaque de electrodomésticos", "Recortes de bloque", "Neveras de icopor"],
},
ABS: {
    densidad: "1,04–1,06", flota: false, fusion: "Amorfo: ablanda ~105 °C, se procesa a 210–250 °C", mfi: "5–40 g/10 min (220 °C/10 kg)",
    nir: "≈1680 / 2140 / 2240 nm (el negro dificulta la lectura)", reciclabilidad: "Media",
    reciclabilidad_nota: "Buen mercado técnico; se separa de otros plásticos por densidad en salmuera.",
    colores: ["Natural o claro: mayor valor", "Negro: menor valor y difícil de identificar por NIR"],
    proceso: ["Separar por densidad en salmuera", "Retirar metales y pintura", "Triturar", "Secar (absorbe humedad)", "Extruir y pelletizar"],
    ejemplos: ["Carcasas de equipos", "Rebabas de inyección", "Restos de impresión 3D"],
},
PC: {
    densidad: "1,20–1,22", flota: false, fusion: "Amorfo: Tg ~147 °C, se procesa a 280–320 °C", mfi: "5–25 g/10 min (300 °C/1,2 kg)",
    nir: "≈1140 / 1690 / 2140 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Muy sensible a la humedad: debe secarse bien o se degrada al fundir.",
    colores: ["Transparente: mayor valor", "Opaco o de color: valor medio"],
    proceso: ["Separar de PMMA y otros transparentes", "Triturar", "Secado profundo (4 h a 120 °C)", "Extruir con filtro", "Pelletizar"],
    ejemplos: ["Láminas alveolares", "Lentes y piezas ópticas", "Discos"],
},
PA: {
    densidad: "1,12–1,15", flota: false, fusion: "220 °C (PA6) – 260 °C (PA66)", mfi: "No es la medida habitual (se usa viscosidad relativa)",
    nir: "≈1500 / 2050 / 2290 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Buen valor técnico, pero absorbe mucha humedad y debe secarse antes de procesar.",
    colores: ["Natural: mayor valor", "Negro o de color: valor medio"],
    proceso: ["Separar PA6 de PA66", "Triturar o cortar fibra", "Secado profundo", "Extruir en atmósfera seca", "Pelletizar"],
    ejemplos: ["Residuos de hilatura", "Cuerdas y redes", "Engranajes"],
},
PMMA: {
    densidad: "1,17–1,20", flota: false, fusion: "Amorfo: Tg ~105 °C, se procesa a 200–250 °C", mfi: "1–20 g/10 min (230 °C/3,8 kg)",
    nir: "≈1190 / 1700 / 2150 nm", reciclabilidad: "Media",
    reciclabilidad_nota: "Se puede despolimerizar a monómero (MMA) con alto rendimiento.",
    colores: ["Transparente: mayor valor", "Colores: valor medio"],
    proceso: ["Retirar película protectora y adhesivos", "Triturar", "Secar", "Extruir con filtración fina", "Pelletizar o despolimerizar a monómero"],
    ejemplos: ["Recortes de avisos", "Láminas de vitrina", "Piezas de corte láser"],
},
PU: {
    densidad: "1,10–1,25 (sólido); 0,03–0,05 (espuma)", flota: false, fusion: "TPU: 180–230 °C; el PU termoestable no funde", mfi: "TPU: 5–60 g/10 min (190 °C/8,7 kg)",
    nir: "≈1500 / 1700 / 2250 nm", reciclabilidad: "Baja",
    reciclabilidad_nota: "La espuma termoestable no se funde: se recicla por aglomerado o triturado.",
    colores: ["Sin criterio de color; se separa por tipo (espuma / TPU)"],
    proceso: ["Separar espuma de TPU", "Triturar", "Espuma: aglomerar con aglutinante", "TPU: secar y extruir", "Moldear o pelletizar"],
    ejemplos: ["Recortes de colchón", "Retales de suela", "Espuma de muebles"],
},
PLA: {
    densidad: "1,24–1,26", flota: false, fusion: "150–180 °C", mfi: "5–30 g/10 min (190 °C/2,16 kg)",
    nir: "≈1700 / 2130 / 2300 nm", reciclabilidad: "Baja",
    reciclabilidad_nota: "Contamina las corrientes de PET si se mezcla; se composta en planta industrial.",
    colores: ["Natural o transparente: mayor valor", "Colores: valor medio"],
    proceso: ["Separar de PET por NIR", "Triturar", "Secado (absorbe humedad)", "Extruir a baja temperatura", "Pelletizar o llevar a compostaje industrial"],
    ejemplos: ["Filamento de impresión 3D", "Vasos compostables", "Empaques compostables"],
},
};