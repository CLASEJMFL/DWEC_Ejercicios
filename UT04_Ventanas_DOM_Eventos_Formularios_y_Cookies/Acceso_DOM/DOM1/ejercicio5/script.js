function agregarElemento() {
    // Crear un nuevo elemento li
    let nuevoElemento = document.createElement("li");

    // Asignar el texto
    nuevoElemento.textContent = "Nuevo elemento";

    // Añadirlo a la lista
    document.getElementById("list").appendChild(nuevoElemento);
}