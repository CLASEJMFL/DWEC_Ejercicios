// ==========================================
// FUNCIONES EN JAVASCRIPT
// ==========================================


// 1. Función que recibe dos números y devuelve su suma

function sumar(a, b) {
    return a + b;
}

console.log("1. Suma:", sumar(5, 3));


// 2. Función que recibe un array y devuelve el número mayor

function numeroMayor(numeros) {
    return Math.max(...numeros);
}

console.log("2. Número mayor:", numeroMayor([4, 8, 2, 15, 6]));


// 3. Función que recibe un string y devuelve el número de vocales

function contarVocales(texto) {
    let contador = 0;
    let vocales = "aeiouáéíóú";

    for (let letra of texto.toLowerCase()) {
        if (vocales.includes(letra)) {
            contador++;
        }
    }

    return contador;
}

console.log("3. Número de vocales:", contarVocales("Hola Mundo"));


// 4. Función que recibe un array de strings
// y devuelve otro array con las palabras en mayúsculas

function convertirMayusculas(palabras) {
    return palabras.map(palabra => palabra.toUpperCase());
}

console.log(
    "4. Palabras en mayúsculas:",
    convertirMayusculas(["hola", "mundo", "javascript"])
);


// 5. Función que comprueba si un número es primo

function esPrimo(numero) {

    if (numero <= 1) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(numero); i++) {
        if (numero % i === 0) {
            return false;
        }
    }

    return true;
}

console.log("5. ¿Es primo?:", esPrimo(7));


// 6. Función que devuelve los elementos comunes entre dos arrays

function elementosComunes(array1, array2) {
    return array1.filter(elemento => array2.includes(elemento));
}

console.log(
    "6. Elementos comunes:",
    elementosComunes([1, 2, 3, 4], [3, 4, 5, 6])
);


// 7. Función que suma todos los números pares de un array

function sumarPares(numeros) {
    return numeros
        .filter(numero => numero % 2 === 0)
        .reduce((suma, numero) => suma + numero, 0);
}

console.log("7. Suma de números pares:", sumarPares([1, 2, 3, 4, 5, 6]));


// 8. Función que devuelve un array con los números elevados al cuadrado

function elevarCuadrado(numeros) {
    return numeros.map(numero => numero ** 2);
}

console.log(
    "8. Números al cuadrado:",
    elevarCuadrado([2, 3, 4, 5])
);


// 9. Función que devuelve una cadena con las palabras en orden inverso

function invertirPalabras(texto) {
    return texto.split(" ").reverse().join(" ");
}

console.log(
    "9. Palabras invertidas:",
    invertirPalabras("Hola mundo desde JavaScript")
);


// 10. Función que calcula el factorial de un número

function factorial(numero) {

    if (numero < 0 || !Number.isInteger(numero)) {
        return "El número debe ser un entero no negativo";
    }

    let resultado = 1;

    for (let i = 1; i <= numero; i++) {
        resultado *= i;
    }

    return resultado;
}

console.log("10. Factorial:", factorial(5));
