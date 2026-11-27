# Almacenamiento en el Cliente: Cookies, LocalStorage y SessionStorage (DWEC)

Guía de estudio completa con ejemplos de código, chuleta rápida de referencia y ejercicios prácticos basada en el material de **Desarrollo Web en Entorno Cliente (DWEC)** de Antonio Bueno Guisado.

---

## Parte 1: Resumen Teórico y Ejemplos de Código

### 1. Introducción y Comparativa de Tecnologías

Almacenar datos en el navegador permite mantener la persistencia de estado entre recargas, ahorrar ancho de banda evitando peticiones innecesarias al servidor y mejorar la experiencia de usuario (UX).

| Característica | Cookies | `localStorage` | `sessionStorage` |
| :--- | :--- | :--- | :--- |
| **Capacidad Máxima** | $\approx 4\text{ KB}$ | $5 - 10\text{ MB}$ (por dominio) | $5\text{ MB}$ (por pestaña) |
| **Persistencia** | Configurable (`expires` / `max-age`) | Permanente (hasta borrado manual) | Temporal (hasta cerrar la pestaña) |
| **Envío al Servidor** | **Sí** (automático en cada petición HTTP) | **No** (solo local en el cliente) | **No** (solo local en el cliente) |
| **Acceso desde JS** | `document.cookie` (texto plano) | `window.localStorage` | `window.sessionStorage` |
| **Caso de Uso Ideal** | Sesiones servidor, tokens, avisos RGPD | Preferencias, temas, filtros | Formularios por pasos, carritos temporales |

---

### 2. Cookies en JavaScript

* Se leen y escriben mediante la propiedad global `document.cookie` en formato `clave=valor`.
* Si se omite `expires` o `max-age`, la cookie es **de sesión** (se borra al cerrar el navegador).
* **Atributos de seguridad:** `path=/` (ruta accesible), `domain`, `Secure` (solo HTTPS), `SameSite` (protección CSRF) y `HttpOnly` (impide el acceso desde JS para evitar robos por XSS).

#### Ejemplo: Funciones Helper para Crear, Leer y Eliminar Cookies

```javascript
// Crear o actualizar una cookie con caducidad en días
function setCookie(nombre, valor, dias) {
    let expires = "";
    if (dias) {
        let d = new Date();
        d.setTime(d.getTime() + (dias * 24 * 60 * 60 * 1000));
        expires = "; expires=" + d.toUTCString();
    }
    document.cookie = nombre + "=" + (valor || "") + expires + "; path=/";
}

// Leer una cookie por su nombre
function getCookie(nombre) {
    let nameEQ = nombre + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// Eliminar una cookie (caducándola en el pasado)
function deleteCookie(nombre) {
    document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Uso típico: Banner de consentimiento RGPD
if (getCookie("cookiesAceptadas") === null) {
    console.log("Mostrando banner de cookies...");
    // Al pulsar aceptar:
    setCookie("cookiesAceptadas", "true", 365);
}
```

---

### 3. Web Storage API: `localStorage` y `sessionStorage`

Ambos objetos comparten exactamente los mismos métodos y propiedades, diferenciándose únicamente en su ciclo de vida y ámbito:
* **`localStorage`:** Compartido entre todas las pestañas del mismo origen (protocolo + dominio + puerto). Persiste aunque se cierre el navegador.
* **`sessionStorage`:** Aislado por pestaña (*Tab Scope*). Sobrevive a recargas (`F5`), pero se destruye al cerrar la pestaña.

#### Ejemplo: Operaciones Básicas

```javascript
// 1. Guardar datos (si la clave existe, actualiza su valor)
sessionStorage.setItem('curso', 'Desarrollo Web Entorno Cliente');
sessionStorage.setItem('puntuacion', '95'); // Se guarda como String

// 2. Leer un dato (devuelve null si no existe)
let cursoActual = sessionStorage.getItem('curso');

// 3. Comprobar existencia
if (sessionStorage.getItem('usuario') === null) {
    console.log('No hay usuario activo en esta pestaña.');
}

// 4. Consultar total y obtener clave por índice
console.log('Total elementos:', sessionStorage.length);
console.log('Primera clave:', sessionStorage.key(0));

// 5. Eliminar una clave o vaciar todo
sessionStorage.removeItem('puntuacion');
// sessionStorage.clear();
```

---

### 4. El Problema de los Objetos/Arrays y la Solución JSON

**Limitación crítica:** Web Storage **solo almacena cadenas de texto (`String`)**. Si guardas un objeto directamente, se convertirá en `"[object Object]"` y perderás la información.

