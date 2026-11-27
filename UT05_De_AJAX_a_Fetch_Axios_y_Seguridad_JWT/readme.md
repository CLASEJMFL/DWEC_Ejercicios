# Comunicación Asíncrona Moderna en JavaScript (DWEC)

**Módulo:** Desarrollo Web en Entorno Cliente · **2.º DAW**

## Índice

1. [El pasado: por qué descartamos XHR y jQuery](#1-el-pasado-por-qué-descartamos-xhr-y-jquery)
2. [Arquitectura cliente-servidor y HTTP](#2-arquitectura-cliente-servidor-y-http)
3. [Fetch en profundidad](#3-fetch-en-profundidad)
4. [Axios: el sucesor real de `$.ajax`](#4-axios-el-sucesor-real-de-ajax)
5. [CORS, JWT, refresh tokens y cookies HttpOnly](#5-cors-jwt-refresh-tokens-y-cookies-httponly)
6. [Patrones de interfaz y UX](#6-patrones-de-interfaz-y-ux)
7. [Streaming, SSE y WebSockets](#7-streaming-sse-y-websockets)
8. [Caso práctico: gestor de incidencias](#8-caso-práctico-gestor-de-incidencias)
9. [Requisitos de la práctica evaluable (RA DWEC)](#9-requisitos-de-la-práctica-evaluable-ra-dwec)

---

> Del legado histórico (XHR y jQuery) a **Fetch**, **Axios**, seguridad con **JWT** y patrones de UX en producción.

## 1. El pasado: por qué descartamos XHR y jQuery

XHR y jQuery nacieron para resolver incompatibilidades entre navegadores de hace quince años. El currículo de DWEC exige comunicación asíncrona **moderna**, no sintaxis obsoleta sin uso en empresa.

```js
// XMLHttpRequest: sintaxis verbosa, basada en eventos y estados manuales
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/usuarios', true);
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log(JSON.parse(xhr.responseText));
    }
  }
};
xhr.send();
```

```js
// jQuery $.ajax: dependencia innecesaria (~85 KB) y callbacks clásicos
$.ajax({
  url: '/api/usuarios',
  method: 'GET',
  dataType: 'json',
  success: function (data) { /* ... */ },
  error: function (err) { console.error('Fallo en red', err); }
});
```

| Característica | XHR / jQuery (antiguo) | Fetch / Axios (actual) |
|---|---|---|
| Asincronía | Callbacks y eventos | Promesas y `async/await` |
| Dependencias | Librería externa obligatoria (jQuery) | Nativo en navegador y Node (Fetch) |
| Cancelación | `xhr.abort()` manual | Estándar `AbortController` |
| Uso en empresa | Mantenimiento de código legado | Estándar en React, Vue y Angular |

## 2. Arquitectura cliente-servidor y HTTP

**Ciclo de una petición asíncrona:**

1. **Evento DOM:** el usuario interactúa sin recargar la página.
2. **Request HTTP:** envío en segundo plano con Fetch.
3. **Response JSON:** el backend procesa y devuelve datos puros.
4. **Repintado del DOM:** actualización parcial de la interfaz.

### Verbos HTTP en APIs REST

| Método | Operación CRUD | ¿Lleva body? | Ejemplo de ruta |
|---|---|---|---|
| `GET` | Leer recursos | No | `GET /api/productos` |
| `POST` | Crear recurso | Sí (JSON / FormData) | `POST /api/productos` |
| `PUT` / `PATCH` | Actualizar (total / parcial) | Sí (JSON) | `PATCH /api/productos/5` |
| `DELETE` | Eliminar recurso | Opcional | `DELETE /api/productos/5` |

### Códigos de estado imprescindibles

| Código | Significado |
|---|---|
| `200` / `201` | Éxito / recurso creado |
| `401` / `403` | No autorizado: falta el token JWT o permisos insuficientes |
| `404` / `422` | Error de cliente: ruta inexistente o datos inválidos |
| `500` / `503` | Fallo del servidor: excepción interna en el backend |

### Cabeceras fundamentales

```http
Content-Type: application/json          # formato del cuerpo enviado
Accept: application/json                # qué respuesta espera el cliente
Authorization: Bearer eyJhbGciOiJIUz... # credenciales y tokens de sesión
```

### Depuración: pestaña *Network* de DevTools

- **Filtro Fetch/XHR:** aísla las peticiones API de imágenes y CSS.
- **Headers y Payload:** verifica qué datos salen exactamente del navegador.
- **Preview y Response:** inspecciona los errores JSON del servidor.
- **Throttling (Slow 3G):** simula conexiones móviles lentas.

## 3. Fetch en profundidad

### La trampa clásica: errores HTTP

`fetch()` **solo rechaza la promesa si falla la red o el DNS**. Un 404 o un 500 entra por el `try` sin lanzar error. **Solución obligatoria:** comprobar `response.ok` antes de parsear el JSON.

```js
// Ejemplo 1: validación con response.ok
async function obtenerUsuario(id) {
  try {
    const res = await fetch(`https://api.ejemplo.es/usuarios/${id}`);
    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
    }
    const usuario = await res.json();
    return usuario;
  } catch (error) {
    mostrarAlertaUI(error.message);
  }
}
```

```js
// Ejemplo 2: leer el JSON de error que devuelve el servidor
async function crearPedido(datos) {
  const res = await fetch('/api/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos)
  });
  const payload = await res.json();
  if (!res.ok) {
    throw new Error(payload.mensaje || 'Error al procesar pedido');
  }
  return payload;
}
```

```js
// Ejemplo 3: enviar un formulario como JSON desde el DOM
formRegistro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nuevoAlumno = {
    nombre: e.target.nombre.value.trim(),
    curso: '2DAW'
  };
  const res = await fetch('/api/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoAlumno)
  });
  if (res.ok) actualizarListaAlumnos();
});
```

```js
// Ejemplo 4: actualización parcial con PATCH
async function cambiarEstadoTarea(idTarea, completada) {
  const res = await fetch(`/api/tareas/${idTarea}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completada })
  });
  if (!res.ok) throw new Error('No se pudo actualizar la tarea');
  return await res.json();
}
```

```js
// Ejemplo 5: borrado con 204 No Content
async function eliminarProducto(id) {
  const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error al eliminar');
  // Un 204 no devuelve cuerpo: no llamar a res.json()
  if (res.status === 204) return true;
  return await res.json();
}
```

### Subida de archivos con `FormData`

> **Regla de oro:** nunca definas `Content-Type` manualmente al enviar `FormData`; el navegador añade el `boundary` correcto.

```js
const formData = new FormData();
formData.append('titulo', 'Memoria Proyecto');
formData.append('archivo', inputFile.files[0]);

await fetch('/api/entregas', {
  method: 'POST',
  body: formData            // sin header Content-Type
});
```

```js
// Ejemplo 6: avatar con previsualización y envío
inputAvatar.addEventListener('change', async (e) => {
  const fichero = e.target.files[0];
  if (!fichero) return;

  imgPreview.src = URL.createObjectURL(fichero);   // preview inmediata

  const fd = new FormData();
  fd.append('avatar', fichero);
  const res = await fetch('/api/perfil/avatar', { method: 'POST', body: fd });
  if (res.ok) notificar('Avatar actualizado');
});
```

### Filtros limpios con `URLSearchParams`

```js
// Ejemplo 7
async function buscarCatalogo(filtros) {
  const params = new URLSearchParams({
    categoria: filtros.categoria,
    precioMax: filtros.precioMax,
    pagina: filtros.pagina || 1
  });
  const res = await fetch(`/api/catalogo?${params.toString()}`);
  return await res.json();
}
```

### Cancelación con `AbortController`

- **Problema (*race condition*):** una búsqueda antigua y lenta llega *después* de la reciente y pisa el DOM.
- **Solución:** `AbortController` cancela en red la petición anterior al lanzar una nueva.

```js
// Ejemplo 8: buscador en tiempo real cancelable
let controlador = null;

inputBuscar.addEventListener('input', async (e) => {
  if (controlador) controlador.abort();          // cancela la anterior
  controlador = new AbortController();
  try {
    const res = await fetch(`/api/buscar?q=${e.target.value}`, {
      signal: controlador.signal
    });
    renderResultados(await res.json());
  } catch (err) {
    if (err.name !== 'AbortError') console.error(err);  // el abort es esperado
  }
});
```

```js
// Ejemplo 9: timeout automático con AbortSignal.timeout
async function cargarDatosCriticos() {
  try {
    const res = await fetch('/api/reportes', {
      signal: AbortSignal.timeout(5000)          // aborta tras 5 segundos
    });
    return await res.json();
  } catch (err) {
    if (err.name === 'TimeoutError') {
      mostrarMensaje('El servidor tarda demasiado en responder');
    }
  }
}
```

### Peticiones en paralelo

```js
// Ejemplo 10: Promise.all (si UNA falla, falla todo)
async function cargarPanelPrincipal() {
  const [resPerfil, resNotificaciones] = await Promise.all([
    fetch('/api/perfil'),
    fetch('/api/notificaciones')
  ]);
  const [perfil, notificaciones] = await Promise.all([
    resPerfil.json(),
    resNotificaciones.json()
  ]);
  pintarDashboard(perfil, notificaciones);
}
```

```js
// Ejemplo 11: Promise.allSettled (tolerancia a fallos: cada widget por separado)
async function cargarWidgets() {
  const resultados = await Promise.allSettled([
    fetch('/api/clima').then(r => r.json()),
    fetch('/api/noticias').then(r => r.json())
  ]);
  resultados.forEach((item, idx) => {
    if (item.status === 'fulfilled') renderWidget(idx, item.value);
    else renderWidgetError(idx);
  });
}
```

### Descargas con `Blob` y cliente HTTP propio

```js
// Ejemplo 12: descarga dinámica de un PDF
async function descargarFactura(idFactura) {
  const res = await fetch(`/api/facturas/${idFactura}/pdf`);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `factura-${idFactura}.pdf`;
  enlace.click();

  URL.revokeObjectURL(url);       // libera memoria
}
```

```js
// Ejemplo 13: cliente HTTP propio sobre Fetch
async function apiClient(endpoint, opciones = {}) {
  const res = await fetch(`https://api.miapp.es${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...opciones.headers },
    ...opciones
  });
  if (!res.ok) throw new Error(`Fallo API: ${res.status}`);
  return res.status === 204 ? null : res.json();
}
```

## 4. Axios: el sucesor real de `$.ajax`

| Ventaja frente a Fetch | Descripción |
|---|---|
| **JSON automático** | Serializa peticiones y parsea respuestas, sin doble `await` |
| **Errores 4xx/5xx** | Rechaza la promesa directamente cuando falla el estado HTTP |
| **Interceptores** | Inyecta tokens JWT globalmente antes de cada llamada |

```js
// Ejemplo 14: GET y POST limpios
import axios from 'axios';

// GET con query params automáticos
const { data: cursos } = await axios.get('/api/cursos', {
  params: { familia: 'Informatica', activo: true }
});

// POST con serialización JSON automática
const { data: creado } = await axios.post('/api/cursos', {
  codigo: 'DWEC', horas: 120
});
```

```js
// Ejemplo 15: instancia centralizada (src/services/api.js)
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.instituto.es/v1',
  timeout: 8000,
  headers: { 'Accept': 'application/json' }
});

