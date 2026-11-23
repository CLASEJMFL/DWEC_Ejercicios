# Guía Técnica del DOM: Funciones, Propiedades y Ejemplos (DWEC)

Este documento recopila y explica detalladamente todas las funciones, métodos y propiedades de JavaScript utilizadas para resolver los **30 ejercicios prácticos de acceso y manipulación del DOM**, organizadas por bloques de dificultad.

---

## Bloque 1. Nivel fácil (Ejercicios 1–10)

### 1. `document.getElementById()` y `textContent`
* **Explicación:** `getElementById(id)` busca y devuelve una referencia al primer elemento del documento que posea el atributo `id` especificado. `textContent` permite leer o modificar el contenido de texto plano de un nodo y sus descendientes, ignorando etiquetas HTML (es más seguro y rápido que `innerHTML` si no se inserta marcado).
* **Ejemplo:**
```javascript
const titulo = document.getElementById('titulo-principal');
if (titulo) {
  titulo.textContent = '¡Bienvenidos a DWEC!';
}
```

### 2. `document.getElementsByClassName()` y `HTMLCollection`
* **Explicación:** Devuelve una `HTMLCollection` (una colección "viva" que se actualiza automáticamente si cambia el DOM) con todos los elementos que contienen la clase indicada. Al no ser un Array puro, no tiene métodos como `.forEach()`, por lo que se suele recorrer con un bucle `for` clásico o `for...of`.
* **Ejemplo:**
```javascript
const items = document.getElementsByClassName('item');
for (let i = 0; i < items.length; i++) {
  items[i].style.color = 'blue';
}
```

### 3. `document.querySelector()`
* **Explicación:** Devuelve el **primer** elemento del documento que coincida con el selector CSS especificado. Permite utilizar selectores complejos (descendientes, clases, atributos, pseudoclases). Si no encuentra coincidencias, devuelve `null`.
* **Ejemplo:**
```javascript
const parrafoDestacado = document.querySelector('#seccion-noticias p.destacado');
if (parrafoDestacado) {
  parrafoDestacado.style.fontWeight = 'bold';
}
```

### 4. `document.querySelectorAll()` y `NodeList.prototype.forEach()`
* **Explicación:** Devuelve un `NodeList` estático con todos los elementos que coincidan con el selector CSS. A diferencia de `HTMLCollection`, `NodeList` sí incorpora de forma nativa el método `.forEach()` para iterar sobre sus elementos.
* **Ejemplo:**
```javascript
const botones = document.querySelectorAll('.btn-accion');
botones.forEach((boton) => {
  boton.disabled = true;
});
```

### 5. Propiedad `HTMLElement.style`
* **Explicación:** Permite leer o asignar estilos CSS directamente en el atributo `style` del elemento (estilos en línea). Las propiedades CSS que llevan guion (como `background-color`) se escriben en formato **camelCase** (`backgroundColor`).
* **Ejemplo:**
```javascript
const caja = document.getElementById('caja-alerta');
caja.style.backgroundColor = '#FF4D4D';
caja.style.padding = '15px';
caja.style.border = '2px solid darkred';
```

### 6. `getAttribute()` y `setAttribute()`
* **Explicación:** `getAttribute(nombre)` devuelve el valor actual de un atributo HTML como cadena de texto. `setAttribute(nombre, valor)` crea un nuevo atributo o actualiza el valor de uno existente en el elemento.
* **Ejemplo:**
```javascript
const enlace = document.getElementById('mi-enlace');
const urlActual = enlace.getAttribute('href');
console.log('URL anterior:', urlActual);

enlace.setAttribute('href', 'https://developer.mozilla.org/es/');
```

### 7. `classList.add()`
* **Explicación:** La propiedad `classList` devuelve una colección `DOMTokenList` con las clases del elemento. Su método `.add()` permite añadir una o varias clases separadas por comas sin borrar las que ya tenía el elemento.
* **Ejemplo:**
```javascript
const tarjeta = document.getElementById('tarjeta');
tarjeta.classList.add('sombra-elevada', 'borde-redondeado');
```

