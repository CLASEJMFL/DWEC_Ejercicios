# Resumen JavaScript – Parte 4 y Comunicación Asíncrona (DWEC)

**Módulo:** Desarrollo Web en Entorno Cliente · **Grado Superior DAW**
**Material de:** Antonio Bueno Guisado (licencia CC BY-NC-ND 4.0)

## Índice

1. [Objetos de alto nivel (BOM)](#1-objetos-de-alto-nivel-bom)
2. [Eventos en JavaScript](#2-eventos-en-javascript)
3. [Validaciones y expresiones regulares](#3-validaciones-y-expresiones-regulares)
4. [Cookies, localStorage y sessionStorage](#4-cookies-localstorage-y-sessionstorage)
5. [Acceso y manipulación del DOM](#5-acceso-y-manipulación-del-dom)
6. [Comunicación asíncrona moderna](#6-comunicación-asíncrona-moderna)
7. [Chuleta final](#7-chuleta-final)

---

# 1. Objetos de alto nivel (BOM)

## 1.1 BOM vs DOM

| | **BOM** (Browser Object Model) | **DOM** (Document Object Model) |
|---|---|---|
| Representa | La ventana del navegador y su entorno | El contenido HTML cargado en la pestaña |
| Objetos | `window`, `location`, `history`, `navigator` | `document` (cuelga de `window.document`) |
| Permite | Controlar aspectos externos a la página | Modificar textos, estilos y elementos |

## 1.2 El objeto `window`

Es el **objeto global** del navegador: contiene a todos los demás. Las variables y funciones globales son propiedades suyas, y no hace falta escribir `window.` delante (`alert()` equivale a `window.alert()`).

```js
console.log(window.innerWidth);   // ancho del viewport en px
console.log(window.innerHeight);  // alto del viewport en px
console.log(window.scrollX, window.scrollY); // desplazamiento horizontal / vertical
```

## 1.3 Diálogos nativos

| Método | Qué hace | Devuelve |
|---|---|---|
| `alert(msg)` | Ventana informativa con "Aceptar" | `undefined` |
| `confirm(msg)` | Pregunta con "Aceptar / Cancelar" | `true` / `false` |
| `prompt(msg, defecto)` | Pide un texto al usuario | `string` o `null` si cancela |

Todos **pausan** la ejecución del script hasta que el usuario responde.

```js
let nombre = prompt("¿Cómo te llamas?", "Estudiante");

if (nombre !== null && nombre !== "") {
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

## 1.4 `location`: la URL

Permite **leer** la URL actual y **redirigir** al usuario.

| Propiedad / método | Descripción |
|---|---|
| `location.href` | URL completa (si le asignas un valor, navega a él) |
| `location.hostname` | Dominio o servidor (p. ej. `localhost`) |
| `location.pathname` | Ruta del documento dentro del servidor |
| `location.search` | Parámetros GET (`?id=5&x=1`) |
| `location.assign(url)` | Carga una nueva URL |
| `location.reload()` | Recarga la página (como F5) |
| `location.replace(url)` | Cambia de URL **sin guardar** la página actual en el historial |

```js
function irAWeb() {
  console.log("URL actual: " + location.href);
  console.log("Dominio: " + location.hostname);
  location.href = "https://ejemplo.org";   // redirección
}

function refrescarPagina() {
  location.reload();
}
```

## 1.5 `history`: el historial

Simula los botones Atrás / Adelante del navegador.

| Método / propiedad | Descripción |
|---|---|
| `history.length` | Nº de páginas en el historial de la pestaña |
| `history.back()` | Página anterior |
| `history.forward()` | Página siguiente |
| `history.go(-1)` / `history.go(2)` | Retrocede 1 / avanza 2 páginas |

```js
function volverAtras() {
  if (history.length > 1) {
    history.back();
  } else {
    alert("No hay páginas anteriores en el historial.");
  }
}

function irAdelante() {
  history.forward();
}
```

---

# 2. Eventos en JavaScript

## 2.1 ¿Qué es un evento?

Una acción o suceso que ocurre en el navegador y que JS puede detectar: un clic, mover el ratón, pulsar una tecla, enviar un formulario, cargar la página (`load`) o redimensionarla (`resize`).

**Ciclo de vida de una interacción:**

1. **Acción** del usuario (clic, tecla…).
2. El navegador **crea un objeto `Event`** con todos los detalles.
3. El **listener** (escuchador) lo intercepta.
4. Se ejecuta el **callback** y se actualiza la vista, sin recargar la página.

## 2.2 Clasificación de eventos

| Categoría | Eventos |
|---|---|
| **Ratón** | `click`, `dblclick`, `mouseenter`, `mouseleave`, `mousemove`, `mousedown`, `mouseup` |
| **Teclado** | `keydown`, `keyup` (la tecla se lee con `e.key`) |
| **Formulario** | `submit`, `reset`, `change`, `input`, `focus`, `blur` |
| **Ventana** | `load`, `resize`, `scroll` |

## 2.3 Las 3 formas de asociar eventos

### ① Atributo HTML inline (desaconsejado)

Mezcla HTML con lógica. Aquí existe la variable implícita `event`:

```html
<button onclick="saludar(event)">Pulsar aquí</button>

<script>
  function saludar(e) {
    console.log("Tipo: " + e.type);              // "click"
    console.log("Elemento: " + e.target.tagName); // "BUTTON"
  }
</script>
```

### ② Propiedad del DOM (`.onclick`)

Separa HTML y JS, pero solo admite **una función por evento**: la segunda **sobrescribe** a la primera.

```js
const boton = document.querySelector("#miBoton");

boton.onclick = function () { console.log("Primer manejador"); };
boton.onclick = function () { console.log("Segundo manejador"); };
// Solo se ejecuta el segundo: el primero se ha perdido
```

### ③ `addEventListener()` (estándar W3C, recomendado)

- HTML 100 % limpio.
- Permite **múltiples** escuchadores sobre el mismo evento.
- Permite controlar la fase (captura / burbujeo).
- Permite eliminarlos con `removeEventListener()`.

```js
const btn = document.querySelector("#btnGuardar");

function guardarDatos()        { console.log("1. Guardando datos..."); }
function mostrarNotificacion() { alert("2. ¡Petición enviada!"); }

btn.addEventListener("click", guardarDatos);
btn.addEventListener("click", mostrarNotificacion); // ambos se ejecutan
```

**Anatomía:** `elemento.addEventListener(tipo, callback, useCapture)`

1. **Elemento**: el nodo capturado antes (`querySelector`…).
2. **Tipo**: string **sin** el prefijo `on` (`'click'`, no `'onclick'`).
3. **Callback**: función a ejecutar. Tercer parámetro opcional: `false` = burbujeo (por defecto), `true` = captura.

## 2.4 Funciones anónimas vs nombradas

```js
// Anónima (flecha): útil para código corto y puntual
btn.addEventListener("click", () => console.log("Clic anónimo"));

// Nombrada: reutilizable y NECESARIA si luego quieres eliminar el listener
function manejarClic() { console.log("Clic nombrado"); }
btn.addEventListener("click", manejarClic);
```

## 2.5 `removeEventListener()`

Los parámetros deben coincidir **exactamente** con los de `addEventListener`, y solo funciona con **funciones nombradas** (las anónimas no tienen referencia).

```js
const btnOferta = document.querySelector("#btnCanjear");

function reclamarPremio() {
  alert("¡Has reclamado tu premio!");
  btnOferta.removeEventListener("click", reclamarPremio); // se elimina a sí mismo
}

btnOferta.addEventListener("click", reclamarPremio); // solo funciona una vez
```

## 2.6 Propagación: captura, target y burbujeo

Si hay elementos anidados (`<button>` dentro de `<div>` dentro de `<body>`), un clic en el botón "pasa" también por sus padres. El modelo W3C define **3 fases**:

| Fase | Recorrido | Listeners que se ejecutan |
|---|---|---|
| 1. **Captura** | De `window` hacia abajo, hasta el padre del objetivo | Los registrados con `true` |
| 2. **Target** | Llega al elemento exacto | Los del propio objetivo |
| 3. **Burbujeo** | Sube de vuelta hacia `window` | Los registrados con `false` (por defecto) |

```js
const padre = document.querySelector("#padre");
const hijo  = document.querySelector("#hijo");

padre.addEventListener("click", () => console.log("Padre (captura)"), true);
hijo.addEventListener("click",  () => console.log("Hijo (target/burbujeo)"), false);
// Al hacer clic en el hijo: primero "Padre (captura)", después "Hijo"
```

### `e.stopPropagation()`

Detiene la subida del evento a los ancestros (útil en modales o botones dentro de tarjetas clicables).

```js
document.querySelector("#btnGuardar").addEventListener("click", (e) => {
  console.log("Clic en el botón interno.");
  e.stopPropagation(); // el listener del #contenedor ya no se ejecuta
});
```

## 2.7 El objeto `event` (`e`)

El navegador lo pasa como **primer argumento** del callback (se suele llamar `e`, `evt` o `event`).

| Propiedad | Significado |
|---|---|
| `e.target` | Elemento **exacto** sobre el que se actuó (puede ser un `<span>` dentro de un `<button>`) |
| `e.currentTarget` (o `this`) | Elemento que **tiene el listener**; no cambia durante el burbujeo |
| `e.type` | Nombre del evento (`"click"`, `"keydown"`…) |
| `e.key` | Tecla pulsada (teclado) |
| `e.button` | Botón de ratón: `0` izquierdo, `1` central, `2` derecho |

```js
document.querySelector("#menu").addEventListener("click", (e) => {
  console.log("Tipo: " + e.type);
  console.log("Elemento: " + e.target.tagName);
  console.log("ID: " + e.target.id);
  e.target.style.color = "#0ea5e9";
});
```

### `e.preventDefault()`

Cancela la acción por defecto del navegador: seguir un enlace, enviar y recargar un formulario…

```js
const enlace = document.querySelector("#miEnlace");
enlace.addEventListener("click", (e) => {
  e.preventDefault();                 // no navega
  alert("Irás a la web tras confirmar.");
  window.location.href = enlace.href; // navegamos nosotros cuando queramos
});
```

### Comparativa

| Método | Efecto | ¿Detiene el burbujeo? | Uso |
|---|---|---|---|
| `e.preventDefault()` | Cancela la acción nativa | No | Validar formularios, enlaces en SPA |
| `e.stopPropagation()` | Detiene el viaje por el árbol | Sí | Evitar clics accidentales en contenedores |
| `return false` | Cancela acción (en handlers antiguos) | Solo en inline / `.onclick` | Desaconsejado en código moderno |

## 2.8 Eventos de ratón

| Evento | Se dispara cuando… |
|---|---|
| `click` | Pulsas y sueltas el botón principal |
| `dblclick` | Dos clics rápidos seguidos |
| `mousedown` / `mouseup` | Presionas / sueltas cualquier botón (base del *drag & drop*) |
| `mousemove` | El cursor se mueve dentro del elemento |
| `mouseenter` / `mouseleave` | El puntero entra / sale del elemento |

**`mouseenter` vs `mouseover`:** `mouseenter`/`mouseleave` **no burbujean** y ignoran los hijos internos; `mouseover`/`mouseout` **sí burbujean** y saltan al pasar por cada hijo (pueden causar parpadeos). Para efectos *hover* usa `mouseenter`/`mouseleave`.

```js
// Efecto hover
const caja = document.querySelector("#cajaInteractiva");

caja.addEventListener("mouseenter", () => {
  caja.style.backgroundColor = "#0ea5e9";
  caja.style.color = "#fff";
});
caja.addEventListener("mouseleave", () => {
  caja.style.backgroundColor = "#e2e8f0";
  caja.style.color = "#0f172a";
});
```

```js
// Detectar qué botón del ratón se pulsa
caja.addEventListener("mousedown", (e) => {
  if (e.button === 0)      console.log("Botón IZQUIERDO");
  else if (e.button === 1) console.log("RUEDA / botón central");
  else if (e.button === 2) console.log("Botón DERECHO");
});
```

### Coordenadas del puntero

| Propiedad | Relativa a… |
|---|---|
| `e.clientX / e.clientY` | El **viewport** (parte visible de la página) |
| `e.pageX / e.pageY` | El **documento completo** (incluye el scroll) |
| `e.screenX / e.screenY` | La **pantalla física** del monitor |

```js
const info = document.querySelector("#infoCoordenadas");
window.addEventListener("mousemove", (e) => {
  info.textContent = `Puntero en X: ${e.clientX}px | Y: ${e.clientY}px`;
});
```

## 2.9 Eventos de teclado

| Evento | Característica |
|---|---|
| `keydown` | Al **presionar**; se repite si mantienes la tecla. Ideal para juegos y atajos |
| `keyup` | Al **soltar**; una vez por pulsación. Ideal para filtros o contadores |
| `keypress` | ⚠️ **Deprecado**: usa `keydown` o `keyup` |

`e.key` devuelve el nombre de la tecla (`'Enter'`, `'Escape'`, `'a'`, `'ArrowUp'`…) y los modificadores se leen con `e.ctrlKey`, `e.altKey`, `e.shiftKey`, `e.metaKey`.

```js
// Atajo Ctrl + S
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key.toLowerCase() === "s") {
    e.preventDefault(); // evita el "Guardar página" del navegador
    console.log("¡Atajo Ctrl + S capturado! Guardando borrador...");
  }
});
```

## 2.10 Eventos de formulario

| Evento | Cuándo se dispara |
|---|---|
| `focus` / `focusin` | El elemento recibe el foco (`focus` **no** burbujea; `focusin` **sí**) |
| `blur` / `focusout` | El elemento pierde el foco: buen momento para validar un campo |
| `input` | **Inmediatamente** en cada cambio de texto (filtros en tiempo real) |
| `change` | El valor cambia **y** el elemento pierde el foco (ideal en `<select>`, checkbox, radio) |
| `submit` | Al enviar el formulario (botón o Enter) |
| `reset` | Al limpiar el formulario |

```js
// Interceptar y validar el submit
const form = document.querySelector("#formRegistro");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // 1. Detener el envío automático

  const email = document.querySelector("#txtEmail").value.trim();
  if (email === "") {
    alert("El campo de correo no puede estar vacío.");
  } else {
    console.log("Formulario válido. Enviando datos para: " + email);
    // form.submit(); // envío manual si hiciera falta
  }
});
```

## 2.11 Ejemplos prácticos

### Contador de caracteres en tiempo real

```js
const inputMsg = document.querySelector("#txtMensaje");
const contador = document.querySelector("#lblContador");
const MAX_CHARS = 100;

inputMsg.addEventListener("input", () => {
  const restantes = MAX_CHARS - inputMsg.value.length;
  contador.textContent = `${restantes} caracteres restantes`;
  contador.style.color = restantes < 10 ? "red" : "black";
});
```

### Menú acordeón

```js
function toggleSubmenu(elementoLi) {
  const subMenu = elementoLi.querySelector("ul");
  if (!subMenu) return;
  subMenu.style.display =
    (subMenu.style.display === "none" || subMenu.style.display === "")
      ? "block" : "none";
}

document.querySelectorAll(".opcion-menu").forEach(li => {
  li.addEventListener("click", (e) => {
    e.stopPropagation();   // evita que el clic suba a los padres
    toggleSubmenu(li);
  });
});
```

### Delegación de eventos (*event delegation*)

Un **único** listener en el padre en lugar de uno por cada hijo. Funciona también con elementos creados **después** y usa `e.target.matches('selector')` para identificar el origen.

```js
const listaTarea = document.querySelector("#listaTareas");

listaTarea.addEventListener("click", (e) => {
  if (e.target.matches(".btn-borrar")) {
    e.target.parentElement.remove();
    console.log("Elemento eliminado de la lista.");
  }
});
```

## 2.12 Buenas prácticas con eventos

1. Usa siempre `addEventListener()` y mantén el HTML libre de atributos inline.
2. Usa funciones **nombradas** para callbacks complejos o que haya que desasignar.
3. Usa **delegación** en listas largas para reducir el número de listeners.
4. Usa `preventDefault()` solo cuando haga falta, y `stopPropagation()` con criterio.

---

# 3. Validaciones y expresiones regulares

## 3.1 ¿Por qué validar en el cliente?

- Mejora la **UX**: el usuario ve el error al instante.
- **Ahorra** peticiones inútiles al servidor.
- ⚠️ **No sustituye** la validación en el servidor: es solo una ayuda; el servidor debe verificar siempre.

## 3.2 Validación nativa HTML5

| Atributo | Función |
|---|---|
| `required` | Campo obligatorio |
| `type="email"` / `type="number"` | Comprueba el formato básico |
| `minlength` / `maxlength` | Longitud mínima / máxima |
| `pattern` | Expresión regular directamente en el HTML (ej. `pattern="[0-9]{9}"`) |

## 3.3 Capturar datos con `.value` y `.trim()`

```js
const campoNombre = document.querySelector("#nombreUsuario");
let textoLimpio = campoNombre.value.trim(); // quita espacios al inicio y al final

if (textoLimpio === "") {
  console.log("El campo está vacío.");
} else {
  console.log("Nombre introducido: " + textoLimpio);
}
```

## 3.4 Expresiones regulares (RegEx)

Un **patrón** que describe la *forma* de un texto (no una palabra fija, sino una regla como "9 números seguidos"). En JS se evalúa a `true` o `false`.

**Dos sintaxis:**

```js
const patron1 = /[0-9]{9}/;              // literal (recomendada para patrones fijos)
const patron2 = new RegExp('[0-9]{9}');  // constructor (útil con patrones dinámicos; hay que escapar \\d)
```

### Anclas

| Símbolo | Significado | Ejemplo |
|---|---|---|
| `^` | Debe empezar así | `/^Hola/` ✔ "Hola mundo" ✘ "Digo Hola" |
| `$` | Debe terminar así | `/fin$/` ✔ "Es el fin" ✘ "fin del juego" |
| `^…$` | Debe coincidir **todo** el texto | Imprescindible para validar formularios |

### Clases de caracteres

| Símbolo | Significado |
|---|---|
| `[a-z]` / `[A-Z]` / `[0-9]` | Minúscula / mayúscula / dígito |
| `[aeiou]` | Solo esas vocales |
| `[^0-9]` | Cualquier carácter que **no** sea número (`^` dentro de `[]` = negación) |
| `\d` | Dígito (= `[0-9]`) |
| `\w` | Letra, número o `_` |
| `\s` | Espacio en blanco |

### Cuantificadores

| Símbolo | Significado |
|---|---|
| `{9}` | Exactamente 9 veces |
| `{3,10}` | Entre 3 y 10 veces |
| `{5,}` | 5 o más |
| `+` | 1 o más (`{1,}`) |
| `*` | 0 o más (`{0,}`) |
| `?` | Opcional: 0 o 1 (`{0,1}`) |

### El método `regex.test(texto)`

Devuelve `true` si el texto cumple el patrón y `false` si no. Es la herramienta estrella para validar inputs.

```js
const patronTelefono = /^\d{9}$/;   // inicio + 9 dígitos + fin

console.log(patronTelefono.test("612345678")); // true
console.log(patronTelefono.test("1234"));      // false
```

## 3.5 Ejemplos de RegEx

### Teléfono español (9 cifras, empieza por 6, 7 o 9)

```js
const patronTel = /^[679]\d{8}$/;

function validarTelefono(numero) {
  return patronTel.test(numero)
    ? "Teléfono correcto."
    : "Debe empezar por 6, 7 o 9 y tener 9 dígitos.";
}

console.log(validarTelefono("655112233")); // correcto
console.log(validarTelefono("855112233")); // incorrecto
```

### Nombre de usuario (solo letras con tildes y ñ, 3–15 caracteres)

```js
const patronNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,15}$/;

console.log(patronNombre.test("María"));  // true
console.log(patronNombre.test("Ana_99")); // false (guion y números)
```

### Email (versión didáctica)

```js
const regEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
```

| Parte | Significado |
|---|---|
| `^[\w.-]+` | Usuario: letras, números, puntos y guiones |
| `@` | La arroba, obligatoria |
| `[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$` | Dominio + punto + extensión de al menos 2 letras (`.com`, `.es`) |

## 3.6 Proyecto integrado: formulario validado

**HTML**

```html
<form id="formularioRegistro">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" placeholder="Tu nombre">

  <label for="telefono">Teléfono:</label>
  <input type="text" id="telefono" placeholder="Ej: 612345678">

  <button type="submit">Registrarse</button>
</form>
<div id="mensajeError" style="color: red;"></div>
```

**JavaScript**

```js
const form     = document.querySelector("#formularioRegistro");
const divError = document.querySelector("#mensajeError");

form.addEventListener("submit", (e) => {
  e.preventDefault();            // 1. Detener el envío
  divError.textContent = "";     // limpiar errores previos

  const nom = document.querySelector("#nombre").value.trim();
  const tel = document.querySelector("#telefono").value.trim();

  const regNom = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{3,15}$/;  // 2. Expresiones regulares
  const regTel = /^[679]\d{8}$/;

  if (!regNom.test(nom)) {                          // 3. Validaciones
    divError.textContent = "El nombre debe tener solo letras (3-15 caracteres).";
    return;
  }
  if (!regTel.test(tel)) {
    divError.textContent = "El teléfono debe tener 9 cifras y empezar por 6, 7 o 9.";
    return;
  }
  alert("¡Formulario validado con éxito!");
});
```

---

# 4. Cookies, localStorage y sessionStorage

## 4.1 ¿Por qué almacenar datos en el cliente?

- **Persistencia de estado** entre recargas sin saturar la base de datos.
- **Ahorro de ancho de banda** (preferencias básicas sin pedirlas al servidor).
- **Mejor UX**: modo oscuro, idioma, carrito cargados al instante.

## 4.2 Comparativa

| Característica | **Cookies** | **localStorage** | **sessionStorage** |
|---|---|---|---|
| Capacidad | ~4 KB | 5–10 MB (por dominio) | ~5 MB (por pestaña) |
| Persistencia | Configurable (`expires` / `max-age`) | Permanente hasta borrado manual | Hasta cerrar la pestaña |
| Se envía al servidor | **Sí**, en cada petición HTTP | No | No |
| Acceso desde JS | `document.cookie` (texto plano) | `window.localStorage` | `window.sessionStorage` |
| Uso ideal | Sesiones de servidor, tokens, RGPD | Preferencias, temas, filtros | Datos temporales, formularios, carritos |

## 4.3 Cookies

Se leen y escriben con `document.cookie` en formato `clave=valor`. Atributos importantes: `expires`/`max-age` (si se omite, es cookie de **sesión**), `path`, `domain`, `Secure` (solo HTTPS) y `SameSite` (protección CSRF).

```js
// 1. Cookie simple (de sesión)
document.cookie = 'usuario=Rodolfo';

// 2. Cookie con caducidad (7 días)
let fecha = new Date();
fecha.setTime(fecha.getTime() + (7 * 24 * 60 * 60 * 1000));
document.cookie = 'token=ABC123XYZ; expires=' + fecha.toUTCString() + '; path=/';

// 3. Eliminar una cookie: caducarla en el pasado
document.cookie = 'usuario=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
```

### Funciones auxiliares

```js
function setCookie(nombre, valor, dias) {
  let expires = '';
  if (dias) {
    let d = new Date();
    d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
    expires = '; expires=' + d.toUTCString();
  }
  document.cookie = nombre + '=' + (valor || '') + expires + '; path=/';
}

function getCookie(nombre) {
  let nameEQ = nombre + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}
```

**Caso típico: banner de consentimiento de cookies**

1. Al entrar, comprobar `getCookie('cookiesAceptadas')`.
2. Si devuelve `null`, mostrar el aviso.
3. Al pulsar "Aceptar": `setCookie('cookiesAceptadas', 'true', 365)`.
4. Durante el año siguiente, `getCookie` devuelve `'true'` y no se vuelve a mostrar.

## 4.4 sessionStorage

- Es una propiedad de `window` (`sessionStorage` a secas también vale).
- **Ámbito de pestaña**: cada pestaña tiene el suyo, aunque abras la misma URL en dos.
- **Sobrevive a recargas (F5)**, pero se borra al **cerrar la pestaña o ventana**.

**Ciclo de vida:** abrir pestaña (contexto limpio) → escribir datos → navegar/refrescar (se mantienen) → cerrar pestaña (se purgan).

## 4.5 Métodos de la interfaz `Storage`

(Los mismos para `localStorage` y `sessionStorage`.)

| Método | Descripción |
|---|---|
| `setItem(clave, valor)` | Guarda o actualiza un par clave-valor |
| `getItem(clave)` | Devuelve el valor, o `null` si no existe |
| `removeItem(clave)` | Elimina una clave |
| `clear()` | Borra **todo** |
| `key(indice)` | Nombre de la clave en esa posición |
| `length` | Nº de elementos guardados |

```js
sessionStorage.setItem('curso', 'Desarrollo Web Entorno Cliente');
sessionStorage.setItem('modulo', 'DWEC');
sessionStorage.setItem('puntuacion', '95');

console.log('Curso:', sessionStorage.getItem('curso'));

if (sessionStorage.getItem('usuario') === null) {
  console.log('No hay ningún usuario activo en esta sesión.');
}

console.log('Total guardados:', sessionStorage.length); // 3
sessionStorage.removeItem('puntuacion');
// sessionStorage.clear();  // borraría todo
```

> Todo se guarda como **String**: `'95'` es texto, no número.

## 4.6 La limitación de los Strings y la solución JSON

Si guardas un array u objeto directamente, JS ejecuta `.toString()` y guarda `'[object Object]'`, perdiendo los datos.

- **Guardar:** `JSON.stringify(valor)`
- **Leer:** `JSON.parse(texto)`

```js
let usuarios = ['Ana', 'Juan', 'Pedro'];
sessionStorage.setItem('users', JSON.stringify(usuarios));

let recuperado = JSON.parse(sessionStorage.getItem('users'));
recuperado.push('Maria'); // ¡vuelve a ser un Array!
```

```js
// Objeto complejo
let carrito = {
  usuario: 'Carlos',
  productos: [
    { id: 1, nombre: 'Teclado Mecánico', precio: 59.99 },
    { id: 2, nombre: 'Ratón Gaming',     precio: 29.99 }
  ],
  total: 89.98
};

sessionStorage.setItem('carritoCliente', JSON.stringify(carrito));

let guardado = sessionStorage.getItem('carritoCliente');
if (guardado) {
  let obj = JSON.parse(guardado);
  console.log('Cliente:', obj.usuario);
  console.log('Primer producto:', obj.productos[0].nombre);
}
```

## 4.7 Mini-proyecto CRUD con sessionStorage

```js
let usuarios = [];

// Cargar datos al iniciar
function cargarDatosIniciales() {
  let datos = sessionStorage.getItem('listaUsuarios');
  usuarios = datos !== null ? JSON.parse(datos) : [];
}

// CREATE
function agregarUsuario(nombre) {
  cargarDatosIniciales();
  usuarios.push(nombre);
  sessionStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
}

// READ + render en el DOM
function listarUsuarios() {
  let listaHTML = document.querySelector('#listadoUsuarios');
  listaHTML.innerHTML = '';

  let datos = sessionStorage.getItem('listaUsuarios');
  if (datos === null) {
    listaHTML.innerHTML = '<li>No hay usuarios registrados</li>';
    return;
  }
  JSON.parse(datos).forEach((usuario, indice) => {
    let li = document.createElement('li');
    li.textContent = `${indice + 1}. ${usuario}`;
    listaHTML.appendChild(li);
  });
}

// UPDATE
function modificarUsuario(nombreAntiguo, nombreNuevo) {
  let datos = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');
  let index = datos.indexOf(nombreAntiguo);
  if (index !== -1) {
    datos[index] = nombreNuevo;
    sessionStorage.setItem('listaUsuarios', JSON.stringify(datos));
  }
}

// DELETE
function eliminarUsuario(nombre) {
  let datos = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');
  let filtrados = datos.filter(u => u !== nombre);
  sessionStorage.setItem('listaUsuarios', JSON.stringify(filtrados));
}

// CLEAR
function vaciarTodo() {
  sessionStorage.clear();
}
```

## 4.8 Ejemplo con localStorage: modo oscuro persistente

```js
const btnTema = document.querySelector('#btnCambiarTema');

// Al cargar: aplicar la preferencia guardada
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

// Al pulsar: alternar y guardar
btnTema.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem(
    'theme',
    document.body.classList.contains('dark-mode') ? 'dark' : 'light'
  );
});
```

## 4.9 Depuración con DevTools

`F12` (o clic derecho → Inspeccionar) → pestaña **Application** (Chrome/Edge) o **Storage** (Firefox) → *Local Storage*, *Session Storage* y *Cookies*. Puedes añadir, editar (doble clic) y borrar pares clave-valor para hacer pruebas.

## 4.10 Resumen y seguridad

- **Cookies**: comunicación servidor ↔ cliente y tokens (con `HttpOnly`).
- **localStorage**: preferencias persistentes no sensibles.
- **sessionStorage**: flujos temporales de la pestaña actual.
- Siempre `JSON.stringify()` / `JSON.parse()` con arrays y objetos.

> ⚠️ **Reglas de seguridad (XSS)**
> - **Nunca** guardes contraseñas ni datos médicos o bancarios en Web Storage.
> - Cualquier script inyectado por XSS puede leer todo el Web Storage.
> - Para autenticación usa cookies con `HttpOnly` (inaccesible desde JS) y `Secure` (solo HTTPS).
> - Protege las lecturas con `try...catch` por si el JSON está corrupto.

```js
try {
  const datos = JSON.parse(localStorage.getItem('config'));
} catch (error) {
  console.error('JSON corrupto:', error);
}
```

---

# 5. Acceso y manipulación del DOM

## 5.1 Introducción

El **DOM** es una API estándar (W3C) que representa el documento como un **árbol jerárquico de nodos**. Permite a JS leer, modificar, añadir y eliminar elementos.

```
document
└── html
    ├── head
    │   └── title ('Mi Página')
    └── body
        ├── h1 ('Bienvenido')
        └── p  ('Párrafo de ejemplo')
