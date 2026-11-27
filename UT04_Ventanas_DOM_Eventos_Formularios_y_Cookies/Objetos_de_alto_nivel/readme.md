# Resumen: Objetos de Alto Nivel, Eventos y Validaciones en JavaScript (DWEC) — Teoría y Código

Guía de estudio completa con ejemplos de código basada en el material de **Desarrollo Web en Entorno Cliente (DWEC)** de Antonio Bueno Guisado.

## Bloque 1: Objetos de Alto Nivel (BOM vs. DOM)

JavaScript interactúa con el navegador mediante dos modelos de objetos principales:

* **BOM (Browser Object Model):** Representa la ventana del navegador y su entorno externo (`window`, `location`, `history`, `navigator`, `screen`).

* **DOM (Document Object Model):** Representa el contenido HTML cargado en la pestaña como un árbol jerárquico de nodos. Cuelga directamente de `window.document`.

### 1. El Objeto Global `window`

Es el contenedor raíz de cualquier script en el navegador. Sus métodos y propiedades tienen **acceso implícito** (no es obligatorio escribir `window.` antes de llamarlos, ej. `alert()`).

* **Propiedades de dimensión y scroll:** `innerWidth`, `innerHeight` (*viewport*), `outerWidth`, `outerHeight` (ventana completa), `scrollX`, `scrollY`.

* **Métodos de diálogo modal:** `alert(msg)`, `confirm(msg)` (devuelve `true`/`false`), `prompt(msg, defecto)` (devuelve `string` o `null`), `open(URL, nombre, caracteristicas)`.

#### Ejemplo: Saludo personalizado con `prompt()`, `confirm()` y `alert()`

```
// saludo_interactivo.js
// 1. Pedir el nombre al usuario
let nombre = prompt("¿Cómo te llamas?", "Estudiante");

// 2. Verificar que introdujo un dato
if (nombre !== null && nombre !== "") {
    // 3. Pedir confirmación
    let continuar = confirm(`¿Quieres entrar, ${nombre}?`);

    if (continuar) {
        alert(`¡Hola ${nombre}! Bienvenido a DWEC.`);
    } else {
        alert("Has cancelado el acceso.");
    }
} else {
    alert("No has introducido ningún nombre.");
}

```

### 2. El Objeto `location` (Control de la URL)

Permite leer las partes de la URL (`href`, `protocol`, `hostname`, `port`, `pathname`, `search`, `hash`) o modificarla para redirigir al usuario.

#### Ejemplo: Redirección y recarga de página

```
// redireccion_ejemplo.js
function irAWeb() {
    console.log("URL actual: " + location.href);
    console.log("Dominio: " + location.hostname);

    // Redirigir la ventana a otra dirección web (guarda historial)
    location.href = "https://ejemplo.org";
    // Nota: location.replace("https://ejemplo.org") redirige SIN dejar rastro en el historial
}

function refrescarPagina() {
    // Recarga equivalente a pulsar F5
    location.reload();
}

```

### 3. El Objeto `history` (Historial de Navegación)

Permite simular los botones *Atrás* y *Adelante* del navegador mediante `history.length`, `history.back()`, `history.forward()` y `history.go(n)`.

#### Ejemplo: Botones personalizados de historial

```
// control_historial.js
function volverAtras() {
    if (history.length > 1) {
        history.back(); // Equivale a history.go(-1)
    } else {
        alert("No hay páginas anteriores en el historial.");
    }
}

function irAdelante() {
    history.forward(); // Equivale a history.go(1)
}

```

### 4. El Objeto `document`

Es la interfaz (API) que permite acceder, crear y manipular todos los nodos HTML de la página (ej. `document.querySelector()`, `document.getElementsByTagName('H1')[0]`).

## Bloque 2: Eventos en el DOM

Un evento es una acción del usuario o del navegador que JavaScript detecta para ejecutar una respuesta dinámica (`callback`) sin recargar la página.

### Formas de Asociar Eventos

1. **Atributos HTML inline** (`<button onclick="saludar()">`): Desaconsejado; mezcla HTML con lógica JS.

2. **Propiedad del elemento** (`boton.onclick = fn`): Separa HTML y JS, pero **sobrescribe** si se asigna una segunda función.

3. **Estándar W3C `addEventListener()` (Recomendado):** Permite separación total y acumular **múltiples escuchadores** simultáneos.

#### Ejemplo 1: `addEventListener()` con múltiples escuchadores

```
// add_event_listener.js
const boton = document.querySelector("#btnGuardar");

function mostrarAviso() {
    console.log("Guardando datos...");
}

// Escuchador 1 (función nombrada)
boton.addEventListener("click", mostrarAviso);

// Escuchador 2 (función flecha - ¡Ambos se ejecutan!)
boton.addEventListener("click", () => {
    alert("¡Datos guardados con éxito!");
});

```

#### Ejemplo 2: Efecto Hover con ratón (`mouseenter` y `mouseleave`)

```
// efecto_hover.js
const caja = document.querySelector("#cajaInteractiva");

// Al entrar el ratón -> fondo azul
caja.addEventListener("mouseenter", () => {
    caja.style.backgroundColor = "#0ea5e9";
    caja.style.color = "#ffffff";
});

// Al salir el ratón -> fondo gris
caja.addEventListener("mouseleave", () => {
    caja.style.backgroundColor = "#e2e8f0";
    caja.style.color = "#0f172a";
});

```

