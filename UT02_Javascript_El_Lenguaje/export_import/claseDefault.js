// Exportación por defecto de una clase
export default class Coche {
    constructor(marca) {
        this.marca = marca;
    }

    mostrarMarca() {
        return `Marca: ${this.marca}`;
    }
}
