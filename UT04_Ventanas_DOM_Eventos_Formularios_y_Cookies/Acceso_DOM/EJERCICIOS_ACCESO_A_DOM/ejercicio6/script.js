const enlace = document.querySelector("#mi-enlace");

// Leer el atributo href
const direccionActual = enlace.getAttribute("href");

console.log("URL actual:", direccionActual);

// Actualizar el atributo href
enlace.setAttribute("href", "https://www.wikipedia.org");