# Resumen: Eventos en JavaScript (DWEC) — Teoría y Ejemplos Prácticos

Guía de estudio completa con ejemplos de código basada en el material de **Desarrollo Web en Entorno Cliente (DWEC)** de Antonio Bueno Guisado.

## Bloque 1: Introducción a los Eventos

Un evento representa una interacción del usuario (clic, tecla, envío de formulario) o del propio navegador (carga de página, redimensionamiento).

### Ciclo de Vida de la Interacción

1. **Acción del Usuario:** Interacción física o del sistema.

2. **Generación del Paquete:** El navegador captura la acción y crea un objeto especial de tipo `Event` con todos los metadatos.

3. **Intercepción (Listener):** Un escuchador (`EventListener`) atrapa el evento durante las fases de captura o burbujeo.

4. **Ejecución del Callback:** Se ejecuta la función de respuesta asociada, modificando el DOM o los estilos de forma dinámica sin recargar la página.

### Clasificación General

* **Ratón:** `click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup`.

* **Teclado:** `keydown` (presionar), `keyup` (soltar). Se identifica la tecla mediante `e.key`.

* **Formulario / Ventana:** `submit`, `reset`, `change`, `input`, `load`, `resize`, `scroll`.

### Ejemplo: El objeto implícito `event` en manipuladores tradicionales

```
<!-- event_inline.html -->
<button onclick="saludar(event)">Pulsar Aquí</button>

<script>
function saludar(e) {
    // 'e' contiene el objeto de evento
    console.log("Tipo de evento: " + e.type);           // "click"
    console.log("Elemento pulsado: " + e.target.tagName); // "BUTTON"
    alert("¡Evento capturado con éxito!");
}
</script>

```

## Bloque 2: Evolución Histórica de Asignación

### Método 1: Atributos Inline HTML (No Recomendado)

Mezcla estructura (HTML) con comportamiento (JS), dificulta el mantenimiento y puede dar errores si la función aún no se ha cargado.

```
<!-- metodo1_inline.html -->
<input type="text" id="nombre" onblur="convertirMayusculas(this)">

<script>
function convertirMayusculas(campo) {
    // 'this' hace referencia directa al elemento <input>
    campo.value = campo.value.toUpperCase();
    console.log("Texto convertido a mayúsculas");
}
</script>

```

### Método 2: Propiedad del Objeto DOM (`.onclick`)

Separa HTML de JS, pero tiene una **grave limitación**: solo permite asignar **una única función** por evento (si asignamos una segunda, borra y sobrescribe la primera).

```
// limite_onclick.js
const boton = document.querySelector("#miBoton");

// Primer manejador
boton.onclick = function () {
    console.log("Primer manejador ejecutado.");
};

// Segundo manejador: ¡BORRA Y SOBREESCRIBE AL PRIMERO!
boton.onclick = function () {
    console.log("Segundo manejador. ¡El primero ya no existe!");
};

```

### Método 3: Estándar W3C `addEventListener()` (Recomendado)

Separación limpia, permite **múltiples escuchadores** simultáneos sobre el mismo elemento, control de fases (captura/burbujeo) y facilidad para eliminar eventos.

## Bloque 3: Anatomía y Métodos W3C

### Sintaxis de `addEventListener()`

```
elemento.addEventListener('tipoEvento', funcionCallback, useCapture);

```

* **Elemento Objetivo:** Nodo capturado del DOM (`querySelector`, `getElementById`).

* **Tipo de Evento:** String con el nombre del evento **sin el prefijo `on`** (ej. `'click'`, `'keyup'`).

* **Callback:** Función anónima/flecha (para bloques breves de un solo uso) o **función nombrada** (recomendada para reutilizar código y **obligatoria** si queremos eliminar el evento).

* **useCapture (opcional):** Booleano (`false` por defecto para burbujeo, `true` para captura).

### Ejemplo: Funciones Anónimas vs. Nombradas y Múltiples Escuchadores

```
// callbacks_y_multiples.js
const btn = document.querySelector("#btnGuardar");

// Opción A: Función Anónima (flecha)
btn.addEventListener("click", () => {
    console.log("Clic con función anónima");
});

// Opción B: Funciones Nombradas (Recomendadas y acumulables)
function guardarDatos() {
    console.log("1. Guardando datos en el servidor...");
}

function mostrarNotificacion() {
    alert("2. ¡Petición enviada con éxito!");
}

// Ambos escuchadores se ejecutarán ordenadamente
btn.addEventListener("click", guardarDatos);
btn.addEventListener("click", mostrarNotificacion);

```

### Desasignación de Eventos: `removeEventListener()`

Optimiza memoria y permite desactivar botones tras ejecutarse una vez. **Regla de oro:** solo funciona con funciones nombradas y los 3 parámetros deben coincidir exactamente.