### 8. `classList.toggle()`
* **Explicación:** Alterna la presencia de una clase en el elemento. Si la clase existe, la elimina y devuelve `false`; si no existe, la añade y devuelve `true`. Es ideal para interruptores visuales como modos oscuros o menús.
* **Ejemplo:**
```javascript
function conmutarTema() {
  document.body.classList.toggle('modo-oscuro');
}
```

### 9. `document.createElement()` y `appendChild()`
* **Explicación:** `createElement(etiqueta)` instancia un nuevo nodo elemento en memoria (aún no visible en la página). `appendChild(nodo)` inserta dicho nodo como el último hijo dentro de un elemento padre existente en el DOM.
* **Ejemplo:**
```javascript
const contenedor = document.getElementById('contenedor-principal');
const nuevoParrafo = document.createElement('p');
nuevoParrafo.textContent = 'Este párrafo ha sido creado dinámicamente.';

contenedor.appendChild(nuevoParrafo);
```

### 10. `Element.remove()`
* **Explicación:** Método moderno que elimina directamente el nodo sobre el que se invoca del árbol DOM, sin necesidad de referenciar primero a su nodo padre.
* **Ejemplo:**
```javascript
const banner = document.getElementById('banner-publicidad');
if (banner) {
  banner.remove();
}
```

---

## Bloque 2. Nivel intermedio (Ejercicios 11–20)

### 11. `getElementsByTagName()`, `Array.from()` y Spread (`[...]`)
* **Explicación:** `getElementsByTagName()` captura elementos por su etiqueta HTML devolviendo una `HTMLCollection`. Al convertirla en un Array real con `Array.from()` o `[...]`, desbloqueamos métodos funcionales como `.filter()`, `.map()` o `.reduce()`.
* **Ejemplo:**
```javascript
const filasColeccion = document.getElementsByTagName('tr');
const filasArray = [...filasColeccion]; // También válido: Array.from(filasColeccion)

const filasActivas = filasArray.filter(fila => fila.classList.contains('activa'));
console.log(filasActivas);
```

