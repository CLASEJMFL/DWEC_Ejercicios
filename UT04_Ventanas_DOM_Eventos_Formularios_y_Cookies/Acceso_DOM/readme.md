# ACCESO Y MANIPULACIÓN DEL DOM EN JAVASCRIPT

**Asignatura:** Desarrollo Web en Entorno Cliente (DWEC)

---

# 1. INTRODUCCIÓN AL DOM

## ¿Qué es el DOM?

El **DOM (Document Object Model)** es una API que conecta HTML con JavaScript.

- Representa el documento HTML como un árbol jerárquico de objetos.
- Cada etiqueta, atributo y texto se convierte en un nodo.
- Permite a JavaScript leer, modificar, crear y eliminar elementos HTML.
- Los cambios realizados se reflejan inmediatamente en la página.

## Estructura del árbol DOM

```text
document
 └── html
      ├── head
      │    └── title
      └── body
           ├── h1
           └── p
```

Elementos principales:

- `document`: nodo raíz del documento.
- `html`: elemento raíz HTML.
- `head`: contiene los metadatos.
- `body`: contiene el contenido visible.
- Nodos hoja: elementos internos y sus textos.

## Diferencia entre window y document

| Objeto | Función |
|---|---|
| `window` | Representa la ventana o pestaña del navegador. |
| `document` | Representa el documento HTML cargado. |

`document` pertenece a `window`.

```javascript
window.document.getElementById('caja');
document.getElementById('caja');
```

Ambas instrucciones son equivalentes.

## Tipos de nodos

| Tipo | Número | Representación |
|---|---:|---|
| `ELEMENT_NODE` | 1 | Etiquetas HTML |
| `ATTRIBUTE_NODE` | 2 | Atributos |
| `TEXT_NODE` | 3 | Texto |
| `DOCUMENT_NODE` | 9 | Documento completo |

Propiedades importantes:

```javascript
elemento.nodeType;  // Tipo numérico
elemento.nodeName;  // Nombre del nodo
elemento.nodeValue; // Valor del nodo
```

## Propiedades importantes de document

```javascript
document.title;   // Título de la página
document.body;    // Acceso al body
document.head;    // Acceso al head
document.forms;   // Colección de formularios
document.images;  // Colección de imágenes
document.URL;     // URL actual
```

## Herramientas de desarrollo (F12)

- **Elements:** permite inspeccionar el árbol HTML.
- **Console:** permite ejecutar JavaScript.
- `$0`: referencia al elemento seleccionado en Elements.
- `console.dir(elemento)`: muestra sus propiedades internas.

---

# 2. MÉTODOS DE SELECCIÓN

Sirven para localizar elementos HTML desde JavaScript.

## getElementById()

Selecciona un elemento por su ID.

```javascript
const caja = document.getElementById('caja');
```

- Devuelve un único elemento.
- Si no existe, devuelve `null`.
- Los ID deben ser únicos.
- Es un método rápido y eficiente.

## getElementsByClassName()

Selecciona elementos por su clase CSS.

```javascript
const cajas = document.getElementsByClassName('caja');
```

- Devuelve una `HTMLCollection`.
- Es una colección **viva**: se actualiza cuando cambia el DOM.
- No es un Array real.
- No permite utilizar directamente `forEach()`.

Recorrido:

```javascript
for (let i = 0; i < cajas.length; i++) {
    cajas[i].style.color = 'red';
}
```

## getElementsByTagName()

Selecciona elementos por su etiqueta HTML.

```javascript
const imagenes = document.getElementsByTagName('img');
```

- Devuelve una `HTMLCollection` viva.
- Permite seleccionar etiquetas como `p`, `div`, `img` o `a`.
- Acepta `*` para seleccionar todos los elementos.

## querySelector()

Selecciona el **primer elemento** que coincida con un selector CSS.

```javascript
document.querySelector('#titulo');       // Por ID
document.querySelector('.caja');         // Por clase
document.querySelector('p');             // Por etiqueta
document.querySelector('input[type=text]'); // Por atributo
```

