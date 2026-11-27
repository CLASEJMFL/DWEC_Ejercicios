// ==========================================
// EXCEPCIONES EN JAVASCRIPT
// ==========================================


// 1. Captura una excepción utilizando try-catch

try {
    let resultado = variableInexistente;
    console.log(resultado);

} catch (error) {
    console.log("1. Se ha producido un error:", error.message);
}


// 2. Captura una excepción utilizando try-catch y finally

try {
    let numero = 10;
    let resultado = numero / 0;

    console.log("2. Resultado:", resultado);

    throw new Error("Error de prueba");

} catch (error) {
    console.log("2. Error capturado:", error.message);

} finally {
    console.log("2. El bloque finally siempre se ejecuta");
}


// 3. Lanza una excepción genérica

try {
    throw new Error("Este es un error genérico");

} catch (error) {
    console.log("3. Excepción genérica:", error.message);
}


// 4. Crea una excepción personalizada

class MiError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "MiError";
    }
}


// 5. Lanza una excepción personalizada

try {
    throw new MiError("Este es un error personalizado");

} catch (error) {
    console.log("5. Nombre del error:", error.name);
    console.log("5. Mensaje:", error.message);
}


// 6. Lanza varias excepciones según una lógica definida

function comprobarEdad(edad) {

    if (typeof edad !== "number") {
        throw new TypeError("La edad debe ser un número");
    }

    if (edad < 0) {
        throw new RangeError("La edad no puede ser negativa");
    }

    if (edad < 18) {
        throw new Error("Eres menor de edad");
    }

    return "Eres mayor de edad";
}

try {
    console.log("6.", comprobarEdad(15));

} catch (error) {
    console.log("6. Error:", error.name, "-", error.message);
}


// ==========================================
// CAPTURAR VARIAS EXCEPCIONES
// ==========================================


// 7. Captura varias excepciones en un mismo try-catch

try {
    let numero = "hola";

    if (typeof numero !== "number") {
        throw new TypeError("El valor no es un número");
    }

    if (numero < 0) {
        throw new RangeError("El número es negativo");
    }

    console.log("7. Número correcto:", numero);

} catch (error) {

    if (error instanceof TypeError) {
        console.log("7. Error de tipo:", error.message);

    } else if (error instanceof RangeError) {
        console.log("7. Error de rango:", error.message);

    } else {
        console.log("7. Otro error:", error.message);
    }
}


// ==========================================
// CONVERSIÓN A FLOAT
// ==========================================


// 8. Bucle que transforma valores a float
// y captura los errores

let valores = ["10.5", "20.8", "hola", "30.2", "texto", "40"];

for (let valor of valores) {

    try {
        let numero = parseFloat(valor);

        if (Number.isNaN(numero)) {
            throw new Error("No se puede convertir a número: " + valor);
        }

        console.log("8. Número convertido:", numero);

    } catch (error) {
        console.log("8. Error:", error.message);
    }
}


// ==========================================
// EXCEPCIONES PERSONALIZADAS Y OBJETOS
// ==========================================


// 9. Función que comprueba si un objeto tiene
// una propiedad específica y lanza una excepción personalizada

class PropiedadNoEncontradaError extends Error {
    constructor(propiedad) {
        super("La propiedad '" + propiedad + "' no existe en el objeto");
        this.name = "PropiedadNoEncontradaError";
    }
}

function comprobarPropiedad(objeto, propiedad) {

    if (!Object.hasOwn(objeto, propiedad)) {
        throw new PropiedadNoEncontradaError(propiedad);
    }

    return "La propiedad '" + propiedad + "' existe";
}

let persona = {
    nombre: "Carlos",
    edad: 25
};

try {
    console.log("9.", comprobarPropiedad(persona, "nombre"));

    console.log("9.", comprobarPropiedad(persona, "apellido"));

} catch (error) {
    console.log("9. Error:", error.name, "-", error.message);
}


// ==========================================
// REINTENTOS
// ==========================================


// 10. Función que realiza reintentos en caso de error
// hasta un máximo de 10

function realizarReintentos(funcion, maxIntentos = 10) {

    for (let intento = 1; intento <= maxIntentos; intento++) {

        try {
            console.log("10. Intento número:", intento);

            let resultado = funcion();

            console.log("10. Operación realizada correctamente");

            return resultado;

        } catch (error) {
            console.log("10. Error en el intento:", error.message);
        }
    }

    throw new Error("Se han agotado los 10 intentos");
}


// Probamos la función de reintentos

let contador = 0;

try {
    let resultado = realizarReintentos(() => {

        contador++;

        if (contador < 3) {
            throw new Error("La operación ha fallado");
        }

        return "Operación completada";

    });

    console.log("10. Resultado final:", resultado);

} catch (error) {
    console.log("10. Error final:", error.message);
}