```

```js
console.log(document.documentElement); // <html>
console.log(document.body);            // <body>
```

**`window` vs `document`:** `window` es el objeto global del navegador (pestaña); `document` es una propiedad suya (`window.document`) y representa solo el contenido cargado. `window.document.getElementById(...)` equivale a `document.getElementById(...)`.

### Tipos de nodo

| Constante | Valor | Representa |
|---|---|---|
| `Node.ELEMENT_NODE` | 1 | Etiquetas HTML |
| `Node.ATTRIBUTE_NODE` | 2 | Atributos |
| `Node.TEXT_NODE` | 3 | Texto dentro de etiquetas |
| `Node.DOCUMENT_NODE` | 9 | El documento completo |

```js
const titulo = document.querySelector('h1');
console.log(titulo.nodeType);              // 1
console.log(titulo.nodeName);              // 'H1'
console.log(titulo.firstChild.nodeType);   // 3 (texto)
```

### Propiedades útiles de `document`

```js
document.title = 'Nuevo título desde JS';
document.body.style.backgroundColor = '#f0f0f0';
console.log('Imágenes:', document.images.length); // también: document.forms, document.head
```

### Truco en DevTools

`$0` = elemento seleccionado en el panel Elements. `console.dir($0)` muestra sus propiedades; `getEventListeners($0)` lista sus eventos.

## 5.2 Métodos de selección

| Método | Devuelve | ¿Viva o estática? |
|---|---|---|
| `getElementById('id')` | 1 elemento o `null` | — (el más rápido) |
| `getElementsByClassName('clase')` | `HTMLCollection` | **Viva** |
| `getElementsByTagName('etiqueta')` | `HTMLCollection` | **Viva** |
| `querySelector('css')` | **1er** elemento que coincida o `null` | — |
| `querySelectorAll('css')` | `NodeList` | **Estática** |

```js
// Por ID
const banner = document.getElementById('banner');
if (banner !== null) banner.style.display = 'block';