// Uso en cualquier componente:
const { data } = await api.get('/alumnos');
```

```js
// Ejemplo 16: interceptor de REQUEST para añadir el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));
```

```js
// Ejemplo 17: interceptor de RESPONSE para sesión caducada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login.html';
    }
    return Promise.reject(error);
  }
);
```

```js
// Ejemplo 18: barra de progreso real al subir archivos
await api.post('/videos', formData, {
  onUploadProgress: (eventoProgreso) => {
    const porcentaje = Math.round(
      (eventoProgreso.loaded * 100) / eventoProgreso.total
    );
    barraProgreso.style.width = `${porcentaje}%`;
  }
});
```

```js
// Ejemplo 19: anatomía del error en Axios
try {
  await api.post('/login', credenciales);
} catch (err) {
  if (err.response) {
    // El servidor respondió con código 4xx o 5xx
    mostrarError(err.response.data.error);
  } else if (err.request) {
    // Petición enviada sin respuesta (servidor caído)
    mostrarError('Sin conexión con el servidor');
  }
}
```

## 5. CORS, JWT, refresh tokens y cookies HttpOnly

### ¿Por qué funciona en Postman y falla en el navegador? → CORS

- **Same-Origin Policy:** el navegador bloquea peticiones entre dominios o puertos distintos.
- **Preflight:** el cliente envía antes una petición `OPTIONS` para un `POST`/`PUT` con JSON.
- **Solución en el backend:** el servidor debe devolver `Access-Control-Allow-Origin`.

```http
# Ejemplo 20: cabeceras que debe responder tu API (Node / PHP / Java)
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

