import { describe, it, expect } from "vitest";
import { getCoverUrl } from "./books";

describe("getCoverUrl", () => {
  it("arma la URL de la tapa con el tamaño indicado", () => {
    expect(getCoverUrl(12345, "L")).toBe(
      "https://covers.openlibrary.org/b/id/12345-L.jpg"
    );
  });

  it("usa el tamaño M por defecto si no se indica ninguno", () => {
    expect(getCoverUrl(999)).toBe(
      "https://covers.openlibrary.org/b/id/999-M.jpg"
    );
  });
});