- Devuelve un único elemento.
- Si no encuentra ninguno, devuelve `null`.
- Permite utilizar selectores CSS complejos.

## querySelectorAll()

Selecciona **todos los elementos** que coincidan con un selector CSS.

```javascript
const botones = document.querySelectorAll('.boton');

botones.forEach(boton => {
    boton.style.color = 'blue';
});
```

- Devuelve una `NodeList`.
- Es una colección **estática**: no se actualiza cuando cambia el DOM.
- Permite utilizar `forEach()`.

## Diferencia entre HTMLCollection y NodeList

| Característica | HTMLCollection | NodeList |
|---|---|---|
| Métodos habituales | `getElementsBy...` | `querySelectorAll` |
| Contenido | Elementos HTML | Nodos |
| Tipo | Viva | Estática en este caso |
| `forEach()` | No directamente | Sí |
| Se actualiza al cambiar DOM | Sí | No |

**Importante para examen:**

- `getElementsByClassName()` → HTMLCollection viva.
- `getElementsByTagName()` → HTMLCollection viva.
- `querySelectorAll()` → NodeList estática.
- `querySelector()` → Primer elemento.

## Convertir colecciones en Arrays

Ni `HTMLCollection` ni `NodeList` son Arrays reales.

Para utilizar métodos como `.map()`, `.filter()` o `.reduce()`:

```javascript
const elementos = document.querySelectorAll('.precio');

const array = [...elementos];

const precios = array.map(el =>
    parseFloat(el.textContent)
);
```

También podemos utilizar:

```javascript
const array = Array.from(elementos);
```

## Seleccionar dentro de otro elemento

No siempre hay que buscar desde `document`.

```javascript
const formulario = document.querySelector('#formulario');

const email = formulario.querySelector('input[type=email]');
```

Esto limita la búsqueda al elemento seleccionado.

---

# 3. LECTURA Y MODIFICACIÓN DE CONTENIDO

Permite consultar y modificar el contenido HTML.

## textContent

Lee o modifica el texto de un elemento.

```javascript
const titulo = document.querySelector('h1');

console.log(titulo.textContent);

titulo.textContent = 'Nuevo título';
```

- Obtiene todo el texto.
- Incluye texto oculto mediante CSS.
- Es más rápido que `innerText`.
- No interpreta etiquetas HTML.

## innerText

Lee el texto visible de un elemento.

```javascript
console.log(titulo.innerText);
```

- Respeta los estilos CSS.
- No devuelve texto oculto.
- Tiene un coste mayor porque puede provocar un recálculo visual (*reflow*).

## Diferencia entre textContent e innerText

| Propiedad | textContent | innerText |
|---|---|---|
| Lee texto | Sí | Sí |
| Incluye texto oculto | Sí | No |
| Respeta CSS visual | No | Sí |
| Rendimiento | Mejor | Menor |

**Recomendación:** utilizar `textContent` normalmente.

## innerHTML

Permite leer o modificar el contenido HTML interno de un elemento.

```javascript
const caja = document.querySelector('#caja');

caja.innerHTML = `
    <h2>Hola</h2>
    <p>Texto nuevo</p>
`;
```

- Interpreta etiquetas HTML.
- Permite insertar estructuras HTML completas.
- Destruye y recrea los nodos internos al reemplazar el contenido.
- Se pierden los eventos asociados a los nodos antiguos.

## outerHTML

Permite leer o sustituir el elemento completo, incluida su etiqueta exterior.

```javascript
const boton = document.querySelector('#boton');

boton.outerHTML = '<p>Elemento sustituido</p>';
```

**Diferencia importante:**

- `innerHTML`: modifica el contenido interior.
- `outerHTML`: sustituye el elemento completo.

## Seguridad: ataque XSS

XSS (*Cross-Site Scripting*) consiste en introducir código malicioso mediante contenido HTML.

Ejemplo inseguro:

```javascript
perfil.innerHTML = usuarioInput;
```

Si el usuario introduce código malicioso, podría ejecutarse.

Ejemplo seguro para mostrar texto:

