// 8. Importa una función, una constante y una clase por defecto
import despedir from "./funcionDefault.js";
import IVA from "./constanteDefault.js";
import Coche from "./claseDefault.js";

console.log(despedir("Ana"));
console.log(`IVA: ${IVA * 100}%`);

const coche = new Coche("Toyota");
console.log(coche.mostrarMarca());
