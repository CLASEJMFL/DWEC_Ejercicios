// Seleccionamos la caja y el botón
const caja = document.querySelector(".caja");
const btnAlternar = document.querySelector("#btn-alternar");

// Añadimos el evento de clic al botón
btnAlternar.addEventListener("click", () => {
    // Añade la clase .destacado si no la tiene, o la quita si ya la tiene
    caja.classList.toggle("destacado");
});