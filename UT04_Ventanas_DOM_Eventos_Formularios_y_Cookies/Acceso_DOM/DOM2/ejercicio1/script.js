// 1. Capturamos los elementos del DOM usando su atributo 'id' (sin el símbolo #)
const botonConfirmar = document.getElementById("btn-confirmar");
const parrafoEstado = document.getElementById("titulo-principal");

// 2. Escuchamos el evento 'click' sobre el botón
botonConfirmar.addEventListener("click", () => {
    // 3. Modificamos el texto interno del párrafo con textContent
    parrafoEstado.textContent = "¡Hola Mundo desde el DOM!";
});