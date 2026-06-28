# Documentación de Calidad — BookShelf (TP 2 IVO)

Este documento explica las decisiones que tomamos para asegurar la calidad del producto.

## 1. Estrategia general

El objetivo de nuestra estrategia de calidad fue triple: asegurar que la aplicación no se rompa al publicarse, aprender e implementar un flujo de trabajo profesional, y cumplir con todos los requisitos de la consigna.

Para lograrlo, decidimos automatizar los controles de calidad mediante un pipeline de CI/CD: en lugar de revisar todo a mano, configuramos un sistema que valida cada cambio automáticamente antes de permitir que llegue a producción. La idea central es que ningún código se publique sin haber pasado por una serie de controles (estilo, tests y armado), de manera que si algo falla, lo detectamos nosotras antes que el usuario.

Además, organizamos todo el trabajo con un flujo de issues y Pull Requests con revisión, para que cada cambio quede documentado, justificado y revisado por la otra persona antes de integrarse.

## 2. Herramientas seleccionadas

- **Vitest (tests unitarios):** lo elegimos porque es una herramienta moderna, rápida y que se integra de forma nativa con proyectos basados en Vite/Astro. La usamos para probar la lógica de negocio aislada (funciones puras).

- **Playwright (tests E2E):** lo elegimos para los tests de punta a punta porque permite simular a un usuario real en un navegador. Evaluamos Cypress como alternativa, pero optamos por Playwright porque es más rápido, moderno, y se integra mejor con GitHub Actions (el entorno donde corre nuestro pipeline).

- **ESLint (lint):** lo usamos para revisar que el código mantenga un estilo consistente y para detectar errores comunes (como variables sin usar o usos de `any`). Sumamos los complementos de TypeScript y Astro para que entienda nuestro stack.

- **GitHub Actions (CI/CD):** lo elegimos como motor del pipeline porque está integrado directamente en GitHub (donde ya vive nuestro código). Ademas no requiere herramientas externas.

- **Vercel (deploy):** lo usamos para el despliegue porque es simple, se integra bien con Astro. Decidimos controlar el deploy desde el pipeline (y no con la integración automática de Vercel) para asegurarnos de que solo se publique si los tests pasan.

## 3. Tests desarrollados

- **Test unitario 1 — `getCoverUrl` (tamaño indicado):** verifica que la función que arma la URL de la tapa de un libro genere la dirección correcta cuando se le pasa un ID y un tamaño específico (ej: `getCoverUrl(12345, "L")`).

- **Test unitario 2 — `getCoverUrl` (tamaño por defecto):** verifica que, si no se indica un tamaño, la función use `"M"` por defecto. Esto cubre el comportamiento del valor predeterminado.

- **Test E2E — carga de la página de login:** simula a un usuario entrando a `/login` y verifica que la página cargue correctamente con su formulario (título, campos de email y contraseña, y botón de envío). Protege el flujo de entrada de la aplicación.

## 4. Casos de uso críticos

Los flujos que consideramos más importantes proteger son el **login** y la **búsqueda de libros**, porque son la puerta de entrada y la función central de la aplicación:

- El **login** es crítico porque, si falla, el usuario directamente no puede acceder a la aplicación ni a sus favoritos. Por eso lo cubrimos con el test E2E, que verifica que la pantalla de acceso cargue correctamente.

- La **búsqueda de libros** es el corazón funcional de la app (es lo que conecta con la API de Open Library). La lógica relacionada con mostrar los resultados (como armar las URLs de las tapas) la cubrimos con los tests unitarios.

Priorizamos estos flujos sobre otros (como la edición de favoritos) porque, si la entrada o la búsqueda fallan, el resto de la aplicación deja de tener sentido.

## 5. Pipeline de CI/CD

El pipeline está definido en `.github/workflows/ci.yml` y se ejecuta automáticamente en cada push y en cada Pull Request a `main`. Los pasos, en orden, son:

1. **Bajar el código e instalar dependencias:** prepara el entorno en la máquina de GitHub.
2. **Lint (ESLint):** revisa el estilo y la calidad del código.
3. **Tests unitarios (Vitest):** valida la lógica de negocio.
4. **Tests E2E (Playwright):** instala el navegador y verifica el flujo principal en un navegador real.
5. **Build (Astro):** arma la aplicación para producción.
6. **Deploy (Vercel):** publica la aplicación.

La decisión de diseño más importante es el **orden**: el deploy está al final. Esto significa que la aplicación **solo se publica si todos los pasos anteriores pasaron**. Si el lint falla, el pipeline se frena ahí y no llega a ejecutar los tests ni a publicar. De esta forma, garantizamos que a producción solo llega código que pasó todos los controles.

También configuramos las claves de Supabase como *secrets* de GitHub (para que el build funcione sin exponer información) y el deploy a Vercel mediante un token, también guardado como secret.

## 6. Limitaciones y deuda técnica

- **Uso de `any` en el código:** el lint detectó varios usos de `any` en el código.  Decidimos configurar esa regla como *warning* en lugar de *error*, para no frenar el pipeline por un detalle de tipado. Lo dejamos documentado como deuda técnica: con más tiempo, reemplazaríamos esos `any` por tipos específicos.

- **Cobertura de tests acotada:** por el alcance del TP, los tests cubren la lógica de las URLs de tapas y la carga del login. Con más tiempo, sumaríamos tests para los favoritos (agregar/eliminar), el registro, y un E2E del flujo de búsqueda completo.

- **Base de datos en plan gratuito:** la aplicación usa el plan gratuito de Supabase, que pausa el proyecto por inactividad. Esto puede hacer que el login falle temporalmente si la base está "dormida". En un entorno real, se usaría un plan que no se suspende.

- **Test E2E acotado:** el test E2E verifica que la página de login carga, pero no prueba un login real contra Supabase. Es una decisión que tomamos para mantener el pipeline estable.