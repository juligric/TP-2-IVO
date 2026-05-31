// Este archivo maneja todo lo relacionado con la base de datos:
// guardar libros favoritos, obtenerlos y eliminarlos.
// Usa la tabla "favoritos" que está en Supabase.

import { supabase } from "./supabase";
import type { Favorito, Profile } from "./types";

// Trae el perfil de un usuario por su ID
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data as Profile;
}

// Devuelve todos los favoritos de un usuario, ordenados por fecha
export async function getFavoritos(userId: string) {
  const { data, error } = await supabase
    .from("favoritos")
    .select("*")
    .eq("usuario_id", userId)
    .order("added_at", { ascending: false });
  if (error) throw error;
  return data as Favorito[];
}

// Agrega un libro a los favoritos del usuario
export async function agregarFavorito(
  userId: string,
  book: Pick<Favorito, "book_id" | "titulo" | "autores" | "thumbnail">
) {
  const { error } = await supabase
    .from("favoritos")
    .insert({ usuario_id: userId, ...book });
  if (error) throw error;
}

// Elimina un libro de los favoritos del usuario
export async function eliminarFavorito(userId: string, bookId: string) {
  const { error } = await supabase
    .from("favoritos")
    .delete()
    .eq("usuario_id", userId)
    .eq("book_id", bookId);
  if (error) throw error;
}