```javascript
perfil.textContent = usuarioInput;
```

**Regla de oro:**

- Para mostrar texto → `textContent`.
- Para crear elementos HTML → `document.createElement()`.
- Evitar insertar datos de usuarios sin verificar mediante `innerHTML`.

## Ejemplo: contador incremental

```javascript
let contador = 0;

const display = document.querySelector('#num-display');
const boton = document.querySelector('#btn-sumar');

boton.addEventListener('click', () => {
    contador++;

    display.textContent = contador;

    if (contador > 5) {
        display.style.color = 'green';
    }
});
```

---

# 4. ATRIBUTOS Y PROPIEDADES

Permiten consultar, modificar, comprobar y eliminar atributos HTML.

## getAttribute()

Obtiene el valor de un atributo HTML.

```javascript
const img = document.querySelector('img');

console.log(img.getAttribute('src'));
```

## setAttribute()

Crea o modifica un atributo.

```javascript
img.setAttribute('src', 'foto2.jpg');

img.setAttribute('alt', 'Nueva fotografía');
```

## hasAttribute()

Comprueba si un elemento tiene un atributo.

```javascript
if (img.hasAttribute('disabled')) {
    console.log('Está deshabilitado');
}
```

Devuelve `true` o `false`.

## removeAttribute()

Elimina un atributo.

```javascript
img.removeAttribute('disabled');
```

Es útil para gestionar atributos como:

- `disabled`
- `required`
- `hidden`
- `readonly`

## Diferencia entre atributo HTML y propiedad DOM

Es una diferencia fundamental.

- **Atributo HTML:** valor inicial definido en el código HTML.
- **Propiedad DOM:** valor actual del objeto JavaScript en memoria.

Ejemplo:

HTML:

```html
<input id="usuario" value="Juan">
```

JavaScript:

```javascript
const input = document.querySelector('#usuario');

input.value = 'Pedro';

console.log(input.value);
// Pedro

console.log(input.getAttribute('value'));
// Juan
```

La propiedad `value` cambia, pero el atributo HTML conserva el valor inicial.

## Atributos personalizados: dataset

Los atributos `data-*` permiten almacenar información personalizada.

HTML:

```html
<button id="btn" data-id="102" data-rol="admin">
    Borrar
</button>
```

JavaScript:

```javascript
const btn = document.querySelector('#btn');

console.log(btn.dataset.id);  // 102
console.log(btn.dataset.rol); // admin

btn.dataset.rol = 'superadmin';
```

**Importante:** los atributos `data-*` se acceden mediante `.dataset`.

Los nombres con guiones se transforman a camelCase:

`data-user-id` → `dataset.userId`.

---

# 5. ESTILOS CSS Y CLASES

Permite modificar la apariencia de los elementos desde JavaScript.

## Propiedad style

Modifica directamente los estilos CSS en línea.

```javascript
const caja = document.querySelector('.caja');

caja.style.backgroundColor = 'blue';
caja.style.fontSize = '20px';
caja.style.marginTop = '15px';
caja.style.display = 'none';
```

**Importante:** las propiedades CSS con guiones se escriben en camelCase.

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `margin-top` | `marginTop` |

Los valores se asignan como cadenas de texto, incluyendo las unidades cuando sean necesarias.

## cssText

Permite asignar varios estilos de una vez.

```javascript
const aviso = document.querySelector('#alerta');

aviso.style.cssText = `
    background-color: red;
    color: white;
    padding: 12px;
`;
```

**Atención:** sobrescribe los estilos en línea anteriores.

## classList

Es la forma recomendada de gestionar las clases CSS.

### add()

Añade una o varias clases.

```javascript
caja.classList.add('activo');
```

### remove()

Elimina una clase.

```javascript
caja.classList.remove('activo');
```

### toggle()

Añade una clase si no existe o la elimina si ya existe.

```javascript
caja.classList.toggle('activo');
```

### contains()

Comprueba si existe una clase.

```javascript
caja.classList.contains('activo');
```

Devuelve `true` o `false`.

### replace()

Sustituye una clase por otra.

