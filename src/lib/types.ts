// Acá definimos los "tipos" de datos que vamos a usar en toda la app.
// Básicamente le decimos a TypeScript cómo se ve cada objeto.

// Perfil de usuario guardado en Supabase
export interface Profile {
  id: string;
  nombre: string | null;
  rol: "admin" | "user";
  created_at: string;
}

// Un libro guardado en favoritos
export interface Favorito {
  id: string;
  usuario_id: string;
  book_id: string;
  titulo: string;
  autores: string | null;
  thumbnail: string | null;
  added_at: string;
}

// Formato de libro que devuelve la API de Open Library
export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  subject?: string[];
  cover_i?: number;
  first_publish_year?: number;
  isbn?: string[];
}
