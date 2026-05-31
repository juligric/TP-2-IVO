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
  user_id: string;
  book_id: string;
  title: string;
  author: string | null;
  cover_url: string | null;
  created_at: string;
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