```javascript
caja.classList.replace('clase-antigua', 'clase-nueva');
```

## Ejemplo: modo oscuro

```javascript
const boton = document.querySelector('#btn-tema');

boton.addEventListener('click', () => {

    const esOscuro = document.body.classList.toggle('dark-mode');

    boton.textContent = esOscuro ? 'Modo Claro' : 'Modo Oscuro';

});
```

---

# 6. NAVEGACIÓN POR EL ÁRBOL DOM

Permite desplazarse entre elementos relacionados sin tener que seleccionarlos individualmente.

## Navegación vertical: padre e hijos

| Propiedad | Función |
|---|---|
| `parentElement` | Obtiene el padre. |
| `children` | Obtiene los hijos que son elementos HTML. |
| `firstElementChild` | Obtiene el primer hijo elemento. |
| `lastElementChild` | Obtiene el último hijo elemento. |

Ejemplo:

```javascript
const lista = document.querySelector('ul');

console.log(lista.parentElement);
console.log(lista.children.length);
console.log(lista.firstElementChild);
console.log(lista.lastElementChild);
```

## Navegación horizontal: hermanos

Permite moverse entre elementos del mismo nivel.

| Propiedad | Función |
|---|---|
| `previousElementSibling` | Obtiene el hermano anterior. |
| `nextElementSibling` | Obtiene el hermano siguiente. |

Ejemplo:

```javascript
const centro = document.querySelector('#centro');

const anterior = centro.previousElementSibling;
const siguiente = centro.nextElementSibling;
```

Si no existe un hermano en esa dirección, devuelve `null`.

**Importante:** utilizar siempre las propiedades que terminan en `Element` para evitar capturar espacios y saltos de línea como nodos de texto.

## Recorrer elementos con while

```javascript
const lista = document.querySelector('ul');

let actual = lista.firstElementChild;

while (actual !== null) {

    console.log(actual.textContent);

    actual = actual.nextElementSibling;

}
```

Esto permite recorrer todos los elementos sin necesitar un ID para cada uno.

---

# 7. CREACIÓN E INSERCIÓN DE ELEMENTOS

Permite crear elementos HTML dinámicamente desde JavaScript.

## createElement()

Crea un elemento HTML nuevo en memoria.

```javascript
const parrafo = document.createElement('p');

parrafo.textContent = 'Hola mundo';

parrafo.classList.add('destacado');

parrafo.id = 'nuevo-parrafo';
```

El elemento todavía no aparece en la página porque no se ha insertado en el DOM.

## appendChild()

Inserta un elemento como último hijo de un contenedor.

```javascript
const contenedor = document.querySelector('#app');

const boton = document.createElement('button');

boton.textContent = 'Nuevo botón';

contenedor.appendChild(boton);
```

Si el nodo ya estaba en otra parte del documento, se mueve de sitio, no se duplica.

## insertBefore()

Inserta un nodo antes de otro nodo de referencia.

```javascript
lista.insertBefore(nuevoElemento, primerHijo);
```

## append()

Permite insertar varios nodos o cadenas de texto al final.

```javascript
contenedor.append(nuevoElemento, 'Texto');
```

## prepend()

Inserta contenido al principio del contenedor.

```javascript
contenedor.prepend(nuevoElemento);
```

## Eliminar elementos

### remove()

Elimina directamente el elemento.

```javascript
const aviso = document.querySelector('#aviso');

aviso.remove();
```

### removeChild()

Elimina un hijo desde su elemento padre.

```javascript
const lista = document.querySelector('ul');

const ultimo = lista.lastElementChild;

lista.removeChild(ultimo);
```

**Diferencia:**

- `remove()`: el elemento se elimina a sí mismo.
- `removeChild()`: el padre elimina a uno de sus hijos.

## cloneNode()

Permite duplicar un elemento.

```javascript
const original = document.querySelector('.card');

const copia = original.cloneNode(true);
```

- `true`: clona también todos sus hijos.
- `false`: clona solamente el elemento.

**Importante:** `cloneNode()` no copia los eventos añadidos mediante `addEventListener()`.

