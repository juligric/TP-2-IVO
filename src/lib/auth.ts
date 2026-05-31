// Este archivo tiene todas las funciones relacionadas con los usuarios:
// registrarse, iniciar sesión, cerrar sesión y obtener la sesión activa.
// Todas usan Supabase que es el servicio que maneja la autenticación.

import { supabase } from "./supabase";

// Registra un usuario nuevo con email, contraseña y nombre
export async function signUp(email: string, password: string, nombre: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nombre } },
  });
  if (error) throw error;
  return data;
}

// Inicia sesión con email y contraseña
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

// Cierra la sesión del usuario actual
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Devuelve la sesión activa (o null si no hay nadie logueado)
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}
