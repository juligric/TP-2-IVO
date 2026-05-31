// Este archivo maneja todo lo relacionado con la base de datos:
// guardar libros favoritos, obtenerlos y eliminarlos.
// Usa la tabla "favoritos" que está en Supabase.

import { supabase } from "./supabase";
import type { Favorito } from "./types";

// Devuelve todos los favoritos de un usuario, ordenados por fecha
export async function getFavoritos(userId: string) {
  const { data, error } = await supabase
    .from("favorite_books")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Favorito[];
}

// Agrega un libro a los favoritos del usuario
export async function agregarFavorito(
  userId: string,
  book: Pick<Favorito, "book_id" | "title" | "author" | "cover_url">
) {
  const { error } = await supabase
    .from("favorite_books")
    .insert({ user_id: userId, ...book });
  if (error) throw error;
}

// Elimina un libro de los favoritos del usuario
export async function eliminarFavorito(userId: string, bookId: string) {
  const { error } = await supabase
    .from("favorite_books")
    .delete()
    .eq("user_id", userId)
    .eq("book_id", bookId);
  if (error) throw error;
}
