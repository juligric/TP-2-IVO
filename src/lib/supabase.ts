// Este archivo crea la conexión con Supabase, que es nuestra base de datos.
// Usa las variables del archivo .env para no exponer las claves en el código.

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
