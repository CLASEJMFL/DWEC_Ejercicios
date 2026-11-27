// 3. Exporta una clase
export class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    presentarse() {
        return `Soy ${this.nombre} y tengo ${this.edad} años.`;
    }
}