### 12. `Element.innerHTML` y Template Literals
* **Explicación:** `innerHTML` interpreta una cadena de texto como código HTML y reemplaza todo el contenido interno del elemento. Combinado con plantillas literales (comillas invertidas `` ` ``), facilita la inyección de estructuras HTML complejas con variables. *(Nota: Evitar su uso con datos introducidos por usuarios sin sanitizar para prevenir ataques XSS).*
* **Ejemplo:**
```javascript
const perfil = document.getElementById('perfil-usuario');
const usuario = {
  nombre: 'Laura Gómez',
  avatar: 'avatar.png',
  bio: 'Desarrolladora Frontend apasionada por JavaScript.'
};

perfil.innerHTML = `
  <img src="${usuario.avatar}" alt="Foto de ${usuario.nombre}">
  <h3>${usuario.nombre}</h3>
  <p>${usuario.bio}</p>
`;
```

### 13. `HTMLElement.dataset`
* **Explicación:** Proporciona acceso de lectura y escritura a todos los atributos personalizados `data-*` de un elemento. Los nombres con guiones en HTML (ej. `data-precio-total`) se transforman automáticamente a camelCase en JavaScript (`dataset.precioTotal`).
* **Ejemplo:**
```javascript
const btnProducto = document.querySelector('[data-producto-id]');
const precioBase = parseFloat(btnProducto.dataset.precio);
const precioConIva = (precioBase * 1.21).toFixed(2);

// Crea o actualiza el atributo data-precio-total en el HTML
btnProducto.dataset.precioTotal = precioConIva;
```

### 14. `Node.parentElement`
* **Explicación:** Devuelve el elemento padre directo de un nodo en la jerarquía del DOM (o `null` si no tiene padre o si el padre no es un elemento HTML).
* **Ejemplo:**
```javascript
function cerrarTarjeta(botonCerrar) {
  const tarjetaPadre = botonCerrar.parentElement;
  if (tarjetaPadre) {
    tarjetaPadre.remove();
  }
}
```

### 15. `firstElementChild` y `lastElementChild`
* **Explicación:** Devuelven el primer y último hijo **de tipo Elemento** respectivamente, ignorando nodos de texto vacíos (espacios o saltos de línea del código HTML) y comentarios, a diferencia de `firstChild` y `lastChild`.
* **Ejemplo:**
```javascript
const lista = document.getElementById('lista-tareas');
if (lista.firstElementChild) {
  lista.firstElementChild.style.color = 'green';
}
if (lista.lastElementChild) {
  lista.lastElementChild.style.color = 'red';
}
```

### 16. `Element.nextElementSibling` (y `previousElementSibling`)
* **Explicación:** Permite navegar horizontalmente entre elementos que comparten el mismo padre. `nextElementSibling` obtiene el elemento hermano inmediatamente posterior en el DOM.
* **Ejemplo:**
```javascript
const inputEmail = document.getElementById('email');
const spanError = inputEmail.nextElementSibling;

if (!inputEmail.value.includes('@')) {
  spanError.style.display = 'inline';
  spanError.textContent = 'Formato de correo inválido';
} else {
  spanError.style.display = 'none';
}
```

### 17. `Node.insertBefore()`
* **Explicación:** Inserta un nodo nuevo antes de un nodo de referencia existente dentro de un nodo padre. Sintaxis: `padre.insertBefore(nuevoNodo, nodoReferencia)`.
* **Ejemplo:**
```javascript
const listaPrioridades = document.getElementById('lista-prioridades');
const nuevoItem = document.createElement('li');
nuevoItem.textContent = 'Tarea de prioridad media';

// children[1] representa el segundo elemento hijo (índice base 0)
const segundoElemento = listaPrioridades.children[1];
listaPrioridades.insertBefore(nuevoItem, segundoElemento);
```

### 18. `Node.cloneNode()`
* **Explicación:** Duplica un nodo existente. Si se pasa `true` como argumento (`cloneNode(true)`), realiza una **clonación profunda**, copiando también todos sus atributos y nodos hijos; con `false`, solo clona la etiqueta exterior. *(Recuerda cambiar o eliminar el `id` del clon para no tener IDs duplicados en el documento).*
* **Ejemplo:**
```javascript
const plantilla = document.getElementById('plantilla-tarjeta');
const galeria = document.getElementById('galeria');

const clon = plantilla.cloneNode(true);
clon.removeAttribute('id'); // Evitamos IDs duplicados
clon.querySelector('h3').textContent = 'Nueva Tarjeta Clonada';

galeria.appendChild(clon);
```

### 19. `Node.replaceChild()`
* **Explicación:** Reemplaza un nodo hijo existente dentro de un elemento padre por otro nodo nuevo. Sintaxis: `padre.replaceChild(nuevoNodo, nodoAntiguo)`.
* **Ejemplo:**
```javascript
const textoViejo = document.getElementById('texto-viejo');
const nuevoTitulo = document.createElement('h2');
nuevoTitulo.textContent = 'Sección Actualizada';

textoViejo.parentNode.replaceChild(nuevoTitulo, textoViejo);
```

### 20. `CSSStyleDeclaration.cssText`
* **Explicación:** Permite establecer o sobrescribir múltiples reglas CSS en línea de una sola vez usando sintaxis CSS estándar en una cadena de texto.
* **Ejemplo:**
```javascript
const modal = document.getElementById('modal-aviso');
modal.style.cssText = `
  position: fixed;
  z-index: 1000;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;
```

---

## Bloque 3. Nivel avanzado (Ejercicios 21–30)

### 21. Construcción dinámica de tablas (`createElement`, `Object.keys`, `forEach`)
* **Explicación:** Combina la creación programática de nodos (`table`, `thead`, `tbody`, `tr`, `th`, `td`) con la iteración de estructuras de datos JSON para renderizar tablas escalables sin depender de `innerHTML`.
* **Ejemplo:**
```javascript
const usuarios = [
  { id: 1, nombre: 'Ana', email: 'ana@mail.com', rol: 'Admin' },
  { id: 2, nombre: 'Luis', email: 'luis@mail.com', rol: 'Editor' }
];

const contenedor = document.getElementById('contenedor-tabla');
const tabla = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');

// Cabeceras dinámicas
const trHead = document.createElement('tr');
Object.keys(usuarios[0]).forEach(clave => {
  const th = document.createElement('th');
  th.textContent = clave.toUpperCase();
  trHead.appendChild(th);
});
thead.appendChild(trHead);

// Filas de datos
usuarios.forEach(user => {
  const tr = document.createElement('tr');
  Object.values(user).forEach(valor => {
    const td = document.createElement('td');
    td.textContent = valor;
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});

tabla.append(thead, tbody);
contenedor.appendChild(tabla);
```

### 22. Filtrado en tiempo real (`addEventListener('input')`, `toLowerCase()`, `includes()`)
* **Explicación:** El evento `'input'` se dispara cada vez que el valor de un campo cambia. Normalizando tanto la búsqueda como el texto del DOM a minúsculas (`toLowerCase()`), se comprueba la coincidencia con `includes()` y se alterna `style.display`.
* **Ejemplo:**
```javascript
const buscador = document.getElementById('buscador');
const productos = document.querySelectorAll('.producto-item');

buscador.addEventListener('input', (e) => {
  const textoBusqueda = e.target.value.toLowerCase().trim();

  productos.forEach(producto => {
    const nombreProducto = producto.textContent.toLowerCase();
    producto.style.display = nombreProducto.includes(textoBusqueda) ? '' : 'none';
  });
});
```

### 23. Acordeón interactivo (Estados mutuamente excluyentes)
* **Explicación:** Al pulsar un botón, primero se recorren todos los paneles para cerrarlos (quitando la clase activa) excepto el panel asociado al botón pulsado (`nextElementSibling`), sobre el cual se hace `toggle()`.
* **Ejemplo:**
```javascript
const botonesAcordeon = document.querySelectorAll('.acordeon-btn');

botonesAcordeon.forEach(boton => {
  boton.addEventListener('click', () => {
    const panelActual = boton.nextElementSibling;

    // Cerrar todos los demás paneles
    document.querySelectorAll('.acordeon-panel').forEach(panel => {
      if (panel !== panelActual) {
        panel.classList.remove('activo');
      }
    });

    // Alternar el panel actual
    panelActual.classList.toggle('activo');
  });
});
```

### 24. Galería de imágenes con visor principal (`dataset` + sincronización de clases)
* **Explicación:** Escucha el clic en las miniaturas, lee la ruta de alta resolución desde `dataset.full`, actualiza el `src` de la imagen principal y mueve la clase `.activa` desde la miniatura anterior a la pulsada.
* **Ejemplo:**
```javascript
const visorPrincipal = document.getElementById('imagen-principal');
const miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(img => {
  img.addEventListener('click', () => {
    visorPrincipal.src = img.dataset.full;

    document.querySelector('.miniatura.activa')?.classList.remove('activa');
    img.classList.add('activa');
  });
});
```

### 25. Paginador en cliente (Cálculo de rangos sobre nodos)
* **Explicación:** Dada una página `numPagina` (base 1) y un tamaño de página (`porPagina = 5`), se calcula el índice inicial `(numPagina - 1) * porPagina` y el final `inicio + porPagina`. Solo se muestran los nodos cuyo índice esté dentro de ese intervalo.
* **Ejemplo:**
```javascript
function mostrarPagina(numPagina) {
  const tarjetas = document.querySelectorAll('.tarjeta-item');
  const porPagina = 5;
  const inicio = (numPagina - 1) * porPagina;
  const fin = inicio + porPagina;

  tarjetas.forEach((tarjeta, indice) => {
    tarjeta.style.display = (indice >= inicio && indice < fin) ? 'block' : 'none';
  });
}
```

### 26. Reordenamiento dinámico de filas (`previousElementSibling` + `insertBefore`)
* **Explicación:** En el DOM, si llamas a `insertBefore()` con un nodo que **ya existe** en el documento, el navegador no lo duplica, sino que lo **mueve** de posición automáticamente.
* **Ejemplo:**
```javascript
document.querySelectorAll('.btn-subir').forEach(boton => {
  boton.addEventListener('click', (e) => {
    const filaActual = e.target.closest('tr');
    const filaAnterior = filaActual.previousElementSibling;

    if (filaAnterior) {
      filaActual.parentNode.insertBefore(filaActual, filaAnterior);
    }
  });
});
```

### 27. Formulario con campos dinámicos quitables (Componentes modulares)
* **Explicación:** Se encapsula la creación de cada fila (contenedor + `input` + botón eliminar) asignando el evento de eliminación al botón en el mismo momento en que se crea en memoria.
* **Ejemplo:**
```javascript
const contenedorCampos = document.getElementById('campos-dinamicos');
const btnAgregar = document.getElementById('btn-agregar-campo');

btnAgregar.addEventListener('click', () => {
  const grupo = document.createElement('div');
  grupo.className = 'grupo-campo';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Introduce un dato...';

  const btnEliminar = document.createElement('button');
  btnEliminar.type = 'button';
  btnEliminar.textContent = 'Quitar';
  btnEliminar.addEventListener('click', () => grupo.remove());

  grupo.append(input, btnEliminar);
  contenedorCampos.appendChild(grupo);
});
```

### 28. Renderizado recursivo de árbol de comentarios
* **Explicación:** Una función recursiva se llama a sí misma cada vez que detecta que un objeto comentario tiene un array `respuestas` con elementos, creando listas `<ul>` anidadas dentro de cada `<li>`.
* **Ejemplo:**
```javascript
function renderizarComentarios(comentarios, contenedorPadre) {
  const ul = document.createElement('ul');

  comentarios.forEach(comentario => {
    const li = document.createElement('li');
    li.textContent = comentario.texto;

    // Caso recursivo: si existen respuestas, llamamos de nuevo a la función
    if (comentario.respuestas && comentario.respuestas.length > 0) {
      renderizarComentarios(comentario.respuestas, li);
    }

    ul.appendChild(li);
  });

  contenedorPadre.appendChild(ul);
}
```

### 29. Checkbox Master (Sincronización bidireccional)
* **Explicación:** Se utilizan dos escuchadores de evento `'change'`: uno en el checkbox maestro para propagar su propiedad `.checked` a todos los hijos, y otro en cada hijo que usa `Array.prototype.every()` para comprobar si todos están marcados.
* **Ejemplo:**
```javascript
const checkMaster = document.getElementById('select-all');
const checksIndividuales = [...document.querySelectorAll('.check-item')];

checkMaster.addEventListener('change', () => {
  checksIndividuales.forEach(chk => chk.checked = checkMaster.checked);
});

checksIndividuales.forEach(chk => {
  chk.addEventListener('change', () => {
    checkMaster.checked = checksIndividuales.every(item => item.checked);
  });
});
```

### 30. Miniaplicación To-Do List completa (Delegación de eventos y estado)
* **Explicación:** Integra creación de nodos, **delegación de eventos** (escuchar clics en el `<ul>` padre usando `e.target` para manejar botones creados dinámicamente), filtrado mediante atributos `data-filtro` y conteo dinámico de nodos.
* **Ejemplo:**
```javascript
const inputTarea = document.getElementById('nueva-tarea');
const listaTareas = document.getElementById('lista-tareas');
const contador = document.getElementById('contador-pendientes');
let filtroActual = 'todas';

function actualizarVista() {
  const tareas = [...listaTareas.children];
  let pendientes = 0;

  tareas.forEach(li => {
    const completada = li.classList.contains('completada');
    if (!completada) pendientes++;

    if (filtroActual === 'todas') li.style.display = '';
    else if (filtroActual === 'pendientes') li.style.display = completada ? 'none' : '';
    else if (filtroActual === 'completadas') li.style.display = completada ? '' : 'none';
  });

  contador.textContent = `Pendientes: ${pendientes}`;
}

// 1. Añadir tarea
document.getElementById('btn-agregar').addEventListener('click', () => {
  if (!inputTarea.value.trim()) return;
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="texto-tarea">${inputTarea.value}</span>
    <button class="btn-borrar">Eliminar</button>
  `;
  listaTareas.appendChild(li);
  inputTarea.value = '';
  actualizarVista();
});

// 2 y 3. Completar o eliminar mediante delegación de eventos
listaTareas.addEventListener('click', (e) => {
  if (e.target.classList.contains('texto-tarea')) {
    e.target.parentElement.classList.toggle('completada');
  } else if (e.target.classList.contains('btn-borrar')) {
    e.target.parentElement.remove();
  }
  actualizarVista();
});

// 4. Filtrar vista
document.querySelectorAll('[data-filtro]').forEach(btn => {
  btn.addEventListener('click', () => {
    filtroActual = btn.dataset.filtro;
    actualizarVista();
  });
});
```