### Flujo de autenticación *stateless* con JWT

1. **Login:** el cliente envía usuario y contraseña con `POST /auth/login`.
2. **Firma:** el servidor devuelve un JWT firmado con fecha de expiración.
3. **Peticiones:** el cliente adjunta el token en la cabecera `Bearer` en las rutas protegidas.

```js
// Ejemplo 21: inicio de sesión y guardado del token
async function iniciarSesion(email, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Credenciales incorrectas');
  const { token } = await res.json();
  sessionStorage.setItem('jwt', token);
}
```

```js
// Ejemplo 22: petición autenticada a una ruta privada
async function obtenerExpediente() {
  const token = sessionStorage.getItem('jwt');
  const res = await fetch('/api/mi-expediente', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (res.status === 401) window.location.href = '/login.html';
  return await res.json();
}
```

### ¿Dónde guardar el token?

| `localStorage` / `sessionStorage` | Cookie `HttpOnly` + `Secure` |
|---|---|
| Sencillo para prácticas, pero **accesible desde JavaScript** si existe una vulnerabilidad XSS | **Inaccesible** desde `document.cookie`; requiere `credentials: 'include'` en Fetch |

```js
// Ejemplo 23: envío automático de cookies HttpOnly
async function obtenerPerfilSeguro() {
  const res = await fetch('https://api.miapp.es/perfil', {
    method: 'GET',
    credentials: 'include'        // envía las cookies entre subdominios
  });
  if (!res.ok) throw new Error('Sesión no válida');
  return await res.json();
}
```