#### Ejemplo 3: Contador de caracteres en tiempo real con `keyup`

```
// contador_tiempo_real.js
const inputTexto = document.querySelector("#mensaje");
const contador = document.querySelector("#numCaracteres");

inputTexto.addEventListener("keyup", () => {
    let cantidad = inputTexto.value.length;
    contador.textContent = `${cantidad} / 100 caracteres`;

    if (cantidad > 100) {
        contador.style.color = "red";
    } else {
        contador.style.color = "black";
    }
});

```

#### Ejemplo 4: Interceptar envío de formulario con `e.preventDefault()`

```
// prevenir_envio.js
const formulario = document.querySelector("#miFormulario");

formulario.addEventListener("submit", (e) => {
    // 1. Detener el envío automático y recarga de la página
    e.preventDefault();

    console.log("¡Envío detenido para validación previa!");
    alert("Comprobando datos antes de enviar...");
});

```

## Bloque 3: Validaciones y Expresiones Regulares (RegEx)

La validación en el cliente mejora la experiencia de usuario (UX) y ahorra peticiones al servidor, aunque **nunca** sustituye a la validación en el backend.

### 1. Validación Nativa HTML5

Primera línea de defensa usando atributos HTML en los `<input>`: `required`, `type="email"`, `minlength`, `maxlength` y `pattern`.

```
<!-- Ejemplo de validación nativa HTML5 -->
<input type="text" id="ref" required pattern="[A-Z]{3}[0-9]{4}" 
       title="3 letras mayúsculas y 4 números" />

```

### 2. Captura y Limpieza de Datos en JS

```
// captura_input.js
const campoNombre = document.querySelector("#nombreUsuario");
let textoLimpio = campoNombre.value.trim(); // Elimina espacios al inicio y final

if (textoLimpio === "") {
    console.log("El campo está completamente vacío.");
} else {
    console.log("Nombre introducido: " + textoLimpio);
}

```

### 3. Sintaxis de Expresiones Regulares (`RegEx`)

En JS se definen mediante **notación literal** (`/patron/flags`) o mediante constructor (`new RegExp('patron')`).

* **Anclas:** `^` (inicio de cadena), `$` (fin de cadena). Combinar `^patron$` obliga a validar la cadena completa.

* **Clases y abreviaturas:** `[a-z]`, `[A-Z]`, `[0-9]`, `[^0-9]` (negación), `\d` (dígito), `\w` (alfanumérico o `_`), `\s` (espacio).

* **Cuantificadores:** `{n}` (exactamente $n$), `{min,max}` (rango), `+` (1 o más), `*` (0 o más), `?` (0 o 1).

* **Banderas (Flags):** `i` (ignora mayúsculas/minúsculas), `g` (global), `m` (multilínea).

* **Métodos:** `patron.test(texto)` (devuelve `true`/`false`), `texto.match(patron)`, `patron.exec(texto)`, `texto.search(patron)`.

#### Ejemplos de Validación con `regex.test()`

```
// ejemplos_regex.js

// 1. Teléfono español (empieza por 6, 7 o 9 + 8 dígitos = 9 cifras)
const patronTel = /^[679]\d{8}$/;
console.log(patronTel.test("655112233")); // true
console.log(patronTel.test("855112233")); // false

// 2. Nombre de usuario (solo letras con tildes y ñ, entre 3 y 15 caracteres)
const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,15}$/;
console.log(patronNombre.test("María"));  // true
console.log(patronNombre.test("Ana_99")); // false

// 3. Correo electrónico básico
const patronEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
console.log(patronEmail.test("alumno@daw.es")); // true

```

### 4. Proyecto Integrado Completo (HTML + JS)

#### Estructura HTML (`index.html`)

```
<form id="formularioRegistro">
    <label for="nombre">Nombre: </label>
    <input type="text" id="nombre" placeholder="Tu nombre">

    <label for="telefono">Teléfono: </label>
    <input type="text" id="telefono" placeholder="Ej: 612345678">

    <button type="submit">Registrarse</button>
</form>

<!-- Contenedor para mostrar feedback de error -->
<div id="mensajeError" style="color: red;"></div>

```

#### Lógica de Validación (`validar_formulario_completo.js`)

```
const form = document.querySelector("#formularioRegistro");
const divError = document.querySelector("#mensajeError");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // 1. Detener envío por defecto
    divError.textContent = ""; // Limpiar errores previos

    // 2. Capturar y limpiar datos
    let nom = document.querySelector("#nombre").value.trim();
    let tel = document.querySelector("#telefono").value.trim();

    // 3. Definir Expresiones Regulares
    let regNom = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,15}$/;
    let regTel = /^[679]\d{8}$/;

    // 4. Evaluar con .test()
    if (!regNom.test(nom)) {
        divError.textContent = "El nombre debe tener solo letras (3-15 chars).";
        return;
    }

    if (!regTel.test(tel)) {
        divError.textContent = "El teléfono debe tener 9 cifras y empezar por 6, 7 o 9.";
        return;
    }

    // 5. Éxito
    alert("¡Formulario validado con éxito!");
    // form.submit(); // Se enviaría al servidor si todo es correcto
});

```