// Por clase (HTMLCollection: se recorre con for clásico)
const parrafos = document.getElementsByClassName('texto');
for (let i = 0; i < parrafos.length; i++) {
  parrafos[i].style.color = 'green';
}

// Por etiqueta
for (let img of document.getElementsByTagName('img')) {
  img.style.border = '2px solid blue';
}

// querySelector: cualquier selector CSS
const btn   = document.querySelector('#btnGuardar');
const card  = document.querySelector('.card.activa');
const enlace = document.querySelector('nav ul li > a');

// querySelectorAll: admite forEach
document.querySelectorAll('.btn-cancelar').forEach((boton, i) => {
  boton.style.opacity = '0.8';
});
```

### Colección viva vs estática

```js
const viva     = document.getElementsByClassName('box'); // 2 elementos
const estatica = document.querySelectorAll('.box');      // 2 elementos

document.body.appendChild(document.createElement('div')).className = 'box';

console.log(viva.length);     // 3 (se actualizó sola)
console.log(estatica.length); // 2 (se quedó congelada)
```

⚠️ Modificar el DOM mientras recorres una colección **viva** puede provocar bucles infinitos.

### Convertir a Array real

Ni `HTMLCollection` ni `NodeList` tienen `.map()`, `.filter()`… Se convierten con `Array.from(col)` o `[...col]`:

```js
const precios = [...document.querySelectorAll('.precio')]
  .map(el => parseFloat(el.textContent));
