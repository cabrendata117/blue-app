// Conexión con Supabase (PostgreSQL) y consultas. Las páginas leen los datos solo desde aquí.
import { createClient } from "@supabase/supabase-js";
import { filaACentro, filaAPlastico, filaAPlasticoDetalle } from "./mapeo";
import type { Centro, Plastico, PlasticoDetalle } from "./tipos";

function cliente() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Supabase ahora llama a esta clave "publishable"; si tu proyecto es antiguo, también funciona la "anon"
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Faltan NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY en el archivo .env.local (reinicia npm run dev después de crearlo).");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

const CENTRO = "*, centros_plasticos(plastico_id)"; // centro + ids de los plásticos que recibe

export async function getCentros(): Promise<Centro[]> {
  const { data, error } = await cliente().from("centros").select(CENTRO).order("nombre_organizacion");
  if (error) throw new Error(`Supabase (centros): ${error.message}`);
  return (data ?? []).map(filaACentro);
}

export async function getCentro(id: string): Promise<Centro | null> {
  const { data, error } = await cliente().from("centros").select(CENTRO).eq("id", id).maybeSingle();
  if (error) throw new Error(`Supabase (centro ${id}): ${error.message}`);
  return data ? filaACentro(data) : null;
}

export async function getPlasticos(): Promise<Plastico[]> {
  const { data, error } = await cliente().from("plasticos").select("*").order("orden");
  if (error) throw new Error(`Supabase (plasticos): ${error.message}`);
  return (data ?? []).map(filaAPlastico);
}

// Todos los plásticos con su ficha técnica (lo usa el chatbot para armar su contexto)
export async function getPlasticosDetalle(): Promise<PlasticoDetalle[]> {
  const { data, error } = await cliente().from("plasticos").select("*, ficha:fichas_tecnicas(*)").order("orden");
  if (error) throw new Error(`Supabase (plasticos con ficha): ${error.message}`);
  return (data ?? []).map(filaAPlasticoDetalle);
}

export async function getPlastico(id: string): Promise<PlasticoDetalle | null> {
  const { data, error } = await cliente().from("plasticos").select("*, ficha:fichas_tecnicas(*)").eq("id", id).maybeSingle();
  if (error) throw new Error(`Supabase (plástico ${id}): ${error.message}`);
  return data ? filaAPlasticoDetalle(data) : null;
}