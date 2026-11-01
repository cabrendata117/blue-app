// Convierte las filas de la base de datos al formato que usan las páginas.
// Son funciones puras (no llaman a la red), por eso se pueden probar solas.
import type { Centro, Ficha, Plastico, PlasticoDetalle } from "./tipos";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Fila = Record<string, any>;

export function filaAFicha(f: Fila): Ficha {
  return {
    densidad: f.densidad,
    flota: f.flota,
    fusion: f.fusion,
    mfi: f.mfi,
    nir: f.nir,
    reciclabilidad: f.reciclabilidad,
    reciclabilidad_nota: f.reciclabilidad_nota,
    colores: f.colores ?? [],
    proceso: f.proceso ?? [],
    ejemplos: f.ejemplos ?? [],
  };
}

export function filaAPlastico(r: Fila): Plastico {
  return {
    id: r.id,
    nombre: r.nombre,
    codigo: r.codigo,
    descripcion_corta: r.descripcion_corta,
    descripcion_larga: r.descripcion_larga,
    origen_postindustrial: r.origen_postindustrial,
    usos_reciclado: r.usos_reciclado ?? [],
    imagen: r.imagen,
  };
}

export function filaAPlasticoDetalle(r: Fila): PlasticoDetalle {
  // Si la ficha viene como lista (según la relación), se toma el primer elemento
  const ficha = Array.isArray(r.ficha) ? r.ficha[0] : r.ficha;
  return { ...filaAPlastico(r), ficha: ficha ? filaAFicha(ficha) : null };
}

export function filaACentro(r: Fila): Centro {
  const aceptados: string[] = (r.centros_plasticos ?? []).map((x: Fila) => x.plastico_id);
  return {
    id: r.id,
    nombre_organizacion: r.nombre_organizacion,
    tipo_entidad: r.tipo_entidad,
    categoria: r.categoria,
    contacto: { telefono: r.telefono, direccion: r.direccion, link_maps: r.link_maps, sitio_web: r.sitio_web },
    lat: r.lat,
    lng: r.lng,
    plasticos_aceptados: aceptados.sort((a, b) => a.localeCompare(b)),
    servicios_b2b: r.servicios_b2b ?? [],
    persona_natural: r.persona_natural,
    empresa: r.empresa,
    horario: r.horario,
    imagen: r.imagen,
    etiqueta_imagen: r.etiqueta_imagen ?? undefined,
    datos_confirmados: r.datos_confirmados,
  };
}