```js
// Ejemplo 24: leer rol y expiración del JWT en el cliente
function leerDatosToken(token) {
  const payloadBase64 = token.split('.')[1];           // header.payload.firma
  const datos = JSON.parse(atob(payloadBase64));
  const expirado = Date.now() >= datos.exp * 1000;
  return { rol: datos.rol, expirado };
}
```

> ⚠️ Decodificar el payload en el cliente solo sirve para **mostrar** información (rol, expiración). La validez del token la comprueba siempre el **servidor**.

```js
// Ejemplo 25: renovación silenciosa con refresh token
async function fetchConRefresco(url, opciones = {}) {
  let res = await fetch(url, opciones);
  if (res.status === 401) {
    const refresh = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include'
    });
    if (refresh.ok) {
      res = await fetch(url, opciones);   // reintenta la petición original
    }
  }
  return res;
}
```

## 6. Patrones de interfaz y UX

### Los 4 estados obligatorios de toda vista

1. **Loading:** indicador mientras llega la respuesta.
2. **Success:** renderizado limpio de los datos recibidos.
3. **Empty:** mensaje claro cuando el array viene vacío.
4. **Error:** aviso amigable con botón de reintento.

```js
// Ejemplo 26: renderizado de estados en el DOM
async function cargarListaProductos() {
  contenedor.innerHTML = 'Cargando catálogo...';          // 1. Loading
  try {
    const res = await fetch('/api/productos');
    const lista = await res.json();
    if (lista.length === 0) {
      contenedor.innerHTML = 'No hay productos disponibles.';   // 3. Empty
      return;
    }
    pintarTarjetas(lista);                                // 2. Success
  } catch {
    contenedor.innerHTML = 'Error de conexión. Reintenta.';     // 4. Error
  }
}
```

> Mejora: como ya viste con `innerHTML`, evita meter datos del usuario en él; para texto dinámico usa `textContent`.

### Debounce: ahorrar peticiones

Espera a que el usuario **deje de teclear** antes de lanzar la petición.

