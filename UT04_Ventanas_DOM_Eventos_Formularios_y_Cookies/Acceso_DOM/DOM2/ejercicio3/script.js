// Seleccionamos los botones y la lista
const btnAgregar = document.querySelector("#btn-agregar");
const btnBorrar = document.querySelector("#btn-borrar");
const lista = document.querySelector("#mi-lista");

// 1. Evento para agregar un nuevo elemento
btnAgregar.addEventListener("click", () => {
    const textoUsuario = prompt("Escribe el texto para el nuevo elemento:");

    // Comprobamos que el usuario no haya cancelado el prompt ni lo haya dejado vacío
    if (textoUsuario !== null && textoUsuario.trim() !== "") {
        const nuevoLi = document.createElement("li");
        nuevoLi.textContent = textoUsuario;
        lista.appendChild(nuevoLi);
    }
});

// 2. Evento para borrar el último elemento
btnBorrar.addEventListener("click", () => {
    const ultimoElemento = lista.lastElementChild;

    // Comprobamos si existe antes de intentar borrarlo
    if (ultimoElemento) {
        ultimoElemento.remove();
    }
});