## replaceChild()

Sustituye un hijo por otro.

```javascript
padre.replaceChild(nuevoElemento, elementoAntiguo);
```

---

# 8. PROYECTO INTEGRADOR: TO-DO LIST

El PDF termina con un proyecto práctico: crear una aplicación de lista de tareas.

## Objetivo

Crear una aplicación que permita:

1. Introducir una tarea.
2. Añadirla a una lista.
3. Crear un botón individual para eliminarla.
4. Borrar la tarea correspondiente al pulsar su botón.
5. Limpiar el campo de texto después de añadirla.

## HTML

```html
<div id="app">

    <h2>Mi Lista de Tareas</h2>

    <input
        type="text"
        id="input-tarea"
        placeholder="Nueva tarea..."
    >

    <button id="btn-agregar">
        Agregar Tarea
    </button>

    <ul id="lista-tareas"></ul>

</div>
```

## JavaScript completo

```javascript
const input = document.querySelector('#input-tarea');

const btn = document.querySelector('#btn-agregar');

const lista = document.querySelector('#lista-tareas');


btn.addEventListener('click', () => {

    // Comprobar que no esté vacío
    if (input.value.trim() === '') return;

    // Crear elemento li
    const li = document.createElement('li');

    li.textContent = input.value + ' ';

    // Crear botón de borrar
    const btnBorrar = document.createElement('button');

    btnBorrar.textContent = '❌';

    // Evento para eliminar la tarea
    btnBorrar.onclick = () => li.remove();

    // Añadir botón al li
    li.appendChild(btnBorrar);

    // Añadir tarea a la lista
    lista.appendChild(li);

    // Limpiar input
    input.value = '';

});
```

## Métodos utilizados en el proyecto

| Método | Utilidad |
|---|---|
| `querySelector()` | Seleccionar elementos. |
| `addEventListener()` | Detectar clics. |
| `createElement()` | Crear elementos HTML. |
| `textContent` | Introducir texto. |
| `appendChild()` | Insertar elementos. |
| `remove()` | Eliminar tareas. |
| `trim()` | Comprobar si el texto está vacío. |

---

# 9. TABLA RESUMEN: MÉTODOS QUE DEBES MEMORIZAR

## Selección

| Método | Qué hace |
|---|---|
| `getElementById()` | Selecciona por ID. |
| `getElementsByClassName()` | Selecciona por clase. |
| `getElementsByTagName()` | Selecciona por etiqueta. |
| `querySelector()` | Selecciona el primero que coincida. |
| `querySelectorAll()` | Selecciona todos los que coincidan. |

## Lectura y modificación

| Propiedad | Qué hace |
|---|---|
| `textContent` | Lee o modifica texto completo. |
| `innerText` | Lee o modifica texto visible. |
| `innerHTML` | Lee o modifica el HTML interior. |
| `outerHTML` | Lee o sustituye el elemento completo. |

## Atributos

| Método | Qué hace |
|---|---|
| `getAttribute()` | Lee un atributo. |
| `setAttribute()` | Crea o modifica un atributo. |
| `hasAttribute()` | Comprueba si existe un atributo. |
| `removeAttribute()` | Elimina un atributo. |
| `dataset` | Accede a atributos `data-*`. |

## CSS y clases

| Método/propiedad | Qué hace |
|---|---|
| `style` | Modifica estilos CSS en línea. |
| `cssText` | Modifica varios estilos a la vez. |
| `classList.add()` | Añade clases. |
| `classList.remove()` | Elimina clases. |
| `classList.toggle()` | Alterna clases. |
| `classList.contains()` | Comprueba si existe una clase. |
| `classList.replace()` | Sustituye una clase. |

## Navegación

| Propiedad | Qué hace |
|---|---|
| `parentElement` | Padre. |
| `children` | Hijos. |
| `firstElementChild` | Primer hijo. |
| `lastElementChild` | Último hijo. |
| `previousElementSibling` | Hermano anterior. |
| `nextElementSibling` | Hermano siguiente. |

