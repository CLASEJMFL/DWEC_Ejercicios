// 1. Concatena dos cadenas de texto
const cadena1 = "Hola como estas";
const cadena2 = "Juancho";

const cadena3 = `${cadena1} ${cadena2}.`;

console.log(cadena3);
// 2. Muestra la longitud de una cadena de texto
const tamanoImporta = "HOLA COMO ESTAS JUANCHO QUE TAL EL DIA";

console.log(tamanoImporta.length);
// 3. Muestra el primer y último carácter de un string
const firstJuanandLastJuan = "HOLA COMO ESTAS JUANCHO QUE TAL EL DIA";

console.log(firstJuanandLastJuan[0]);
console.log(firstJuanandLastJuan.at(-1));
// 4. Convierte a mayúsculas y minúsculas un string
const convierteMayusMinus = "// 4. Convierte a mayúsculas y minúsculas un string"

console.log(convierteMayusMinus.toLocaleUpperCase());
console.log(convierteMayusMinus.toLocaleLowerCase());
// 5. Crea una cadena de texto en varias líneas
const textoClasico = "Primera línea.\nSegunda línea.\nTercera línea.";

console.log(textoClasico);
// 6. Interpola el valor de una variable en un string.
const interpolameEsta = "Hola";

console.log(`${interpolameEsta} como estas`);
// 7. Reemplaza todos los espacios en blanco de un string por guiones
let texto = "// 7. Reemplaza todos los espacios en blanco de un string por guiones";
const resultado = texto.replaceAll(" ", "_");

console.log(resultado); 
// 8. Comprueba si una cadena de texto contiene una palabra concreta
texto = "Hola, me gusta programar en JavaScript";
let palabra = "JavaScript";

if (texto.includes(palabra)) {
    console.log("La palabra está contenida en el texto");
} else {
    console.log("La palabra no está contenida en el texto");
}
// 9. Comprueba si dos strings son iguales
let texto1 = "Hola";
let texto2 = "Hola";

if (texto1 === texto2) {
    console.log("Los strings son iguales");
} else {
    console.log("Los strings son diferentes");
}
// 10. Comprueba si dos strings tienen la misma longitud
texto1 = "Hola";
texto2 = "Adiós";

if (texto1.length === texto2.length) {
    console.log("Los strings tienen la misma longitud");
} else {
    console.log("Los strings tienen diferente longitud");
}