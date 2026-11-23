// Crear un nuevo párrafo
const nuevoParrafo = document.createElement("p");

// Asignar texto
nuevoParrafo.textContent = "Este es un nuevo párrafo añadido con JavaScript.";

// Seleccionar el contenedor
const contenedor = document.querySelector("#contenedor-principal");

// Añadir el párrafo al final
contenedor.appendChild(nuevoParrafo);