## Creación y eliminación

| Método | Qué hace |
|---|---|
| `createElement()` | Crea un elemento. |
| `appendChild()` | Inserta al final. |
| `insertBefore()` | Inserta antes de otro. |
| `append()` | Añade contenido al final. |
| `prepend()` | Añade contenido al principio. |
| `remove()` | Elimina un elemento. |
| `removeChild()` | El padre elimina un hijo. |
| `cloneNode()` | Duplica un elemento. |
| `replaceChild()` | Sustituye un hijo. |

---

# 10. DIFERENCIAS IMPORTANTES PARA EL EXAMEN

| Conceptos | Diferencia fundamental |
|---|---|
| `window` vs `document` | Ventana del navegador vs documento HTML. |
| `querySelector` vs `querySelectorAll` | Primero vs todos. |
| HTMLCollection vs NodeList | Viva vs estática (en `querySelectorAll`). |
| `textContent` vs `innerText` | Todo el texto vs texto visible. |
| `innerHTML` vs `outerHTML` | Contenido interior vs elemento completo. |
| Atributo vs propiedad DOM | Valor HTML inicial vs valor actual en memoria. |
| `getAttribute` vs `setAttribute` | Leer vs modificar. |
| `style` vs `classList` | Modificar estilos directamente vs gestionar clases. |
| `appendChild` vs `insertBefore` | Añadir al final vs insertar antes de una referencia. |
| `remove` vs `removeChild` | Eliminar directamente vs eliminar desde el padre. |
| `cloneNode(true)` vs `cloneNode(false)` | Copiar también los hijos vs solo el elemento. |

---

# CHULETA FINAL: TODOS LOS MÉTODOS Y OPCIONES DEL DOM

## 1. SELECCIONAR ELEMENTOS

```javascript
document.getElementById('id');
document.getElementsByClassName('clase');
document.getElementsByTagName('p');
document.querySelector('#id');
document.querySelector('.clase');
document.querySelectorAll('.clase');
```

- ID → un elemento.
- ClassName → HTMLCollection viva.
- TagName → HTMLCollection viva.
- querySelector → primer elemento.
- querySelectorAll → NodeList estática.

## 2. LEER Y MODIFICAR CONTENIDO

```javascript
elemento.textContent;
elemento.innerText;
elemento.innerHTML;
elemento.outerHTML;
```

- `textContent` → todo el texto.
- `innerText` → texto visible.
- `innerHTML` → HTML interior.
- `outerHTML` → elemento completo.

## 3. ATRIBUTOS

```javascript
elemento.getAttribute('src');
elemento.setAttribute('src', 'foto.jpg');
elemento.hasAttribute('disabled');
elemento.removeAttribute('disabled');
elemento.dataset.id;
```

- get → obtener.
- set → modificar.
- has → comprobar.
- remove → eliminar.
- dataset → atributos personalizados.

## 4. PROPIEDADES DOM HABITUALES

```javascript
elemento.id;
elemento.className;
elemento.value;
elemento.href;
elemento.src;
elemento.checked;
elemento.disabled;
elemento.name;
elemento.type;
elemento.title;
elemento.nodeType;
elemento.nodeName;
elemento.nodeValue;
```

## 5. ESTILOS CSS

```javascript
elemento.style.color = 'red';
elemento.style.backgroundColor = 'blue';
elemento.style.fontSize = '20px';
elemento.style.display = 'none';

elemento.style.cssText = 'color: red; background: blue;';
```

Recuerda: CSS con guiones → camelCase en JavaScript.

## 6. CLASES CSS

```javascript
elemento.classList.add('activo');
elemento.classList.remove('activo');
elemento.classList.toggle('activo');
elemento.classList.contains('activo');
elemento.classList.replace('vieja', 'nueva');
```

| Método | Acción |
|---|---|
| add | Añadir |
| remove | Eliminar |
| toggle | Alternar |
| contains | Comprobar |
| replace | Sustituir |

## 7. NAVEGACIÓN DOM