console.log('Precios:', precios);
```

### Buscar dentro de un subárbol

Cualquier elemento puede ejecutar `querySelector`, lo que limita la búsqueda y mejora el rendimiento:

```js
const formulario = document.querySelector('#formLogin');
const inputEmail = formulario.querySelector('input[type=email]');
const botonSubmit = formulario.querySelector('.btn-submit');
```

## 5.3 Lectura y modificación de contenido

| Propiedad | Comportamiento |
|---|---|
| `textContent` | Todo el texto (incluso oculto por CSS). **Más rápido**: recomendado |
| `innerText` | Solo el texto **visible** (respeta CSS); provoca *reflow* |
| `innerHTML` | Lee/escribe marcado HTML. **Destruye y recrea** los nodos internos (se pierden sus listeners) |
| `outerHTML` | Incluye la propia etiqueta; permite sustituir el elemento entero |

```js
// <p id="demo">Hola <span style="display:none">Secreto</span></p>
const p = document.querySelector('#demo');
console.log(p.textContent); // 'Hola Secreto'
console.log(p.innerText);   // 'Hola'
p.textContent = 'Nuevo texto seguro';
```

```js
// innerHTML: inyectar una tarjeta
document.querySelector('#lista-productos').innerHTML = `
  <div class="card">
    <h3>Producto A</h3>
    <p>Precio: $25</p>
  </div>
`;
```

```js
// outerHTML: sustituir un botón por un enlace
const btn = document.querySelector('#viejo');
btn.outerHTML = "<a href='index.html' class='btn'>Ir a Inicio</a>";
```

### ⚠️ Peligro: XSS con `innerHTML`

```js
const usuarioInput = "<img src='x' onerror='alert(\"Hacked!\")'>";

