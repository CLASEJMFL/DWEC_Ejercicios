# DOM en JavaScript

## 1. ¿Qué es el DOM?

El **DOM (Document Object Model)** es una representación del documento HTML en forma de árbol de objetos.

Permite que JavaScript pueda:
- Acceder a elementos HTML.
- Modificar textos y contenidos.
- Cambiar estilos CSS.
- Crear y eliminar elementos.
- Detectar eventos del usuario.

## 2. Seleccionar elementos

```javascript
// Seleccionar un elemento por su ID
document.getElementById("titulo");

// Seleccionar elementos por clase
document.getElementsByClassName("caja");

// Seleccionar elementos por etiqueta
document.getElementsByTagName("p");

// Seleccionar el primer elemento que coincida
document.querySelector(".caja");

// Seleccionar todos los elementos que coincidan
document.querySelectorAll(".caja");
```

## 3. Modificar elementos

```javascript
// Seleccionar el título
let titulo = document.getElementById("titulo");

// Cambiar el texto
titulo.textContent = "Nuevo título";

// Cambiar el contenido HTML
titulo.innerHTML = "<strong>Hola</strong>";

// Modificar estilos CSS
titulo.style.color = "red";
titulo.style.backgroundColor = "yellow";
titulo.style.fontSize = "30px";

// Modificar atributos
let imagen = document.querySelector("img");
imagen.src = "foto.jpg";
imagen.alt = "Fotografía";
```

## 4. Crear y eliminar elementos

```javascript
// Crear un párrafo
let parrafo = document.createElement("p");

// Añadir texto al párrafo
parrafo.textContent = "Hola mundo";

// Añadirlo al documento
document.body.appendChild(parrafo);

// Eliminar el párrafo
parrafo.remove();
```

## 5. Eventos del DOM

Los eventos permiten ejecutar código cuando el usuario interactúa con la página.

Eventos más importantes:
- `click`: hacer clic.
- `mouseover`: pasar el ratón por encima.
- `mouseout`: retirar el ratón.
- `keydown`: pulsar una tecla.
- `submit`: enviar un formulario.
- `change`: cambiar un valor.

```javascript
// Seleccionar el botón
let boton = document.querySelector("button");

// Ejecutar una función al hacer clic
boton.addEventListener("click", function() {
    alert("Has hecho clic");
});
```

## 6. classList

Sirve para añadir, eliminar y comprobar clases CSS.

```javascript
let caja = document.querySelector(".caja");

// Añadir una clase
caja.classList.add("activo");

// Eliminar una clase
caja.classList.remove("activo");

// Activar o desactivar una clase
caja.classList.toggle("activo");

// Comprobar si tiene una clase
caja.classList.contains("activo");
```

## 7. Recorrer elementos

```javascript
// Seleccionar todos los párrafos
let parrafos = document.querySelectorAll("p");

// Recorrerlos uno a uno
parrafos.forEach(function(parrafo) {
    // Mostrar el contenido de cada párrafo
    console.log(parrafo.textContent);
});
```

## 8. Chuleta para el examen

| Método / Propiedad | Función |
|---|---|
| `document` | Acceder al documento |
| `getElementById()` | Buscar por ID |
| `querySelector()` | Seleccionar un elemento |
| `querySelectorAll()` | Seleccionar varios |
| `textContent` | Cambiar texto |
| `innerHTML` | Cambiar HTML |
| `style` | Modificar CSS |
| `createElement()` | Crear elementos |
| `appendChild()` | Añadir elementos |
| `remove()` | Eliminar elementos |
| `addEventListener()` | Detectar eventos |
| `classList.add()` | Añadir clases |
| `classList.remove()` | Eliminar clases |
| `classList.toggle()` | Alternar clases |
| `classList.contains()` | Comprobar clases |

## 9. Lo más importante para el examen

1. Saber seleccionar elementos HTML.
2. Modificar textos y estilos.
3. Crear y eliminar elementos.
4. Utilizar eventos con `addEventListener()`.
5. Manipular clases con `classList`.

**Recuerda:** El DOM permite conectar JavaScript con HTML para modificar dinámicamente una página web.