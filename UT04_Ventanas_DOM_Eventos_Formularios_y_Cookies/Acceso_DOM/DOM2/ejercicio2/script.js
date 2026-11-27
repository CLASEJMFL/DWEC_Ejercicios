// 1. Seleccionamos el input y el párrafo por su clase
const input = document.querySelector("input");
const parrafoDestino = document.querySelector(".parrafo-destino");

// 2. Añadimos el evento 'input' para detectar cada cambio en tiempo real
input.addEventListener("input", () => {
  // Actualizamos el texto del párrafo con el valor actual del input
  parrafoDestino.textContent = input.value;
});