// ❌ INSEGURO: ejecuta el código malicioso
document.querySelector('#perfil').innerHTML = usuarioInput;

// ✅ SEGURO: lo muestra como texto
document.querySelector('#perfil').textContent = usuarioInput;
```

**Regla de oro:** para texto plano, `textContent`; para estructuras, `document.createElement()`. Nunca `innerHTML` con datos del usuario.

### Mini-proyecto: contador

```js
let contador = 0;
const display = document.querySelector('#num-display');

document.querySelector('#btn-sumar').addEventListener('click', () => {
  contador++;
  display.textContent = contador;
  if (contador > 5) display.style.color = 'green';
});
```

## 5.4 Atributos y propiedades

| Método | Descripción |
|---|---|
| `getAttribute(nombre)` | Lee el atributo tal como está en el HTML |
| `setAttribute(nombre, valor)` | Crea o modifica un atributo |
| `hasAttribute(nombre)` | `true` / `false` |
| `removeAttribute(nombre)` | Elimina el atributo (útil con `disabled`, `required`, `hidden`, `readonly`) |

```js
const img = document.querySelector('#foto-perfil');
console.log(img.getAttribute('src'));   // 'foto1.jpg'
img.setAttribute('src', 'foto2.jpg');
img.setAttribute('alt', 'Nueva foto de perfil');

