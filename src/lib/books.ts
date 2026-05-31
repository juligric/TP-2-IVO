// Este archivo se conecta a la API gratuita de Open Library para buscar libros.
// Dado un texto de búsqueda, devuelve una lista de libros con su info.

import type { OpenLibraryBook } from "./types";

const BASE_URL = "https://openlibrary.org/search.json";

// Busca libros por título, autor o tema y devuelve hasta 20 resultados
export async function buscarLibros(query: string, limit = 20): Promise<OpenLibraryBook[]> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`${BASE_URL}?${params}`);
  if (!res.ok) throw new Error(`Error al buscar: ${res.status}`);
  const data = await res.json();
  return (data.docs ?? []) as OpenLibraryBook[];
}

// Genera la URL de la imagen de tapa de un libro según su ID
export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M") {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
