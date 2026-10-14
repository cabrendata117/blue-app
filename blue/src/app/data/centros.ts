import { mapa } from "./config";

export interface Centro {
  id: string;
  nombre_organizacion: string;
  tipo_entidad: string;
  categoria: "acopio" | "transformador"; // acopio = solo recibe | transformador = procesa y fabrica
  contacto: { telefono: string; direccion: string; link_maps: string; sitio_web: string };
  lat: number; // coordenadas APROXIMADAS (verifícalas en Google Maps, ver config.ts)
  lng: number;
  plasticos_aceptados: string[]; // ids de data/plasticos.ts
  servicios_b2b: string[];
  persona_natural: string; // qué recibe de personas naturales (mínimo / máximo)
  empresa: string; // qué recibe de empresas (mínimo / máximo)
  horario: string;
  imagen: string;
  etiqueta_imagen?: "ia" | "referencia"; // texto que se muestra sobre la imagen (borra la línea si es foto real)
}

// LEYENDA:  REAL = encontrado en su web, directorio o en el Directorio 2026 de la Alcaldía
//           INVENTADO = estimado por mí para que parezca real; confírmalo llamando al centro
// En TODOS: coordenadas (lat/lng), mín/máx de persona natural y empresa, y tipos de plástico = INVENTADO/APROX.
// IMÁGENES: crea blue/public/images/centros/ y guarda ahí la foto de cada centro (fachada o bodega).
export const centros: Centro[] = [
  {
    id: "reciclemos", categoria: "acopio",
    nombre_organizacion: "Reciclemos Organización de Recicladores",
    tipo_entidad: "Asociación de recicladores", // REAL
    contacto: {
      telefono: "312 529 9388 / 320 810 8574", // REAL (Directorio 2026 y su web)
      direccion: "Cra 10 # 16-45, Bucaramanga", // REAL
      link_maps: mapa("Cra 10 # 16-45, Bucaramanga"),
      sitio_web: "https://bucaramangareciclemos.com.co/", // REAL
    },
    lat: 7.1121, lng: -73.1291,
    plasticos_aceptados: ["PET", "HDPE", "PP", "LDPE"], // INVENTADO
    servicios_b2b: ["Recolección y transporte", "Almacenamiento y limpieza de material", "Atención a sector industrial y comercial"], // REAL
    persona_natural: "Sí. Desde 1 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 50 kg; recolección programada", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/reciclemos.jpg", // IMAGEN: fachada de Reciclemos
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "bello-renacer", categoria: "acopio",
    nombre_organizacion: "Bello Renacer - Cooperativa de Recicladores",
    tipo_entidad: "Cooperativa de recicladores", // REAL
    contacto: {
      telefono: "315 329 6499 / 324 250 2633", // REAL (Directorio 2026 y su web)
      direccion: "Km 4 Vía Bucaramanga-Girón, Centro de Acopio El Carrasco", // REAL
      link_maps: mapa("Centro de Acopio El Carrasco Km 4 Vía Bucaramanga-Girón"),
      sitio_web: "https://www.recicladoresbellorenacer.com/", // REAL
    },
    lat: 7.0960, lng: -73.1480,
    plasticos_aceptados: ["PET", "HDPE", "LDPE", "PP"], // INVENTADO
    servicios_b2b: ["Rutas selectivas de recolección", "Centro de acopio El Carrasco"], // REAL
    persona_natural: "Sí. Desde 5 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 100 kg; hasta 5 toneladas por visita", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/bello-renacer.jpg", // IMAGEN: Centro de Acopio El Carrasco
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "abc-recuperar", categoria: "acopio",
    nombre_organizacion: "ABC Recuperar",
    tipo_entidad: "Empresa de reciclaje", // REAL
    contacto: {
      telefono: "317 430 0755", // REAL
      direccion: "Carrera 10 # 27-18, Bucaramanga", // REAL
      link_maps: mapa("Carrera 10 # 27-18, Bucaramanga"),
      sitio_web: "https://www.abcrecuperar.com/", // REAL
    },
    lat: 7.1162, lng: -73.1291,
    plasticos_aceptados: ["PET", "HDPE", "PP", "PVC"], // INVENTADO
    servicios_b2b: ["Compra de plástico, cartón, archivo y metales", "Recolección a domicilio"], // REAL
    persona_natural: "Sí. Desde 1 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 30 kg; recolección a domicilio", // INVENTADO
    horario: "Lunes a sábado, 8:00 a 19:00", // REAL
    imagen: "/images/centros/abc-recuperar.jpg", // IMAGEN: fachada de ABC Recuperar
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "recicladora-la-23", categoria: "acopio",
    nombre_organizacion: "Recicladora La 23",
    tipo_entidad: "Bodega de reciclaje", // REAL
    contacto: {
      telefono: "313 851 0625", // REAL
      direccion: "Calle 23 # 10-44, Barrio Girardot, Bucaramanga", // REAL
      link_maps: mapa("Calle 23 # 10-44, Bucaramanga"),
      sitio_web: "https://www.recicladorala23.amawebs.com", // REAL (según directorio)
    },
    lat: 7.1147, lng: -73.1291,
    plasticos_aceptados: ["PET", "HDPE", "LDPE", "PVC"], // INVENTADO
    servicios_b2b: ["Compra y venta de excedentes industriales", "Compra de plástico, chatarra, cartón y archivo"], // REAL
    persona_natural: "Sí. Desde 1 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 100 kg", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/recicladora-la-23.jpg", // IMAGEN: fachada de Recicladora La 23
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "recuperadora-giron", categoria: "acopio",
    nombre_organizacion: "Recuperadora Girón",
    tipo_entidad: "Bodega de reciclaje", // REAL
    contacto: { telefono: "Consultar", direccion: "Cl 30 # 22-40, Girón", link_maps: mapa("Cl 30 # 22-40, Girón"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.0685, lng: -73.1700,
    plasticos_aceptados: ["PET", "HDPE", "PP", "LDPE"], // INVENTADO
    servicios_b2b: ["Compra de material por peso", "Pesaje certificado"], // INVENTADO
    persona_natural: "Sí. Desde 1 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 50 kg", // INVENTADO
    horario: "Lunes a sábado (no atiende domingos)", // REAL
    imagen: "/images/centros/recuperadora-giron.jpg", // IMAGEN: fachada
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "recumsoc", categoria: "acopio",
    nombre_organizacion: "Recumsoc C.T.A.",
    tipo_entidad: "Cooperativa de trabajo asociado", // REAL (por su sigla)
    contacto: { telefono: "Consultar", direccion: "Cl 57 # 49A-32, Panorama La Cumbre", link_maps: mapa("Cl 57 # 49A-32, Bucaramanga"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.1280, lng: -73.1030, // APROX. dudosa: verifícala
    plasticos_aceptados: ["PET", "HDPE", "PP", "PS"], // INVENTADO
    servicios_b2b: ["Recolección programada para empresas", "Clasificación de material"], // INVENTADO
    persona_natural: "Sí. Desde 5 kg", // INVENTADO
    empresa: "Sí. Desde 100 kg", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/recumsoc.jpg", // IMAGEN: sede
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "recuperacion-materiales-santander", categoria: "acopio",
    nombre_organizacion: "Recuperación de Materiales de Santander",
    tipo_entidad: "Bodega de reciclaje", // REAL
    contacto: { telefono: "Consultar", direccion: "Cl 24 # 14-42, Bucaramanga", link_maps: mapa("Cl 24 # 14-42, Bucaramanga"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.1151, lng: -73.1263,
    plasticos_aceptados: ["HDPE", "PP", "ABS", "PC"], // INVENTADO
    servicios_b2b: ["Compra de plástico técnico y rígido", "Recolección en planta"], // INVENTADO
    persona_natural: "No. Solo empresas", // INVENTADO
    empresa: "Sí. Desde 200 kg", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/recuperacion-materiales-santander.jpg", // IMAGEN: fachada
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "recicladora-el-yor", categoria: "acopio",
    nombre_organizacion: "Recicladora El Yor",
    tipo_entidad: "Bodega de reciclaje", // REAL
    contacto: { telefono: "Consultar", direccion: "Cr 18 # 51-219, Bucaramanga", link_maps: mapa("Cr 18 # 51-219, Bucaramanga"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.1254, lng: -73.1235,
    plasticos_aceptados: ["PET", "HDPE", "LDPE", "PP"], // INVENTADO
    servicios_b2b: ["Compra de material por peso", "Recolección a domicilio"], // INVENTADO
    persona_natural: "Sí. Desde 1 kg, sin máximo", // INVENTADO
    empresa: "Sí. Desde 50 kg", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/recicladora-el-yor.jpg", // IMAGEN: fachada
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "replasander", categoria: "transformador",
    nombre_organizacion: "Replasander Ltda.",
    tipo_entidad: "Planta recicladora de plásticos", // REAL (figura en directorio de plantas)
    contacto: { telefono: "Consultar", direccion: "Cra 14 # 57-139, Km 7 Vía Girón", link_maps: mapa("Cra 14 # 57-139 Km 7 Vía Girón"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.0820, lng: -73.1570,
    plasticos_aceptados: ["HDPE", "LDPE", "LLDPE", "PP", "PS", "ABS"], // INVENTADO
    servicios_b2b: ["Compra de scrap industrial por volumen", "Venta de material reciclado (pellet)", "Certificado de disposición"], // INVENTADO
    persona_natural: "No. Solo empresas", // INVENTADO
    empresa: "Sí. Desde 500 kg; hasta 20 toneladas por lote", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/replasander.jpg", // IMAGEN: planta de Replasander
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "mesan", categoria: "transformador",
    nombre_organizacion: "Mesan Ltda.",
    tipo_entidad: "Recicladora / transformadora", // REAL (listada como reciclaje); ser transformadora = INVENTADO
    contacto: { telefono: "Consultar", direccion: "Cra 14 # 57-140, Km 7 Vía Girón", link_maps: mapa("Cra 14 # 57-140 Km 7 Vía Girón"), sitio_web: "N/A" }, // REAL (dirección)
    lat: 7.0820, lng: -73.1572,
    plasticos_aceptados: ["HDPE", "LDPE", "PP", "PVC"], // INVENTADO
    servicios_b2b: ["Compra de excedentes industriales", "Recolección en planta"], // INVENTADO
    persona_natural: "No. Solo empresas", // INVENTADO
    empresa: "Sí. Desde 300 kg", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/mesan.jpg", // IMAGEN: bodega de Mesan
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "mao-plasticos", categoria: "transformador",
    nombre_organizacion: "Mao Plásticos S.A.",
    tipo_entidad: "Fabricante (mangueras)", // REAL: la asesora indica que fabrica mangueras con el sobrante de Carlixplast; el listado la ubica en Km 7 Vía Girón
    contacto: { telefono: "Consultar", direccion: "Km 7 Vía Girón", link_maps: mapa("Mao Plásticos Km 7 Vía Girón"), sitio_web: "N/A" },
    lat: 7.0820, lng: -73.1575,
    plasticos_aceptados: ["LDPE", "LLDPE", "HDPE"], // INVENTADO (film sobrante para mangueras)
    servicios_b2b: ["Recibe sobrante de film de otras plantas para fabricar mangueras", "Venta de mangueras"], // REAL (según tu asesora) / venta INVENTADO
    persona_natural: "No. Solo empresas", // INVENTADO
    empresa: "Sí. Desde 1 tonelada", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/mao-plasticos.jpg", // IMAGEN: planta o mangueras de Mao Plásticos
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
  {
    id: "carlixplast", categoria: "transformador",
    nombre_organizacion: "Carlixplast Ltda.",
    tipo_entidad: "Fabricante (rollos y bolsas)", // REAL
    contacto: {
      telefono: "(607) 642 8833", // REAL
      direccion: "Calle 33 # 11-83, Bucaramanga (planta: Parque Industrial 1, Vía Chimitá)", // REAL
      link_maps: mapa("Calle 33 # 11-83, Bucaramanga"),
      sitio_web: "https://carlixplast.com/", // REAL
    },
    lat: 7.1185, lng: -73.1280,
    plasticos_aceptados: ["LDPE", "LLDPE"], // INVENTADO: ellos generan sobrante de film que va a Mao Plásticos
    servicios_b2b: ["Fabricación de bolsas, vinipel y rollos de empaque", "Su sobrante de film se entrega a fabricantes de mangueras"], // REAL (productos) / sobrante: dato de tu asesora
    persona_natural: "No. Solo empresas", // INVENTADO
    empresa: "Consultar", // INVENTADO
    horario: "Consultar",
    imagen: "/images/centros/carlixplast.jpg", // IMAGEN: planta o rollos de Carlixplast
    etiqueta_imagen: "ia", // "ia" = hecho con IA | "referencia" = imagen de referencia | borra esta línea si es foto real
  },
];