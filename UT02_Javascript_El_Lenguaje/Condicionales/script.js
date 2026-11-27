
// ==========================================
// IF / ELSE / ELSE IF / OPERADOR TERNARIO
// ==========================================

// 1. Imprime tu nombre si una variable toma su valor

let nombre = "Carlos";

if (nombre === "Carlos") {
    console.log("Mi nombre es " + nombre);
}


// 2. Comprueba usuario y contraseña

let usuario = "admin";
let password = "1234";

if (usuario === "admin" && password === "1234") {
    console.log("Inicio de sesión correcto");
} else {
    console.log("Usuario o contraseña incorrectos");
}


// 3. Comprueba si un número es positivo, negativo o cero

let numero = -5;

if (numero > 0) {
    console.log("El número es positivo");
} else if (numero < 0) {
    console.log("El número es negativo");
} else {
    console.log("El número es cero");
}


// 4. Comprueba si una persona puede votar y cuántos años le faltan

let edad = 16;

if (edad >= 18) {
    console.log("Puedes votar");
} else {
    console.log("No puedes votar. Te faltan " + (18 - edad) + " años");
}


// 5. Operador ternario: adulto o menor

let edadPersona = 20;

let tipoPersona = edadPersona >= 18 ? "adulto" : "menor";

console.log("Eres " + tipoPersona);


// 6. Muestra la estación del año dependiendo del mes

let mes = 7;

if (mes === 12 || mes === 1 || mes === 2) {
    console.log("Estamos en invierno");
} else if (mes >= 3 && mes <= 5) {
    console.log("Estamos en primavera");
} else if (mes >= 6 && mes <= 8) {
    console.log("Estamos en verano");
} else if (mes >= 9 && mes <= 11) {
    console.log("Estamos en otoño");
} else {
    console.log("Mes no válido");
}


// 7. Muestra los días que tiene un mes

let mesDias = 2;

if (mesDias === 1 || mesDias === 3 || mesDias === 5 ||
    mesDias === 7 || mesDias === 8 || mesDias === 10 ||
    mesDias === 12) {

    console.log("Este mes tiene 31 días");

} else if (mesDias === 4 || mesDias === 6 ||
           mesDias === 9 || mesDias === 11) {

    console.log("Este mes tiene 30 días");

} else if (mesDias === 2) {

    console.log("Este mes tiene 28 o 29 días");

} else {
    console.log("Mes no válido");
}


// ==========================================
// SWITCH
// ==========================================

// 8. Saludo dependiendo del idioma

let idioma = "es";

switch (idioma) {
    case "es":
        console.log("Hola");
        break;

    case "en":
        console.log("Hello");
        break;

    case "fr":
        console.log("Bonjour");
        break;

    case "de":
        console.log("Hallo");
        break;

    default:
        console.log("Idioma no disponible");
}


// 9. Estación del año utilizando switch

let mesSwitch = 4;

switch (mesSwitch) {
    case 12:
    case 1:
    case 2:
        console.log("Estamos en invierno");
        break;

    case 3:
    case 4:
    case 5:
        console.log("Estamos en primavera");
        break;

    case 6:
    case 7:
    case 8:
        console.log("Estamos en verano");
        break;

    case 9:
    case 10:
    case 11:
        console.log("Estamos en otoño");
        break;

    default:
        console.log("Mes no válido");
}


// 10. Días de un mes utilizando switch

let mesSwitchDias = 10;

switch (mesSwitchDias) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("Este mes tiene 31 días");
        break;

    case 4:
    case 6:
    case 9:
    case 11:
        console.log("Este mes tiene 30 días");
        break;

    case 2:
        console.log("Este mes tiene 28 o 29 días");
        break;

    default:
        console.log("Mes no válido");
}
