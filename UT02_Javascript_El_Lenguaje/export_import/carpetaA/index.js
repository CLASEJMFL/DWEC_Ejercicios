// 9. Exporta una función, una constante y una clase desde una carpeta
export function sumar(a, b) {
    return a + b;
}

export const MENSAJE = "Contenido exportado desde carpetaA";

export class Animal {
    constructor(nombre) {
        this.nombre = nombre;
    }

    hacerSonido() {
        return `${this.nombre} hace un sonido.`;
    }
}