const campo = document.querySelector('#inputNombre');
if (campo.hasAttribute('disabled')) campo.removeAttribute('disabled');
```

### Atributo HTML vs propiedad DOM

El atributo es el valor **inicial** del HTML; la propiedad es el valor **vivo** en memoria.

```js
// <input id="user" value="Juan">
const input = document.querySelector('#user');
input.value = 'Pedro';

console.log(input.value);                 // 'Pedro' (propiedad)
console.log(input.getAttribute('value')); // 'Juan'  (atributo inicial)
```

### Atributos `data-*` y `.dataset`

`data-user-id` → `dataset.userId` (conversión automática a camelCase).

```js
// <button id="btn" data-id="102" data-rol="admin">Borrar</button>
const btn = document.querySelector('#btn');
console.log(btn.dataset.id);  // '102'
console.log(btn.dataset.rol); // 'admin'
btn.dataset.rol = 'superadmin';
```

## 5.5 Estilos CSS y clases

### `.style` (estilos en línea)

Las propiedades con guion se escriben en **camelCase** y los valores son **strings con unidades**.

```js
const caja = document.querySelector('.caja');
caja.style.backgroundColor = '#3b82f6';  // background-color
caja.style.fontSize = '20px';            // font-size
caja.style.marginTop = '15px';
caja.style.display = 'none';             // ocultar
```

### `cssText` (varias reglas a la vez)

⚠️ Sobrescribe **todos** los estilos inline previos.

```js
document.querySelector('#alerta').style.cssText = `
  background-color: #fee2e2;
  color: #991b1b;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #f87171;
`;
```

### `classList` (la mejor práctica)

| Método | Descripción |
|---|---|
| `add('a', 'b')` | Añade una o varias clases |
| `remove('a')` | Quita la clase |
| `toggle('a')` | La añade si no está, la quita si está (devuelve `true`/`false`) |
| `contains('a')` | ¿Tiene la clase? |
| `replace('vieja', 'nueva')` | Sustituye una clase por otra |

```js
const tarjeta = document.querySelector('.card');
tarjeta.classList.add('sombra', 'destacado');
tarjeta.classList.remove('sombra');
tarjeta.addEventListener('click', () => tarjeta.classList.toggle('activa'));

