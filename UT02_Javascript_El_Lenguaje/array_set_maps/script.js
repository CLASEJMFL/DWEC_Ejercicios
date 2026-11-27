
// ==========================================
// ARRAYS
// ==========================================

// 1. Crea un array que almacene cinco animales

let animales = ["Perro", "Gato", "León", "Tigre", "Elefante"];

console.log("Array inicial:", animales);


// 2. Añade dos más. Uno al principio y otro al final

animales.unshift("Caballo"); // Añade al principio
animales.push("Conejo");     // Añade al final

console.log("Array con dos animales más:", animales);


// 3. Elimina el que se encuentra en tercera posición

animales.splice(2, 1);

console.log("Array después de eliminar el tercer animal:", animales);


// ==========================================
// SET
// ==========================================

// 4. Crea un set que almacene cinco libros

let libros = new Set([
    "Don Quijote",
    "El Principito",
    "1984",
    "La Odisea",
    "Drácula"
]);

console.log("Set inicial:", libros);


// 5. Añade dos más. Uno de ellos repetido

libros.add("Cien años de soledad");
libros.add("1984"); // Repetido, no se añade porque ya existe

console.log("Set con nuevos libros:", libros);


// 6. Elimina uno concreto a tu elección

libros.delete("Drácula");

console.log("Set después de eliminar un libro:", libros);


// ==========================================
// MAP
// ==========================================

// 7. Crea un mapa que asocie el número del mes a su nombre

let meses = new Map([
    [1, "Enero"],
    [2, "Febrero"],
    [3, "Marzo"],
    [4, "Abril"],
    [5, "Mayo"],
    [6, "Junio"],
    [7, "Julio"],
    [8, "Agosto"],
    [9, "Septiembre"],
    [10, "Octubre"],
    [11, "Noviembre"],
    [12, "Diciembre"]
]);

console.log("Map de los meses:", meses);


// 8. Comprueba si el mes número 5 existe en el map
// e imprime su valor

if (meses.has(5)) {
    console.log("El mes número 5 es:", meses.get(5));
} else {
    console.log("El mes número 5 no existe");
}


// 9. Añade al mapa una clave con un array
// que almacene los meses de verano

meses.set("Verano", ["Junio", "Julio", "Agosto"]);

console.log("Map con los meses de verano:", meses);


// ==========================================
// CONVERSIÓN ARRAY -> SET -> MAP
// ==========================================

// 10. Crea un Array, transfórmalo a un Set
// y almacénalo en un Map

let numeros = [1, 2, 3, 4, 5, 2, 3];

let conjuntoNumeros = new Set(numeros);

let mapaNumeros = new Map([
    ["numeros", conjuntoNumeros]
]);

console.log("Array original:", numeros);
console.log("Set sin repetidos:", conjuntoNumeros);
console.log("Map con el Set:", mapaNumeros);
