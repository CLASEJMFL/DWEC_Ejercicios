# Resumen de JavaScript: Arrays, Sets y Maps

## ARRAYS

### 1. Crear un array de cinco animales
- Utilizamos `let` para crear una variable.
- Los arrays almacenan varios elementos en una misma variable.
- Se escriben entre corchetes `[]`.

### 2. Añadir dos animales
Utilizamos dos métodos:
- `unshift()`: añade un elemento al principio del array.
- `push()`: añade un elemento al final del array.

### 3. Eliminar el tercer animal
- Utilizamos `splice()`.
- Permite eliminar elementos indicando su posición y cuántos queremos eliminar.
- Los arrays empiezan a contar desde la posición `0`.

Ejemplo:
```javascript
animales.splice(2, 1);
```

## SETS

### 4. Crear un Set de cinco libros
- Un `Set` almacena una colección de valores únicos.
- Se crea utilizando `new Set()`.

### 5. Añadir dos libros, uno repetido
- Utilizamos `add()` para añadir elementos.
- Si añadimos un elemento que ya existe, no se duplica.
- Los Sets no permiten valores repetidos.

### 6. Eliminar un libro
- Utilizamos `delete()`.
- Indicamos el elemento que queremos eliminar.

Ejemplo:
```javascript
libros.delete("Drácula");
```

## MAPS

### 7. Crear un Map con los meses
- Un `Map` almacena información mediante pares de clave y valor.
- En este ejercicio, la clave es el número del mes y el valor es su nombre.

Ejemplo:
```javascript
let meses = new Map([
    [1, "Enero"],
    [2, "Febrero"]
]);
```

### 8. Comprobar si existe el mes número 5
Utilizamos dos métodos:
- `has()`: comprueba si existe una clave.
- `get()`: obtiene el valor asociado a esa clave.

### 9. Añadir los meses de verano
- Utilizamos `set()` para añadir una nueva clave y su valor.
- El valor puede ser un array.

Ejemplo:
```javascript
meses.set("Verano", ["Junio", "Julio", "Agosto"]);
```

### 10. Convertir un Array en Set y almacenarlo en un Map
Realizamos tres pasos:
1. Creamos un Array con números.
2. Lo transformamos en un Set utilizando `new Set(array)`.
3. Guardamos el Set dentro de un Map.

---

## Conceptos importantes

| Método / estructura | Función |
|---|---|
| `Array` | Almacena varios elementos ordenados. |
| `push()` | Añade un elemento al final. |
| `unshift()` | Añade un elemento al principio. |
| `splice()` | Añade, elimina o sustituye elementos. |
| `Set` | Almacena valores únicos, sin duplicados. |
| `add()` | Añade un elemento a un Set. |
| `delete()` | Elimina un elemento de un Set. |
| `Map` | Almacena pares de clave y valor. |
| `set()` | Añade o modifica una entrada de un Map. |
| `get()` | Obtiene el valor de una clave. |
| `has()` | Comprueba si existe una clave. |
| `new Set()` | Crea un Set o convierte una colección iterable en Set. |
| `new Map()` | Crea un Map. |

## Diferencias entre Array, Set y Map

| Estructura | Característica principal |
|---|---|
| Array | Permite elementos repetidos y utiliza posiciones. |
| Set | No permite elementos repetidos. |
| Map | Almacena información mediante claves y valores. |

**Conclusión:** Array, Set y Map son tres estructuras de datos de JavaScript. Cada una tiene una utilidad diferente: Array permite almacenar listas, Set evita duplicados y Map permite relacionar claves con valores.