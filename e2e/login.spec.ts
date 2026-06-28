import { test, expect } from "@playwright/test";

test("la página de login carga con su formulario", async ({ page }) => {
  await page.goto("/login");

  await expect(page).toHaveTitle(/Iniciar sesión/);

  await expect(page.getByRole("heading", { name: "Bienvenido de nuevo" })).toBeVisible();

  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();

  await expect(page.getByRole("button", { name: /Entrar/ })).toBeVisible();
});