```
// una_sola_vez.js
const btnOferta = document.querySelector("#btnCanjear");

function reclamarPremio() {
    alert("¡Has reclamado tu premio!");
    console.log("Desactivando escuchador de evento...");
    
    // Eliminar el escuchador para evitar nuevos clics
    btnOferta.removeEventListener("click", reclamarPremio);
}

// Registrar escuchador
btnOferta.addEventListener("click", reclamarPremio);

```

## Bloque 4: Propagación y Flujo W3C

Cuando hay elementos HTML anidados (ej. un `<button>` dentro de un `<div>`), el evento viaja por el árbol DOM siguiendo el **Modelo Unificado W3C de 3 Fases**:

1. **Fase 1 - Captura (Capturing):** El evento desciende desde `window` hasta el padre del elemento objetivo (de fuera hacia dentro). Ejecuta listeners con `true`.

2. **Fase 2 - Objetivo (Target):** El evento alcanza el elemento exacto sobre el que se interactuó.

3. **Fase 3 - Burbujeo (Bubbling):** El evento asciende de regreso hacia `window` pasando por todos los ancestros (de dentro hacia fuera). Ejecuta listeners con `false` (por defecto).

### Ejemplo: Control del parámetro `useCapture`

```
// fases_evento.js
const padre = document.querySelector("#padre");
const hijo = document.querySelector("#hijo");

// Captura (tercer parámetro true: se ejecuta primero al bajar)
padre.addEventListener("click", () => {
    console.log("1. Padre (Fase Captura)");
}, true);

// Burbujeo (tercer parámetro false por defecto: se ejecuta después)
hijo.addEventListener("click", () => {
    console.log("2. Hijo (Fase Target/Burbujeo)");
}, false);

```

### Ejemplo: Detener la propagación con `e.stopPropagation()`

Evita que el evento siga subiendo hacia los padres (muy útil en modales o botones dentro de tarjetas cliqueables).

```
// stop_propagation.js
const btnHijo = document.querySelector("#btnGuardar");
const contenedor = document.querySelector("#contenedor");

btnHijo.addEventListener("click", (e) => {
    console.log("Clic en el botón interno.");
    // ¡Detener la subida del evento hacia los padres!
    e.stopPropagation();
});

contenedor.addEventListener("click", () => {
    console.log("Este mensaje NO se mostrará gracias a stopPropagation()");
});

```

## Bloque 5: El Objeto `event` y sus Propiedades

El navegador pasa automáticamente el objeto `event` (`e`) como primer argumento al callback:

* **`e.target`:** El elemento **exacto** sobre el que el usuario hizo la acción física (ej. un `<span>` dentro de un `<button>`).

* **`e.currentTarget` (o `this`):** El elemento HTML que tiene asignado el `addEventListener` (no cambia durante el burbujeo).

* **`e.type`:** String con el nombre del evento (`'click'`, `'keydown'`, `'submit'`).

### Ejemplo: Inspección de `e.target` y `e.type`

```
// inspeccion_target.js
const contenedor = document.querySelector("#menu");

contenedor.addEventListener("click", (e) => {
    console.log("Tipo de evento: " + e.type);                 // "click"
    console.log("Elemento exacto pulsado: " + e.target.tagName);
    console.log("ID del elemento: " + e.target.id);

    // Cambiar color dinámicamente al elemento pulsado
    e.target.style.color = "#0ea5e9";
});

```

### Ejemplo: Cancelar la acción por defecto con `e.preventDefault()`

```
// prevent_default.js
const enlace = document.querySelector("#miEnlace");

enlace.addEventListener("click", (e) => {
    // 1. Cancelar la navegación automática a la URL
    e.preventDefault();

    console.log("Navegación detenida.");
    alert("Irás a la web solo tras confirmar en este diálogo.");
    window.location.href = enlace.href;
});

```

| Método / Sentencia | Efecto Principal | ¿Detiene el burbujeo? | Uso Recomendado | 
| ----- | ----- | ----- | ----- | 
| `e.preventDefault()` | Cancela la acción nativa del navegador | No | Validación de formularios y enlaces | 
| `e.stopPropagation()` | Detiene el viaje del evento por el DOM | Sí | Evitar clics en contenedores padres | 
| `return false;` | Cancela acción en handlers antiguos | Solo en inline/tradicional | Desaconsejado en código W3C moderno | 

## Bloque 6: Eventos de Ratón y Coordenadas

* **`mouseenter` / `mouseleave` vs `mouseover` / `mouseout`:** `mouseenter` y `mouseleave` **no burbujean** (ignoran elementos hijos internos), por lo que evitan parpadeos en menús y tarjetas.

