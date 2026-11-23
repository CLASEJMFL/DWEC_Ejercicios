# DWEC — 30 ejercicios prácticos de acceso y manipulación del DOM

**Desarrollo Web en Entorno Cliente · Grado Superior DAW / DAM**

---

## Bloque 1. Nivel fácil (ejercicios 1–10)

### 1. Selección por ID y modificación de texto

Dado un elemento con ID `titulo-principal`, selecciona el elemento utilizando `document.getElementById()` y cambia su contenido textual a `"¡Bienvenidos a DWEC!"` utilizando la propiedad `textContent`.

**Objetivo técnico:** Uso básico de `getElementById()` y la propiedad `textContent`.

### 2. Selección múltiple por clase e iteración

Dada una lista HTML con etiquetas de clase `item`, selecciona todos los elementos por clase utilizando `document.getElementsByClassName()` y cambia el color de texto de cada uno a azul mediante un bucle `for`.

**Objetivo técnico:** Manejo e iteración de colecciones `HTMLCollection`.

### 3. Selección única con selector CSS

Utiliza `document.querySelector()` para capturar el primer párrafo que tenga la clase `.destacado` dentro de un contenedor con ID `#seccion-noticias` y modifica su estilo para que tenga texto en negrita.

**Objetivo técnico:** Uso básico de `querySelector()` con selectores CSS compuestos.

### 4. Selección múltiple moderna con NodeList

Captura todos los botones con la clase `.btn-accion` utilizando `document.querySelectorAll()` y recorre el `NodeList` resultante mediante el método `.forEach()` para añadir el atributo `disabled = true`.

**Objetivo técnico:** Uso de `querySelectorAll()` y su método nativo `forEach()`.

### 5. Modificación directa de estilos en línea

Selecciona un `div` con ID `#caja-alerta` y cambia dinámicamente su color de fondo a rojo (`#FF4D4D`), su `padding` a `15px` y su borde a `2px solid darkred` utilizando la propiedad `.style`.

**Objetivo técnico:** Asignación de estilos CSS individuales en línea con formato camelCase.

### 6. Lectura y escritura de atributos HTML

Dado un enlace con ID `mi-enlace` y URL de ejemplo, lee su atributo `href` con `getAttribute()`, muéstralo por consola y actualízalo a una nueva dirección web con `setAttribute()`.

**Objetivo técnico:** Uso de los métodos `getAttribute()` y `setAttribute()`.

### 7. Añadir clases CSS con classList

Dado un contenedor con ID `#tarjeta`, añade las clases CSS `sombra-elevada` y `borde-redondeado` sin sobrescribir las clases existentes, utilizando la propiedad `classList.add()`.

**Objetivo técnico:** Gestión segura de clases CSS mediante la API `classList`.

### 8. Conmutación de clases con classList.toggle()

Escribe el código necesario para alternar (activar/desactivar) la clase `modo-oscuro` en el elemento `document.body` cada vez que se ejecute la función `conmutarTema()`.

**Objetivo técnico:** Uso del método `classList.toggle()` para estados binarios.

### 9. Creación e inserción simple de nodos

Crea un nuevo elemento párrafo (`p`) con `document.createElement()`, asígnale un texto descriptivo y añádelo como último hijo de un contenedor `#contenedor-principal` usando `appendChild()`.

**Objetivo técnico:** Creación con `createElement()` e inserción con `appendChild()`.

### 10. Eliminación directa de un nodo

Selecciona un elemento de aviso con ID `#banner-publicidad` y elimínalo completamente del documento HTML utilizando el método moderno `.remove()`.

**Objetivo técnico:** Eliminación directa de elementos con el método `Element.remove()`.

---

## Bloque 2. Nivel intermedio (ejercicios 11–20)

### 11. Conversión de HTMLCollection a Array

Obtén todas las filas (`tr`) de una tabla con `getElementsByTagName()`. Convierte la `HTMLCollection` en un Array verdadero mediante `Array.from()` o el operador Spread (`[...coleccion]`) y aplica `.filter()`.

**Objetivo técnico:** Transformación de colecciones vivas a arrays funcionales de JavaScript.

### 12. Inserción de marcado HTML con innerHTML

Dado un `div` vacío `#perfil-usuario`, inserta dinámicamente una estructura que contenga una imagen de avatar, un título con el nombre y un párrafo con la biografía utilizando `innerHTML`.

**Objetivo técnico:** Uso de plantillas literales e `innerHTML` para renderizado dinámico.

### 13. Atributos personalizados data-* y dataset

Dado un botón con atributos `data-producto-id` y `data-precio`, accede a sus valores mediante la propiedad `dataset`, calcula el IVA (21 %) y actualiza `data-precio-total` en el DOM.

**Objetivo técnico:** Lectura y escritura de atributos `data-*` mediante la API `dataset`.

### 14. Navegación ascendente en el árbol (parentElement)

Dado un botón de cierre dentro de una tarjeta, escribe una función que reciba el botón y elimine su contenedor padre directo (`parentElement`) del documento.

**Objetivo técnico:** Navegación por la jerarquía del DOM hacia nodos padre.

### 15. Obtención del primer y último hijo

Selecciona una lista desordenada (`#lista-tareas`) y cambia el color de texto del primer hijo elemento (`firstElementChild`) a verde y del último hijo elemento (`lastElementChild`) a rojo.

