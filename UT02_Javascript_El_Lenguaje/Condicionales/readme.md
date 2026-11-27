# Resumen de JavaScript: Condicionales

## IF / ELSE / ELSE IF / TERNARIO

### 1. Comprobar un nombre
- Utilizamos `if` para comprobar si una variable tiene un valor determinado.
- Si se cumple la condición, ejecutamos el código.

### 2. Comprobar usuario y contraseña
- Utilizamos `if` y `else`.
- El operador `&&` permite comprobar dos condiciones a la vez.
- Si ambas son verdaderas, el acceso es correcto.

### 3. Número positivo, negativo o cero
- Utilizamos `if`, `else if` y `else`.
- `if`: comprueba si el número es mayor que cero.
- `else if`: comprueba si es menor que cero.
- `else`: significa que es cero.

### 4. Comprobar si una persona puede votar
- Utilizamos `if` y `else`.
- Si la edad es mayor o igual a 18, puede votar.
- Si es menor, calculamos los años que le faltan.

### 5. Operador ternario
- Es una forma abreviada de escribir un `if/else`.
- Su estructura es:

```javascript
condicion ? valorSiVerdadero : valorSiFalso;
```

- En el ejercicio asignamos "adulto" o "menor" dependiendo de la edad.

### 6. Estaciones del año
- Utilizamos `if`, `else if` y `else`.
- Comprobamos el número del mes para determinar la estación.
- También comprobamos que el mes sea válido.

### 7. Días de un mes
- Utilizamos condiciones para agrupar los meses según sus días.
- Hay meses de 31 días, de 30 días y febrero, que tiene 28 o 29.

## SWITCH

### 8. Saludo dependiendo del idioma
- Utilizamos `switch` para comparar una variable con diferentes valores.
- Cada `case` representa una opción.
- `break` evita que se ejecuten los siguientes casos.
- `default` se ejecuta si no coincide ningún caso.

### 9. Estaciones del año con switch
- Repetimos el ejercicio 6 utilizando `switch`.
- Agrupamos varios `case` para que compartan el mismo resultado.

### 10. Días de un mes con switch
- Repetimos el ejercicio 7 utilizando `switch`.
- Agrupamos los meses que tienen el mismo número de días.

---

## Conceptos importantes

| Concepto | Función |
|---|---|
| `if` | Ejecuta código si una condición es verdadera. |
| `else` | Ejecuta código si la condición anterior es falsa. |
| `else if` | Comprueba otra condición. |
| `&&` | AND lógico: ambas condiciones deben cumplirse. |
| `||` | OR lógico: basta con que una condición se cumpla. |
| `===` | Comprueba igualdad estricta. |
| `>=` | Mayor o igual que. |
| `<=` | Menor o igual que. |
| `? :` | Operador ternario. |
| `switch` | Compara una variable con diferentes casos. |
| `case` | Define una opción dentro del switch. |
| `break` | Termina la ejecución del caso. |
| `default` | Se ejecuta si no coincide ningún caso. |

**Conclusión:** Los condicionales permiten que un programa tome decisiones dependiendo de los valores de las variables. `if/else` permite evaluar condiciones y `switch` facilita comparar una variable con diferentes opciones.