// 10. Importa una función, una constante y una clase desde otro directorio
import { sumar, MENSAJE, Animal } from "../carpetaA/index.js";

console.log(sumar(5, 3));
console.log(MENSAJE);

const animal = new Animal("León");
console.log(animal.hacerSonido());