```js
// Ejemplo 27
function debounce(fn, espera = 350) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), espera);
  };
}

const buscarConRetraso = debounce((texto) => consultarAPI(texto), 400);
inputBusqueda.addEventListener('input', (e) => buscarConRetraso(e.target.value));
```

```js
// Ejemplo 28: evitar duplicados bloqueando el botón
formPago.addEventListener('submit', async (e) => {
  e.preventDefault();
  btnEnviar.disabled = true;
  btnEnviar.textContent = 'Procesando pago...';
  try {
    await enviarPago();
  } finally {                                  // se ejecuta SIEMPRE
    btnEnviar.disabled = false;
    btnEnviar.textContent = 'Confirmar pago';
  }
});
```

### Optimistic UI

Se actualiza la interfaz **al instante** y se revierte (*rollback*) si el servidor falla.

```js
// Ejemplo 29: botón "Me gusta" instantáneo
async function toggleLike(postId, boton) {
  const estabaActivo = boton.classList.toggle('activo');   // cambio inmediato
  try {
    const res = await fetch(`/api/posts/${postId}/like`, { method: 'POST' });
    if (!res.ok) throw new Error();
  } catch {
    boton.classList.toggle('activo', !estabaActivo);       // rollback si falla
  }
}
```

### Rendimiento y otros patrones

```js
// Ejemplo 30: pintado masivo sin reflows con DocumentFragment
function renderizarTabla(registros) {
  const fragmento = document.createDocumentFragment();
  registros.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.id}</td><td>${item.nombre}</td>`;
    fragmento.appendChild(tr);
  });
  tbody.replaceChildren(fragmento);          // una sola inserción en el DOM
}
```

```js
// Ejemplo 31: delegación de eventos sobre elementos creados con Fetch
listaUsuarios.addEventListener('click', async (e) => {
  const btnBorrar = e.target.closest('[data-accion="borrar"]');
  if (!btnBorrar) return;

  const id = btnBorrar.dataset.id;
  await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
  btnBorrar.closest('li').remove();
});
```

```js
// Ejemplo 32: caché en memoria con Map()
const cache = new Map();

async function fetchConCache(url) {
  if (cache.has(url)) return cache.get(url);
  const res = await fetch(url);
  const datos = await res.json();
  cache.set(url, datos);
  return datos;
}
```

```js
// Ejemplo 33: reintento automático ante fallos temporales
async function fetchConReintentos(url, intentos = 3) {
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (err) {
      if (i === intentos - 1) throw err;       // último intento: propagar el error
    }
    await new Promise(r => setTimeout(r, 500 * (i + 1)));   // espera creciente
  }
}
```

```js
// Ejemplo 34: paginación infinita con IntersectionObserver
let pagina = 1;

const observador = new IntersectionObserver(async (entradas) => {
  if (entradas[0].isIntersecting) {
    pagina++;
    const nuevos = await fetch(`/api/posts?page=${pagina}`).then(r => r.json());
    anexarPostsAlDOM(nuevos);
  }
});
observador.observe(document.querySelector('#centinela-scroll'));
```

## 7. Streaming, SSE y WebSockets

| Tecnología | Dirección | Caso de uso ideal |
|---|---|---|
| **Fetch / Axios** | Cliente pregunta → Servidor responde | APIs REST, formularios, CRUD estándar |
| **SSE** (`EventSource`) | Servidor envía → Cliente escucha | Notificaciones, marcadores en vivo, IA |
| **WebSockets** | Bidireccional simultáneo | Chats, edición colaborativa, juegos |

```js
// Ejemplo 35: leer una respuesta por trozos (ReadableStream)
const res = await fetch('/api/generar-texto');
const reader = res.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  salidaDOM.textContent += decoder.decode(value);
}
```

```js
// Ejemplo 36: suscripción a eventos del servidor con SSE
const eventos = new EventSource('/api/notificaciones-stream');

eventos.onmessage = (evento) => {
  const alerta = JSON.parse(evento.data);
  mostrarNotificacionToast(alerta.titulo);
};
eventos.onerror = () => eventos.close();
```

```js
// Ejemplo 37: chat bidireccional con WebSocket nativo
const socket = new WebSocket('wss://chat.miapp.es');