if (document.querySelector('#miModal').classList.contains('abierto')) {
  console.log('El modal está visible');
}
document.body.classList.replace('tema-claro', 'tema-oscuro');
```

### Mini-proyecto: modo oscuro

```js
const btnTema = document.querySelector('#btn-tema');

btnTema.addEventListener('click', () => {
  const esOscuro = document.body.classList.toggle('dark-mode');
  btnTema.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';
});
```

## 5.6 Navegación por el árbol

| Propiedad | Devuelve |
|---|---|
| `parentElement` | Padre directo (elemento) |
| `children` | `HTMLCollection` viva con solo los hijos-elemento |
| `firstElementChild` / `lastElementChild` | Primer / último hijo-elemento |
| `previousElementSibling` / `nextElementSibling` | Hermano anterior / siguiente (`null` si no existe) |

> Usa siempre las versiones `…Element…` para evitar capturar saltos de línea y nodos de texto.

```js
const lista = document.querySelector('ul');
console.log('Padre:', lista.parentElement);
console.log('Total ítems:', lista.children.length);
console.log('Primero:', lista.firstElementChild.textContent);
console.log('Último:', lista.lastElementChild.textContent);

// Hermanos
const centro = document.querySelector('#centro');
centro.previousElementSibling.style.color = 'red';
centro.nextElementSibling.style.color = 'blue';

