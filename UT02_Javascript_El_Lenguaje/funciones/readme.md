# Resumen de JavaScript: Funciones

## FUNCIONES

### 1. Función que suma dos números
- Creamos una función con dos parámetros.
- Utilizamos el operador `+` para sumar.
- `return` devuelve el resultado.

### 2. Encontrar el número mayor de un array
- Recibimos un array de números.
- Utilizamos `Math.max()` para encontrar el número mayor.
- El operador `...` (spread) permite pasar los elementos del array como argumentos.

### 3. Contar las vocales de un string
- Recorremos el texto con un `for...of`.
- Utilizamos `toLowerCase()` para convertir las letras a minúsculas.
- Utilizamos `includes()` para comprobar si cada letra es una vocal.
- Sumamos una unidad al contador cuando encontramos una vocal.

### 4. Convertir strings a mayúsculas
- Recibimos un array de palabras.
- Utilizamos `map()` para recorrerlo y crear un nuevo array.
- Utilizamos `toUpperCase()` para convertir cada palabra a mayúsculas.

### 5. Comprobar si un número es primo
- Un número primo solamente es divisible entre 1 y él mismo.
- Comprobamos primero que sea mayor que 1.
- Utilizamos un bucle `for` para buscar divisores.
- El operador `%` permite comprobar el resto de una división.
- Si encontramos un divisor, devolvemos `false`; si no, devolvemos `true`.

### 6. Encontrar elementos comunes entre dos arrays
- Recibimos dos arrays.
- Utilizamos `filter()` para recorrer el primero.
- Utilizamos `includes()` para comprobar si cada elemento también está en el segundo.
- Devolvemos un nuevo array con los elementos comunes.

### 7. Sumar los números pares de un array
Utilizamos dos métodos:
- `filter()`: selecciona los números pares utilizando `% 2 === 0`.
- `reduce()`: suma todos los números seleccionados.

### 8. Elevar números al cuadrado
- Recibimos un array de números.
- Utilizamos `map()` para recorrerlo.
- Utilizamos `** 2` para elevar cada número al cuadrado.
- Devolvemos un nuevo array.

### 9. Invertir el orden de las palabras
Utilizamos tres métodos:
- `split(" ")`: convierte el texto en un array de palabras.
- `reverse()`: invierte el orden de los elementos.
- `join(" ")`: vuelve a unir las palabras en un string.

### 10. Calcular el factorial de un número
- El factorial de un número es el producto de todos los enteros positivos desde 1 hasta ese número.