socket.addEventListener('message', (e) => {
  const msg = JSON.parse(e.data);
  anadirMensajeAlChat(msg.autor, msg.texto);
});

btnEnviar.onclick = () => socket.send(JSON.stringify({ texto: input.value }));
```

## 8. Caso práctico: gestor de incidencias

**Separación de responsabilidades con módulos ES:**

```
/services
 └── incidenciasService.js   → solo peticiones Fetch/Axios (cero referencias al DOM)
/ui
 └── renderIncidencias.js    → recibe datos puros y manipula el HTML
main.js                      → conecta eventos del usuario con servicios y vistas
```

```js
// Ejemplo 38: capa de servicio (services/incidenciasService.js)
const BASE_URL = 'http://localhost:3000/api/incidencias';

export const IncidenciasService = {
  async listar(signal) {
    const res = await fetch(BASE_URL, { signal });
    if (!res.ok) throw new Error('Error al cargar incidencias');
    return res.json();
  },
  async crear(formData) {
    const res = await fetch(BASE_URL, { method: 'POST', body: formData });
    if (!res.ok) throw new Error('Error al registrar incidencia');
    return res.json();
  }
};
```

```js
// Ejemplo 39: capa de vista (ui/renderIncidencias.js)
// (la diapositiva original muestra el contenido de la plantilla sin las etiquetas HTML;
//  aquí se reconstruye con <li> y un botón como ejemplo)
export function pintarIncidencias(contenedor, lista) {
  if (!lista.length) {
    contenedor.innerHTML = 'Sin incidencias activas';
    return;
  }
  contenedor.innerHTML = lista.map(inc => `
    <li>
      <span>${inc.titulo}</span>
      <button data-accion="cerrar" data-id="${inc.id}">Cerrar</button>
    </li>
  `).join('');
}
```

```js
// Ejemplo 40: orquestación (main.js)
import { IncidenciasService } from './services/incidenciasService.js';
import { pintarIncidencias } from './ui/renderIncidencias.js';

async function iniciarApp() {
  const datos = await IncidenciasService.listar();
  pintarIncidencias(document.querySelector('#grid'), datos);
}
iniciarApp();
```

### Mock API instantánea con Node

Permite probar `GET`, `POST`, `PATCH` y `DELETE` reales sin esperar a tener terminado el backend de DWES:

```bash
npx json-server --watch db.json --port 3000
```

## 9. Requisitos de la práctica evaluable (RA DWEC)

1. **CRUD completo:** consumo de una API REST con módulos ES separados.
2. **Buscador inteligente:** *debounce* + `AbortController` (obligatorio).
3. **Subida de archivos:** envío real mediante `FormData`.
4. **Gestión de errores:** estados *Loading*, *Empty* y *Error* sin romper la interfaz.

**Checklist de calidad antes de entregar**

- **Cero legado:** sin XHR ni jQuery en el proyecto.
- **Control de red:** validar `response.ok` y usar `try/catch` siempre.
- **Preparados para SPA:** base lista para React, Vue o Angular.

---

## Chuleta final

| Tema | Idea clave |
|---|---|
| **Legado** | XHR y jQuery solo para mantener código antiguo; hoy Fetch / Axios |
| **Fetch** | No rechaza en 404/500: comprobar siempre `res.ok` |
| **Axios** | JSON automático, rechaza 4xx/5xx e incluye interceptores (token JWT) |
| **Cancelación** | `AbortController` / `AbortSignal.timeout()`; con *debounce* en buscadores |
| **FormData** | Nunca fijar `Content-Type` a mano al subir archivos |
| **CORS** | Lo resuelve el **servidor** con `Access-Control-Allow-Origin` |
| **JWT** | `Authorization: Bearer …`; mejor en cookie `HttpOnly` + `Secure` que en Web Storage |
| **UX** | 4 estados (Loading/Success/Empty/Error), optimistic UI, `DocumentFragment` |
| **Tiempo real** | Fetch = petición/respuesta · SSE = servidor→cliente · WebSocket = bidireccional |
| **Arquitectura** | `services/` (red) · `ui/` (DOM) · `main.js` (orquesta) |