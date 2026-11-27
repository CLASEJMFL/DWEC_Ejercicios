# JavaScript - Resumen de las 10 actividades de Strings

1. **Concatenar cadenas:** Unir dos o más strings.
   - `+` o `${}` con backticks.

2. **Longitud de un string:** Saber cuántos caracteres tiene una cadena.
   - `.length`

3. **Primer y último carácter:** Obtener caracteres de una posición concreta.
   - `[0]` → Primer carácter.
   - `.at(-1)` → Último carácter.

4. **Mayúsculas y minúsculas:** Cambiar el formato de un texto.
   - `.toLocaleUpperCase()` → Mayúsculas.
   - `.toLocaleLowerCase()` → Minúsculas.

5. **Cadenas en varias líneas:** Introducir saltos de línea en un texto.
   - `\n` → Salto de línea.

6. **Interpolación de variables:** Introducir variables dentro de un string.
   - `${variable}` usando backticks.

7. **Reemplazar espacios:** Sustituir todos los espacios por otro carácter.
   - `.replaceAll(" ", "_")`

8. **Comprobar si contiene una palabra:** Verificar si un texto contiene otro.
   - `.includes("palabra")`

9. **Comprobar si dos strings son iguales:** Comparar dos cadenas de texto.
   - `===`

10. **Comprobar si tienen la misma longitud:** Comparar el número de caracteres de dos strings.
    - `.length === .length`

---

## Tabla rápida de métodos

| Método / Propiedad | Utilidad |
|---|---|
| `+` | Concatenar |
| `${}` | Interpolar variables |
| `.length` | Longitud |
| `[0]` | Primer carácter |
| `.at(-1)` | Último carácter |
| `.toLocaleUpperCase()` | Mayúsculas |
| `.toLocaleLowerCase()` | Minúsculas |
| `\n` | Salto de línea |
| `.replaceAll()` | Reemplazar texto |
| `.includes()` | Buscar palabras |
| `===` | Comparar igualdad |