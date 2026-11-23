const filas = document.getElementsByTagName("tr");

const arrayFilas = Array.from(filas);

const resultado = arrayFilas.filter(fila => {
    return fila.textContent.includes("Hola2");
});

console.log(resultado);

document.getElementById("resultado").innerHTML = resultado.map(fila => fila.outerHTML).join("");