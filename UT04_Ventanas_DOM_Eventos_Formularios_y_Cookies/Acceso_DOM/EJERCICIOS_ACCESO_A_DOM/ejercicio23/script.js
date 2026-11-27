// 1. Capturamos todos los botones y paneles (NodeList estática)
const botones = document.querySelectorAll('.acordeon-btn');
const paneles = document.querySelectorAll('.acordeon-panel');

// 2. Iteramos sobre cada botón para asignarle su evento de clic
botones.forEach((boton) => {
    boton.addEventListener('click', () => {
        // Localizamos el panel asociado (hermano elemento siguiente)
        const panelActual = boton.nextElementSibling;
        const estabaAbierto = panelActual.classList.contains('activo');

        // 3. Cerramos TODOS los paneles y desactivamos todos los botones
        paneles.forEach((panel) => panel.classList.remove('activo'));
        botones.forEach((btn) => btn.classList.remove('activo'));

        // 4. Si el panel pulsado no estaba abierto previamente, lo abrimos
        if (!estabaAbierto) {
            panelActual.classList.add('activo');
            boton.classList.add('activo');
        }
    });
});