
// ==========================================
// OBJETOS EN JAVASCRIPT
// ==========================================


// 1. Crea un objeto con 3 propiedades

let coche = {
    marca: "Toyota",
    modelo: "Corolla",
    color: "Rojo"
};


// 2. Accede y muestra sus valores

console.log("2. Marca:", coche.marca);
console.log("2. Modelo:", coche.modelo);
console.log("2. Color:", coche.color);


// 3. Agrega una nueva propiedad

coche.año = 2024;

console.log("3. Objeto con nueva propiedad:", coche);


// 4. Elimina una de las 3 primeras propiedades

delete coche.color;

console.log("4. Objeto después de eliminar color:", coche);


// 5. Agrega una función e invócala

coche.arrancar = function() {
    return "El coche " + this.marca + " está arrancando";
};

console.log("5. Función del objeto:", coche.arrancar());


// 6. Itera las propiedades del objeto

console.log("6. Propiedades del coche:");

for (let propiedad in coche) {
    console.log(propiedad + ": " + coche[propiedad]);
}


// ==========================================
// OBJETOS ANIDADOS
// ==========================================


// 7. Crea un objeto anidado

let usuario = {
    nombre: "Carlos",
    edad: 25,
    direccion: {
        calle: "Calle Mayor",
        ciudad: "Sevilla",
        codigoPostal: 41001
    }
};


// 8. Accede y muestra las propiedades anidadas

console.log("8. Nombre:", usuario.nombre);
console.log("8. Calle:", usuario.direccion.calle);
console.log("8. Ciudad:", usuario.direccion.ciudad);
console.log("8. Código postal:", usuario.direccion.codigoPostal);


// ==========================================
// COMPARACIÓN DE OBJETOS Y PROPIEDADES
// ==========================================


// 9. Comprueba si los dos objetos creados son iguales

console.log("9. ¿Coche y usuario son iguales?", coche === usuario);


// Dos objetos con las mismas propiedades y valores

let objeto1 = {
    nombre: "Carlos",
    edad: 25
};

let objeto2 = {
    nombre: "Carlos",
    edad: 25
};

console.log("9. ¿Objeto1 y objeto2 son iguales?", objeto1 === objeto2);


// 10. Comprueba si dos propiedades diferentes son iguales

console.log(
    "10. ¿El nombre y la ciudad son iguales?",
    usuario.nombre === usuario.direccion.ciudad
);

// Otra comparación de propiedades

console.log(
    "10. ¿La marca y el modelo son iguales?",
    coche.marca === coche.modelo
);