```javascript
elemento.parentElement;
elemento.children;
elemento.firstElementChild;
elemento.lastElementChild;
elemento.previousElementSibling;
elemento.nextElementSibling;
```

- Padre → `parentElement`.
- Todos los hijos → `children`.
- Primer hijo → `firstElementChild`.
- Último hijo → `lastElementChild`.
- Hermano anterior → `previousElementSibling`.
- Hermano siguiente → `nextElementSibling`.

## 8. CREAR E INSERTAR

```javascript
document.createElement('div');

contenedor.appendChild(nuevo);
contenedor.insertBefore(nuevo, referencia);
contenedor.append(nuevo, 'Texto');
contenedor.prepend(nuevo);
```

| Método | Acción |
|---|---|
| createElement | Crear |
| appendChild | Insertar al final |
| insertBefore | Insertar antes |
| append | Añadir al final |
| prepend | Añadir al principio |

## 9. ELIMINAR, CLONAR Y REEMPLAZAR

```javascript
elemento.remove();

padre.removeChild(hijo);

elemento.cloneNode(true);

elemento.cloneNode(false);

padre.replaceChild(nuevo, antiguo);
```

- `remove()` → eliminar directamente.
- `removeChild()` → eliminar desde el padre.
- `cloneNode(true)` → clonar con hijos.
- `cloneNode(false)` → clonar sin hijos.
- `replaceChild()` → sustituir un hijo.

## 10. EVENTOS Y FUNCIONES ÚTILES DEL PROYECTO

```javascript
elemento.addEventListener('click', () => {
    console.log('Clic');
});

elemento.onclick = () => {
    console.log('Clic');
};

input.value;
input.value = '';

input.value.trim();

console.log(elemento);

console.dir(elemento);
```

- `addEventListener()` → escuchar eventos.
- `onclick` → asignar un evento de clic.
- `value` → obtener o cambiar el valor de un input.
- `trim()` → eliminar espacios al principio y al final.
- `console.log()` → mostrar información.
- `console.dir()` → inspeccionar propiedades.

## 11. PROPIEDADES DE DOCUMENT

```javascript
document.title;
document.body;
document.head;
document.forms;
document.images;
document.URL;
document.documentElement;
```

---

## RESUMEN ULTRARRÁPIDO PARA MEMORIZAR

| Quiero... | Utilizo... |
|---|---|
| Buscar por ID | `getElementById()` |
| Buscar por clase | `getElementsByClassName()` |
| Buscar por etiqueta | `getElementsByTagName()` |
| Buscar el primero | `querySelector()` |
| Buscar todos | `querySelectorAll()` |
| Leer texto | `textContent` |
| Leer texto visible | `innerText` |
| Insertar HTML | `innerHTML` |
| Sustituir elemento entero | `outerHTML` |
| Obtener atributo | `getAttribute()` |
| Cambiar atributo | `setAttribute()` |
| Comprobar atributo | `hasAttribute()` |
| Borrar atributo | `removeAttribute()` |
| Acceder a data-* | `dataset` |
| Cambiar CSS | `style` |
| Añadir clase | `classList.add()` |
| Quitar clase | `classList.remove()` |
| Alternar clase | `classList.toggle()` |
| Comprobar clase | `classList.contains()` |
| Obtener padre | `parentElement` |
| Obtener hijos | `children` |
| Primer hijo | `firstElementChild` |
| Último hijo | `lastElementChild` |
| Hermano anterior | `previousElementSibling` |
| Hermano siguiente | `nextElementSibling` |
| Crear elemento | `createElement()` |
| Insertar al final | `appendChild()` |
| Insertar antes | `insertBefore()` |
| Añadir al principio | `prepend()` |
| Añadir al final | `append()` |
| Eliminar elemento | `remove()` |
| Eliminar desde padre | `removeChild()` |
| Clonar elemento | `cloneNode()` |
| Reemplazar hijo | `replaceChild()` |
| Escuchar un evento | `addEventListener()` |
| Obtener valor input | `value` |
| Quitar espacios | `trim()` |

**FIN DE LA CHULETA — DOM JAVASCRIPT**