**Objetivo técnico:** Uso de `firstElementChild` y `lastElementChild`, omitiendo nodos de texto.

### 16. Navegación entre hermanos (Siblings)

Dado un elemento `input`, accede a su hermano siguiente inmediato en el DOM (`nextElementSibling`) para mostrar u ocultar un mensaje de error tipo `span`.

**Objetivo técnico:** Recorrido horizontal del DOM con `nextElementSibling`.

### 17. Inserción de nodos en posición específica

Crea un elemento `li` con texto e insértalo justo antes del segundo elemento hijo de una lista `#lista-prioridades` utilizando el método `insertBefore()`.

**Objetivo técnico:** Uso del método `insertBefore(nuevoNodo, nodoReferencia)`.

### 18. Clonación profunda de nodos (cloneNode)

Selecciona una plantilla de tarjeta HTML con ID `#plantilla-tarjeta`, realiza una clonación profunda (`cloneNode(true)`), modifica el título del clon e insértalo en un contenedor `#galeria`.

**Objetivo técnico:** Duplicación de estructuras DOM con `cloneNode()`.

### 19. Reemplazo de nodos existentes

Crea un elemento `h2` con un nuevo título y reemplaza un párrafo antiguo con ID `#texto-viejo` utilizando el método `replaceChild()` desde su elemento padre.

**Objetivo técnico:** Reemplazo de nodos del DOM con `parentNode.replaceChild()`.

### 20. Asignación masiva de estilos con cssText

Selecciona una ventana modal `#modal-aviso` y aplica múltiples propiedades de estilo de una sola vez (posición fija, `z-index`, `background`, `border-radius` y `box-shadow`) utilizando la propiedad `style.cssText`.

**Objetivo técnico:** Modificación masiva de estilos CSS mediante `cssText`.

---

## Bloque 3. Nivel avanzado (ejercicios 21–30)

### 21. Generación dinámica de tablas desde JSON

Dado un Array de objetos JavaScript con datos de usuarios (`[{id, nombre, email, rol}]`), genera dinámicamente una tabla HTML completa (`table`, `thead`, `tbody`) e insértala en `#contenedor-tabla`.

**Objetivo técnico:** Construcción completa de estructuras tabulares complejas dinámicas.

### 22. Buscador y filtrado en tiempo real de lista

Dado un campo `input` de búsqueda y una lista de 20 productos en el DOM, escribe el código JavaScript que escuche la entrada y oculte (`display: none`) aquellos elementos cuyo texto no coincida.

**Objetivo técnico:** Filtrado dinámico de nodos del DOM mediante consultas de texto.

### 23. Componente desplegable: acordeón interactivo

Crea la lógica para un conjunto de 3 botones de acordeón. Al hacer clic en un botón, debe desplegar su panel asociado (hermano siguiente) y cerrar los demás paneles abiertos manipulando clases.

**Objetivo técnico:** Gestión de estados mutuamente excluyentes en grupos de elementos DOM.

### 24. Galería de imágenes con visor principal

Crea una galería con 4 miniaturas (`img` con atributo `data-full`). Al hacer clic en cualquier miniatura, actualiza el atributo `src` de la imagen principal e invierte la clase activa.

**Objetivo técnico:** Mapeo de eventos y actualización sincrónica de atributos de imagen.

### 25. Paginador de elementos DOM en cliente

Dado un contenedor con 25 elementos `.tarjeta-item`, escribe una función `mostrarPagina(numPagina)` que calcule los índices de inicio y fin (5 elementos por página) y muestre u oculte las tarjetas.

**Objetivo técnico:** Lógica de paginación visual sobre nodos DOM preexistentes.

### 26. Reordenamiento dinámico de filas de tabla

Implementa botones de ordenación en cada fila de una tabla. Al pulsar el botón de subir, la fila debe intercambiar su posición con la fila anterior en el DOM utilizando `insertBefore()`.

**Objetivo técnico:** Manipulación posicional de nodos hermanos dentro del DOM.

### 27. Formulario con campos dinámicos quitables

Crea un formulario que permita añadir nuevos campos de texto al pulsar un botón de añadir. Cada campo generado debe incluir su propio botón para quitar ese bloque específico.

**Objetivo técnico:** Creación modular de componentes de formulario dinámicos.

### 28. Renderizado recursivo de árbol de comentarios

Dado un objeto JSON con comentarios anidados (cada comentario tiene texto y un array opcional de respuestas), crea una función recursiva que genere la estructura de listas anidadas en el DOM.

**Objetivo técnico:** Recursividad aplicada a la generación de estructuras jerárquicas DOM.

### 29. Checkbox Master (seleccionar / deseleccionar todo)

Dado un checkbox principal `#select-all` y 10 checkboxes individuales, programa la sincronización bidireccional: marcar el principal marca todos; desmarcar uno individual desmarca el principal.

**Objetivo técnico:** Sincronización de estados grupales en controles de formulario.

### 30. Miniaplicación To-Do List completa con filtros

Crea una aplicación de lista de tareas funcional que permita:

1. Añadir tareas.
2. Marcar tareas como completadas.
3. Quitar tareas.
4. Filtrar la vista (**Todas / Pendientes / Completadas**).
5. Actualizar un contador.

**Objetivo técnico:** Integración completa de selección, creación, modificación y filtrado del DOM.

---

*Documento organizado a partir del material proporcionado: «30 ejercicios prácticos: acceso al DOM».*