* **`JSON.stringify(objeto)`:** Convierte un objeto o array JS en texto JSON para poder guardarlo.
* **`JSON.parse(textoJSON)`:** Reconstruye el objeto o array JS original al leerlo.

#### Ejemplo: Guardar y Leer Objetos Complejos

```javascript
let carrito = {
    usuario: 'Carlos',
    productos: [
        { id: 1, nombre: 'Teclado Mecánico', precio: 59.99 },
        { id: 2, nombre: 'Ratón Gaming', precio: 29.99 }
    ],
    total: 89.98
};

// 1. Serializar y guardar
sessionStorage.setItem('carritoCliente', JSON.stringify(carrito));

// 2. Leer y deserializar
let datosCrudos = sessionStorage.getItem('carritoCliente');
if (datosCrudos) {
    let objetoCarrito = JSON.parse(datosCrudos);
    console.log('Cliente:', objetoCarrito.usuario);
    console.log('Producto 1:', objetoCarrito.productos[0].nombre);
}
```

---

### 5. Proyecto Completo CRUD en `sessionStorage` y Caso Real en `localStorage`

#### CRUD Completo de Lista de Usuarios (`sessionStorage`)

```javascript
// CREATE: Agregar usuario
function agregarUsuario(nombre) {
    let usuarios = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');
    usuarios.push(nombre);
    sessionStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
}

// READ: Listar en el DOM
function listarUsuarios() {
    const listaHTML = document.querySelector('#listadoUsuarios');
    listaHTML.innerHTML = '';
    let usuarios = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');

    if (usuarios.length === 0) {
        listaHTML.innerHTML = '<li>No hay usuarios registrados</li>';
        return;
    }

    usuarios.forEach((usuario, indice) => {
        let li = document.createElement('li');
        li.textContent = `${indice + 1}. ${usuario}`;
        listaHTML.appendChild(li);
    });
}

// UPDATE: Modificar usuario existente
function modificarUsuario(nombreAntiguo, nombreNuevo) {
    let usuarios = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');
    let index = usuarios.indexOf(nombreAntiguo);
    if (index !== -1) {
        usuarios[index] = nombreNuevo;
        sessionStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
    }
}

// DELETE: Eliminar usuario específico
function eliminarUsuario(nombre) {
    let usuarios = JSON.parse(sessionStorage.getItem('listaUsuarios') || '[]');
    let filtrados = usuarios.filter(u => u !== nombre);
    sessionStorage.setItem('listaUsuarios', JSON.stringify(filtrados));
}
```

#### Aplicación Real: Modo Oscuro Persistente (`localStorage`)

```javascript
const btnTema = document.querySelector('#btnCambiarTema');

// Aplicar preferencia al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Alternar tema y guardar
btnTema.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const temaActual = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', temaActual);
});
```

---

## Parte 2: Chuleta Rápida (Cheat Sheet)

```javascript
// ================= WEB STORAGE (localStorage / sessionStorage) =================
storage.setItem('clave', 'valor');           // Guarda o sobrescribe (solo Strings)
storage.getItem('clave');                    // Devuelve valor o null si no existe
storage.removeItem('clave');                 // Elimina una entrada concreta
storage.clear();                             // Borra TODO el almacenamiento del origen
storage.key(0);                              // Nombre de la clave en la posición 0
storage.length;                              // Número total de claves almacenadas

// ================= OBJETOS Y ARRAYS CON JSON =================
localStorage.setItem('obj', JSON.stringify(miObjeto));     // Guardar objeto/array
const miObjeto = JSON.parse(localStorage.getItem('obj'));  // Recuperar objeto/array

// ================= COOKIES =================
// Crear (expira en 1 hora = 3600 seg)
document.cookie = "tema=oscuro; max-age=3600; path=/; SameSite=Lax";
// Borrar (fecha en el pasado)
document.cookie = "tema=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

// ================= REGLAS DE ORO Y SEGURIDAD =================
// 1. NUNCA guardar contraseñas, tokens JWT sensibles o datos bancarios en Web Storage (vulnerable a XSS).
// 2. Para autenticación segura usar Cookies con flags: HttpOnly; Secure; SameSite=Strict.
// 3. Depuración: F12 -> Pestaña "Application" (Chrome/Edge) o "Storage" (Firefox).
// 4. Proteger JSON.parse() con try...catch si los datos pueden estar corruptos.
```

---

## Parte 3: Pruebas y Ejercicios Prácticos

### Test Rápido de Autoevaluación

1. **¿Qué ocurre si abres la misma página web en dos pestañas distintas y guardas un dato en `sessionStorage` en la primera?**
   * a) La segunda pestaña lo lee automáticamente.
   * b) La segunda pestaña tiene su propio `sessionStorage` independiente y devuelve `null`.
   * c) Se guarda en el servidor HTTP.