// Recorrido con while
let item = lista.firstElementChild;
while (item !== null) {
  item.style.paddingLeft = '10px';
  item = item.nextElementSibling;
}
```

## 5.7 Creación, inserción y eliminación de nodos

| Método | Descripción |
|---|---|
| `document.createElement('etiqueta')` | Crea un elemento **en memoria** (aún invisible) |
| `padre.appendChild(nodo)` | Lo añade como **último** hijo (si ya existía en el DOM, se **mueve**, no se duplica) |
| `padre.insertBefore(nuevo, referencia)` | Lo inserta justo antes de `referencia` |
| `append(...)` / `prepend(...)` | Añade nodos o texto al final / al principio (admite varios) |
| `elemento.remove()` | Se elimina a sí mismo (moderno) |
| `padre.removeChild(hijo)` | Elimina un hijo desde el padre (tradicional) |
| `padre.replaceChild(nuevo, viejo)` | Sustituye un hijo por otro |
| `elemento.cloneNode(true)` | Duplica el nodo (`true` = con todos sus hijos) |

```js
// Crear, configurar en memoria e insertar
const nuevoParrafo = document.createElement('p');
nuevoParrafo.textContent = 'Párrafo creado con JS';
nuevoParrafo.classList.add('texto-destacado');
nuevoParrafo.id = 'p-dinamico';

document.querySelector('#app').appendChild(nuevoParrafo);
```

```js
// Posición exacta
const lista = document.querySelector('ul');
const nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Ítem 0 (primero)';

lista.insertBefore(nuevoItem, lista.firstElementChild);
lista.prepend('Texto al inicio ');
```

```js
// Eliminar
document.querySelector('#banner-aviso').remove();                // moderno
lista.removeChild(lista.lastElementChild);                       // tradicional
```

```js
// Clonar (no copia los listeners añadidos con addEventListener)
const original = document.querySelector('.card');
const clon = original.cloneNode(true);
clon.querySelector('h3').textContent = 'Tarjeta clonada';
document.body.appendChild(clon);
```

## 5.8 Proyecto integrador: To-Do List

**HTML**

```html
<div id="app">
  <h2>Mi Lista de Tareas</h2>
  <input type="text" id="input-tarea" placeholder="Nueva tarea...">
  <button id="btn-agregar">Agregar Tarea</button>
  <ul id="lista-tareas"></ul>
</div>
```

**JavaScript**

```js
const input = document.querySelector('#input-tarea');
const btn   = document.querySelector('#btn-agregar');
const lista = document.querySelector('#lista-tareas');

btn.addEventListener('click', () => {
  if (input.value.trim() === '') return;      // ignorar vacíos

  const li = document.createElement('li');
  li.textContent = input.value + ' ';

  const btnBorrar = document.createElement('button');
  btnBorrar.textContent = '❌';
  btnBorrar.onclick = () => li.remove();      // borrar esta tarea

  li.appendChild(btnBorrar);
  lista.appendChild(li);
  input.value = '';                           // limpiar el input
});
```

> 💡 **Mejora:** en lugar de un `onclick` por cada botón, puedes usar **delegación de eventos** (apartado 2.11) con un único listener en la `<ul>`, y guardar la lista en `localStorage` (apartado 4) para que no se pierda al recargar.

---


# 6. Chuleta final

| Tema | Idea clave |
|---|---|
| **BOM** | `window` es el objeto global; `location` maneja la URL e `history` la navegación |
| **Eventos** | Usa `addEventListener()`; el flujo es **Captura → Target → Burbujeo** |
| **`event`** | `e.target`, `e.type`, `e.key`, `e.preventDefault()`, `e.stopPropagation()` |
| **Delegación** | Un listener en el padre + `e.target.matches('.selector')` |
| **Validación** | `.trim()` siempre; RegEx con `^…$` y `.test()`; **y** validar también en el servidor |
| **Cookies** | Tokens y comunicación con el servidor; `HttpOnly` + `Secure` |
| **localStorage** | Preferencias persistentes no sensibles |
| **sessionStorage** | Datos temporales por pestaña |
| **JSON** | `JSON.stringify()` para guardar, `JSON.parse()` para leer |
| **Selección** | `querySelector` / `querySelectorAll` (modernos); `getElementById` (el más rápido) |
| **Contenido** | `textContent` para texto; nunca `innerHTML` con datos del usuario (XSS) |
| **Estilos** | `classList` antes que `.style` |
| **Nodos** | `createElement` → configurar → `appendChild` / `append`; `remove()` para borrar |
| **Fetch** | `fetch()` no rechaza en 404/500: comprobar siempre `res.ok` |
| **Axios** | JSON automático, rechaza 4xx/5xx e incluye interceptores (token JWT) |
| **Cancelación** | `AbortController` / `AbortSignal.timeout()`; con *debounce* en buscadores |
| **FormData** | Nunca fijar `Content-Type` a mano al subir archivos |
| **CORS** | Lo resuelve el **servidor** con `Access-Control-Allow-Origin` |
| **JWT** | `Authorization: Bearer …`; mejor en cookie `HttpOnly` + `Secure` que en Web Storage |
| **UX** | 4 estados (Loading/Success/Empty/Error), optimistic UI, `DocumentFragment` |
| **Tiempo real** | Fetch = petición/respuesta · SSE = servidor→cliente · WebSocket = bidireccional |

**Siguiente paso:** levantar la API (por ejemplo con `json-server`) y conectar el cliente en el aula.