* **Coordenadas:** `e.clientX/Y` (respecto al *viewport*), `e.screenX/Y` (respecto al monitor físico), `e.pageX/Y` (respecto al documento completo con scroll).

### Ejemplo 1: Detección del botón de ratón (`e.button`)

```
// detectar_boton.js
const caja = document.querySelector("#areaClic");

caja.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
        console.log("Clic con el Botón IZQUIERDO (principal)");
    } else if (e.button === 1) {
        console.log("Clic con la RUEDA / Botón Central");
    } else if (e.button === 2) {
        console.log("Clic con el Botón DERECHO (menú contextual)");
    }
});

```

### Ejemplo 2: Rastreador de coordenadas en tiempo real (`mousemove`)

```
// rastreador_coordenadas.js
const info = document.querySelector("#infoCoordenadas");

window.addEventListener("mousemove", (e) => {
    let posX = e.clientX;
    let posY = e.clientY;

    info.textContent = `Puntero en X: ${posX}px | Y: ${posY}px`;
});

```

## Bloque 7: Eventos de Teclado y Formulario

* **Teclado:** `keydown` (al presionar, se repite si se mantiene), `keyup` (al soltar, una sola vez). *(Nota: `keypress` está depreciado)*.

* **Foco:** `focus` / `focusin` (recibe foco; `focusin` sí burbujea) y `blur` / `focusout` (pierde foco; ideal para validar al salir del input).

* **Modificación:** `change` (cambia valor y pierde el foco; ideal para `<select>`, checkboxes y radios) e `input` (inmediato en cada pulsación).

### Ejemplo 1: Atajos de teclado con `keydown` y modificadores

```
// atajos_teclado.js
window.addEventListener("keydown", (e) => {
    console.log("Tecla pulsada: " + e.key);

    // Detectar atajo Ctrl + S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
        e.preventDefault(); // Prevenir el guardado por defecto del navegador
        console.log("¡Atajo Ctrl + S capturado! Guardando borrador...");
    }
});

```

### Ejemplo 2: Intercepción y validación en el evento `submit`

```
// validar_submit.js
const form = document.querySelector("#formRegistro");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // 1. Detener envío automático

    const email = document.querySelector("#txtEmail").value.trim();

    if (email === "") {
        alert("El campo de correo no puede estar vacío.");
    } else {
        console.log("Formulario válido. Enviando datos para: " + email);
        // form.submit(); // Envío manual si fuera necesario
    }
});

```

## Bloque 8: Proyectos Prácticos y Patrones Avanzados

### Ejemplo 1: Contador de caracteres en tiempo real (`input`)

```
// contador_caracteres.js
const inputMsg = document.querySelector("#txtMensaje");
const contador = document.querySelector("#lblContador");
const MAX_CHARS = 100;

inputMsg.addEventListener("input", () => {
    let longitud = inputMsg.value.length;
    let restantes = MAX_CHARS - longitud;

    contador.textContent = `${restantes} caracteres restantes`;
    contador.style.color = restantes < 10 ? "red" : "black";
});

```

### Ejemplo 2: Menú desplegable acordeón interactivo

```
// menu_acordeon.js
function toggleSubmenu(elementoLi) {
    const subMenu = elementoLi.querySelector("ul");
    if (!subMenu) return;

    if (subMenu.style.display === "none" || subMenu.style.display === "") {
        subMenu.style.display = "block";
    } else {
        subMenu.style.display = "none";
    }
}

document.querySelectorAll(".opcion-menu").forEach(li => {
    li.addEventListener("click", (e) => {
        e.stopPropagation(); // Evitar propagación a padres
        toggleSubmenu(li);
    });
});

```

### Ejemplo 3: Delegación de Eventos (*Event Delegation*)

Patrón avanzado que asigna **un único escuchador al elemento padre** en lugar de a cada hijo. Ahorra memoria y funciona incluso para elementos creados dinámicamente en el futuro.

```
// delegacion_eventos.js
const listaTareas = document.querySelector("#listaTareas");

// Un solo escuchador en la lista <ul> padre
listaTareas.addEventListener("click", (e) => {
    // Verificar si el clic fue en un botón con clase .btn-borrar
    if (e.target.matches(".btn-borrar")) {
        const liPadre = e.target.parentElement;
        liPadre.remove();
        console.log("Elemento eliminado de la lista.");
    }
});

```

### Decálogo de Buenas Prácticas

1. **Separación de código:** Usar siempre `addEventListener()` y mantener el HTML libre de atributos *inline*.

2. **Nombres claros y modulares:** Usar funciones nombradas para callbacks complejos o que requieran desasignación.

3. **Optimización de memoria:** Usar Delegación de Eventos en listas largas o dinámicas.

4. **Control del comportamiento:** Usar `e.preventDefault()` solo cuando sea necesario y detener propagaciones con `e.stopPropagation()`.