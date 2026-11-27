// 1. Seleccionar el input y todos los elementos <li> de la lista
const buscador = document.getElementById("buscador");
const productos = document.querySelectorAll("#lista-productos li");

// 2. Escuchar cada vez que el usuario escribe o borra en el input
buscador.addEventListener("input", function() {
    // Convertimos lo escrito a minúsculas para que no importen mayúsculas/minúsculas
    const textoBuscado = buscador.value.toLowerCase();

    // 3. Recorrer los 20 productos uno por uno
    productos.forEach(function(producto) {
        const nombreProducto = producto.textContent.toLowerCase();

        // 4. Comprobar si el texto del producto contiene lo que busca el usuario
        if (nombreProducto.includes(textoBuscado)) {
            producto.style.display = ""; // Muestra el elemento (restaura su display original)
        } else {
            producto.style.display = "none"; // Oculta el elemento
        }
    });
});