# 2º DAW · Desarrollo Web en Entorno Cliente

# Proyecto Final Entregable y Rúbrica de Evaluación

## Ampliación Profesional del Gestor de Incidencias: Axios, Seguridad JWT, Concurrencia y Patrones UX

**Objetivo de la práctica:** Partiendo del proyecto base Gestor de
Incidencias entregado en clase, deberás evolucionar la aplicación
manteniendo estrictamente la arquitectura modular (`src/services/`,
`src/ui/` y `src/main.js`) sobre Módulos ES nativos. Queda prohibido el
uso de código legado (`XMLHttpRequest` o jQuery) y cualquier referencia
al DOM dentro de la capa de servicios.

## 1. Requisitos Funcionales Obligatorios

### 01. Migración a Axios e Interceptores de Seguridad

-   Sustituye las peticiones `fetch` de `incidenciasService.js` por una
    instancia centralizada de Axios (`src/services/api.js`) configurada
    con:
    -   `baseURL: 'http://localhost:3000'`
    -   `timeout: 5000`
-   Configura un interceptor de petición que lea el token guardado en
    `sessionStorage` o `localStorage` e inyecte automáticamente la
    cabecera `Authorization: Bearer <token>` en todas las llamadas
    salientes.
-   Configura un interceptor de respuesta que capture errores con estado
    `401 Unauthorized`, elimine el token almacenado y redirija al
    usuario a una pantalla simulada `login.html`.

### 02. Filtrado Combinado y Búsqueda Inteligente

-   Implementa selectores de filtrado por:
    -   **Estado:** Todas, abierta, cerrada.
    -   **Categoría:** Hardware, Software, Red.
-   Pasa los parámetros de consulta de forma limpia mediante `params` de
    Axios o `URLSearchParams`.
-   Mantén activo el buscador en tiempo real protegido mediante
    **Debounce (350 ms)** y cancelación de peticiones anteriores en
    vuelo con `AbortController`.

### 03. Actualización Parcial (PATCH) y Optimistic UI

-   Permite cambiar la prioridad (Baja, Media, Alta) o destacar una
    incidencia directamente desde su tarjeta enviando una petición
    `PATCH` al servidor.
-   Aplica el patrón **Optimistic UI**:
    -   Actualiza el cambio visual en el DOM de forma instantánea al
        pulsar.
    -   Realiza un *rollback* (revirtiendo al estado previo y avisando
        al usuario) si la petición falla.

### 04. Métricas en Paralelo y Exportación Dinámica con Blob

-   Añade en la cabecera un panel de métricas (**Total**, **Abiertas**,
    **Cerradas** y estado de un segundo endpoint opcional) cargado en
    paralelo mediante `Promise.allSettled()`, garantizando que el
    listado principal funcione aunque falle el servicio secundario.
-   Incorpora un botón **«Exportar informe»** que genere un archivo
    local (`.csv` o `.json`) con las incidencias filtradas utilizando:
    -   `Blob`
    -   `URL.createObjectURL()`
    -   Posterior liberación de memoria con `URL.revokeObjectURL()`.

### 05. Gestión Completa de los 4 Estados de Vista

La interfaz debe gestionar y mostrar visualmente los cuatro estados
obligatorios:

-   **Loading:** skeletons o indicador de carga.
-   **Success.**
-   **Empty:** cuando un filtro o búsqueda no devuelva resultados.
-   **Error:** con botón de reintento operativo al detener
    `json-server`.

## 2. Formato y Condiciones de Entrega

-   **Código fuente:** Enlace a repositorio Git o archivo comprimido
    `.zip` (sin carpeta `node_modules`) que incluya:
    -   `index.html`
    -   `login.html`
    -   `db.json`
    -   La carpeta `src/` completa.
-   **Evidencia de depuración (DevTools):** Adjunta dos capturas de la
    pestaña **Network** (con el filtro **Fetch/XHR** activo):
    1.  Una mostrando la cabecera `Authorization: Bearer` enviada en una
        petición.
    2.  Otra mostrando una petición cancelada (`canceled`) al escribir
        rápido en el buscador.

## 3. Rúbrica de Evaluación (10 Puntos)

  ---------------------------------------------------------------------------------------
  Criterio                          Peso Nivel excelente (100   Nivel insuficiente /
  evaluable                              %)                     mejorable
  ---------------- --------------------- ---------------------- -------------------------
  **Arquitectura                 2,0 pts Separación estricta    Mezcla lógica de red con
  Modular (Módulos                       entre `services/`,     manipulación HTML en el
  ES)**                                  `ui/` y `main.js`.     mismo archivo o utiliza
                                         Cero referencias al    variables globales sin
                                         DOM en los servicios y modularizar.
                                         cero código legado     
                                         (XHR/jQuery).          

  **Axios,                       2,5 pts Instancia centralizada Repite URLs manualmente
  Instancias e                           con `baseURL` y        en cada llamada, añade
  Interceptores                          `timeout`. Inyección   cabeceras a mano en cada
  JWT**                                  automática de          método o no controla
                                         `Bearer token` y       sesiones caducadas.
                                         control global de      
                                         respuestas `401`.      

  **Asincronía                   2,5 pts Combinación funcional  Sufre *race conditions*
  Avanzada y                             de `Debounce` +        al buscar rápido, usa
  Concurrencia**                         `AbortController`,     `Promise.all` rompiendo
                                         carga tolerante a      toda la vista ante un
                                         fallos con             fallo parcial o no revoca
                                         `Promise.allSettled` y la URL del Blob.
                                         descarga con `Blob`    
                                         liberando memoria.     

  **Patrones UX y                2,0 pts Implementa los 4       La interfaz queda en
  Gestión de                             estados visuales       blanco cuando no hay
  Errores**                              (`Loading`, `Success`, resultados, no revierte
                                         `Empty`, `Error`),     cambios fallidos o asigna
                                         delegación de eventos  listeners individuales
                                         en el grid y           por tarjeta.
                                         `Optimistic UI` con    
                                         *rollback* real.       

  **Calidad de                    1,0 pt Uso limpio de          Promesas sin capturar
  Código y                               `async/await`, consola (`Uncaught in promise`)
  Depuración**                           libre de errores no    en consola o ausencia de
                                         capturados y capturas  evidencias de depuración
                                         de `Network`           en DevTools.
                                         verificando cabeceras  
                                         y cancelaciones.       

  **CALIFICACIÓN            **10,0 pts** **Para superar la      
  TOTAL**                                práctica es            
                                         obligatorio entregar   
                                         el código funcional y  
                                         alcanzar al menos 5,0  
                                         puntos sin criterios   
                                         en blanco.**           
  ---------------------------------------------------------------------------------------

------------------------------------------------------------------------

*2º DAW · DWEC --- Proyecto Final Entregable y Rúbrica*
