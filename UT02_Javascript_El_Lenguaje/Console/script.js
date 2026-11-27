
// ==========================================
// MÉTODOS DE CONSOLE EN JAVASCRIPT
// ==========================================


// 1. Crea una función que utilice error correctamente

function mostrarError() {
    console.error("1. ERROR: Ha ocurrido un problema");
}

mostrarError();


// 2. Crea una función que utilice warn correctamente

function mostrarAdvertencia() {
    console.warn("2. ADVERTENCIA: Debes revisar este dato");
}

mostrarAdvertencia();


// 3. Crea una función que utilice info correctamente

function mostrarInformacion() {
    console.info("3. INFORMACIÓN: El programa se está ejecutando correctamente");
}

mostrarInformacion();


// 4. Utiliza table

let personas = [
    { nombre: "Carlos", edad: 25, ciudad: "Sevilla" },
    { nombre: "Ana", edad: 20, ciudad: "Madrid" },
    { nombre: "Pedro", edad: 30, ciudad: "Barcelona" }
];

console.log("4. Tabla de personas:");
console.table(personas);


// 5. Utiliza group

console.group("5. Información de una persona");

console.log("Nombre: Carlos");
console.log("Edad: 25");
console.log("Ciudad: Sevilla");

console.groupEnd();


// 6. Utiliza time

console.time("6. Tiempo de ejecución");

for (let i = 0; i < 1000000; i++) {
    // Simulamos una operación
}

console.timeEnd("6. Tiempo de ejecución");


// 7. Valida con assert si un número es positivo

function comprobarPositivo(numero) {
    console.assert(
        numero > 0,
        "7. ERROR: El número no es positivo"
    );
}

comprobarPositivo(5);
comprobarPositivo(-3);


// 8. Utiliza count

function contarLlamadas() {
    console.count("8. Número de llamadas");
}

contarLlamadas();
contarLlamadas();
contarLlamadas();


// 9. Utiliza trace

function funcionPrincipal() {
    console.log("9. Estamos en la función principal");
    funcionSecundaria();
}

function funcionSecundaria() {
    console.log("9. Estamos en la función secundaria");
    console.trace("9. Seguimiento de la ejecución");
}

funcionPrincipal();


// 10. Utiliza clear

console.log("10. Este mensaje aparecerá antes de limpiar la consola");

// Limpia la consola
console.clear();

console.log("10. Consola limpia. El programa continúa ejecutándose.");

