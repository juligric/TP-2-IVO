# BookShelf — TP 2 IVO

Dashboard de libros donde el usuario puede buscar libros (vía la API de Open Library), guardarlos en favoritos, registrarse e iniciar sesión. Construido con Astro y Supabase.

## URL de producción

La aplicación está desplegada en:

**https://tp-2-ivo-jade.vercel.app/**

El deploy es automático: cada vez que se mergea a `main`, el pipeline de CI/CD publica la última versión (solo si lint, tests, e2e y build pasan).

## Tecnologías

- **Astro** — framework del frontend
- **Supabase** — autenticación y base de datos (favoritos, usuarios)
- **Open Library API** — búsqueda de libros
- **Vitest** — tests unitarios
- **Playwright** — tests end-to-end (E2E)
- **ESLint** — análisis de código (lint)
- **GitHub Actions** — pipeline de CI/CD
- **Vercel** — hosting y despliegue

## Cómo correr el proyecto localmente

```bash
npm install          # instalar dependencias
npm run dev          # levantar la app en modo desarrollo
```

> Requiere un archivo `.env` con las claves de Supabase (`PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY`).

## Cómo correr los tests

```bash
npm test             # tests unitarios (Vitest)
npm run test:e2e     # tests end-to-end (Playwright)
npm run lint         # análisis de código (ESLint)
```

## Convención de nombres de ramas

Las ramas siguen esta convención:

- `feature/nombre-de-la-funcionalidad` — para nuevas funcionalidades (ej: `feature/agregar-tests`)
- `fix/nombre-del-bug` — para corrección de errores

Ningún cambio se mergea directo a `main`: todo pasa por un Pull Request que referencia su issue (`closes #N`) y es revisado y aprobado por otro integrante antes de mergearse.

## Documentación de calidad

Las decisiones sobre testing, herramientas y el pipeline de CI/CD están documentadas en [CALIDAD.md](./CALIDAD.md).
