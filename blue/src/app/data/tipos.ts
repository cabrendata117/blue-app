// Tipos de datos de Blue. Los datos viven en la base de datos (Supabase); aquí solo se describe su forma.

export interface Ficha {
  densidad: string; // g/cm³
  flota: boolean; // ¿flota en agua? (clave para separar por densidad)
  fusion: string;
  mfi: string; // índice de fluidez
  nir: string; // banda NIR (aproximada)
  reciclabilidad: "Alta" | "Media" | "Baja";
  reciclabilidad_nota: string;
  colores: string[]; // cómo cambia el valor según el color
  proceso: string[]; // reciclaje mecánico de ESTE plástico
  ejemplos: string[]; // objetos de ejemplo (cada uno lleva su foto aparte)
}

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

export interface PlasticoDetalle extends Plastico {
  ficha: Ficha | null;
}

export interface Centro {
  id: string;
  nombre_organizacion: string;
  tipo_entidad: string;
  categoria: "acopio" | "transformador"; // acopio = solo recibe | transformador = procesa y fabrica
  contacto: { telefono: string; direccion: string; link_maps: string; sitio_web: string };
  lat: number; // coordenadas APROXIMADAS (verifícalas en Google Maps, ver config.ts)
  lng: number;
  plasticos_aceptados: string[]; // ids de plásticos
  servicios_b2b: string[];
  persona_natural: string; // qué recibe de personas naturales (mínimo / máximo)
  empresa: string; // qué recibe de empresas (mínimo / máximo)
  horario: string;
  imagen: string;
  etiqueta_imagen?: "ia" | "referencia"; // texto sobre la imagen (vacío si es foto real)
  datos_confirmados: boolean; // false = plásticos y cantidades son ESTIMADOS
}