2. **¿Qué valor se almacena si ejecutas `localStorage.setItem('lista', [1, 2, 3])` sin usar `JSON.stringify()`?**
   * a) Un Array real `[1, 2, 3]`.
   * b) El string `"1,2,3"` (resultado de `.toString()`).
   * c) Lanza un `TypeError`.

3. **¿Cuál es la forma correcta de eliminar una cookie desde JavaScript?**
   * a) `document.cookie.remove('nombre')`
   * b) `delete document.cookie['nombre']`
   * c) Sobrescribirla asignando una fecha de expiración en el pasado (`Thu, 01 Jan 1970 00:00:00 UTC`).

4. **¿Por qué no debemos guardar tokens de sesión críticos en `localStorage`?**
   * a) Porque caducan a los 5 minutos.
   * b) Porque cualquier script malicioso inyectado mediante un ataque XSS puede leer todo el `localStorage`.
   * c) Porque solo admite $4\text{ KB}$ de tamaño.

5. **¿Qué devuelve `localStorage.getItem('claveInexistente')`?**
   * a) `undefined`
   * b) `false`
   * c) `null`

*(Respuestas del test: 1-b, 2-b, 3-c, 4-b, 5-c)*

---

### Ejercicios Prácticos Propuestos

#### Ejercicio 1: Contador de Visitas por Pestaña vs. Global
Crea un script que muestre en consola:
1. Cuántas veces has recargado **la pestaña actual** (`sessionStorage`).
2. Cuántas veces has entrado a la web **en total desde este navegador** (`localStorage`).

<details>
<summary><strong>Ver Solución Ejercicio 1</strong></summary>

```javascript
// Visitas en la pestaña (sessionStorage)
let visitasPestana = Number(sessionStorage.getItem('visitasTab')) || 0;
visitasPestana++;
sessionStorage.setItem('visitasTab', visitasPestana);

// Visitas totales (localStorage)
let visitasTotales = Number(localStorage.getItem('visitasGlobal')) || 0;
visitasTotales++;
localStorage.setItem('visitasGlobal', visitasTotales);

console.log(`Recargas en esta pestaña: ${visitasPestana}`);
console.log(`Visitas históricas totales: ${visitasTotales}`);
```
</details>

---

#### Ejercicio 2: Autoguardado de Borrador de Formulario
Tienes un `<textarea id="comentario"></textarea>` y un botón `<button id="enviar">Enviar</button>`.
* Cada vez que el usuario escriba (`input`), guarda el borrador en `sessionStorage` para que no lo pierda si recarga accidentalmente la página.
* Al cargar la página, si existe un borrador guardado, rellena el `<textarea>`.
* Al pulsar el botón Enviar, borra el borrador de `sessionStorage` y limpia el campo.

<details>
<summary><strong>Ver Solución Ejercicio 2</strong></summary>

```javascript
const txtComentario = document.querySelector('#comentario');
const btnEnviar = document.querySelector('#enviar');

// 1. Restaurar borrador al cargar
window.addEventListener('DOMContentLoaded', () => {
    const borrador = sessionStorage.getItem('borradorComentario');
    if (borrador !== null) {
        txtComentario.value = borrador;
    }
});

// 2. Guardar en tiempo real mientras escribe
txtComentario.addEventListener('input', () => {
    sessionStorage.setItem('borradorComentario', txtComentario.value);
});

// 3. Limpiar al enviar
btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('borradorComentario');
    txtComentario.value = '';
    alert('Comentario enviado y borrador eliminado.');
});
```
</details>

---

#### Ejercicio 3: Gestor de Tareas Persistente con Lectura Segura (`try...catch`)
Crea una función `guardarTarea(titulo, completada)` que almacene objetos `{ id, titulo, completada }` dentro de un array llamado `'tareas'` en `localStorage`. Incluye una función `obtenerTareas()` protegida con `try...catch` por si alguien manipula manualmente el JSON desde las DevTools y lo corrompe.

<details>
<summary><strong>Ver Solución Ejercicio 3</strong></summary>

```javascript
function obtenerTareas() {
    try {
        const datos = localStorage.getItem('tareas');
        return datos ? JSON.parse(datos) : [];
    } catch (error) {
        console.error('Error al parsear JSON de localStorage. Reiniciando lista...', error);
        localStorage.removeItem('tareas');
        return [];
    }
}

function guardarTarea(titulo, completada = false) {
    const tareas = obtenerTareas();
    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        completada: completada
    };
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Prueba
guardarTarea('Repasar Cookies y Web Storage', true);
guardarTarea('Hacer ejercicios de DWEC', false);
console.log(obtenerTareas());
```
</details>