# JavaScript: Métodos de Console

Este documento contiene el resumen de 10 ejercicios sobre los diferentes métodos del objeto `console` en JavaScript.

## 1. console.error()
- Muestra un mensaje de error en la consola.
- Se utiliza para identificar problemas durante la ejecución del programa.
- Normalmente aparece en rojo en las herramientas de desarrollo.

Ejemplo:

```javascript
console.error("Ha ocurrido un error");
```

## 2. console.warn()
- Muestra un mensaje de advertencia.
- Se utiliza para avisar de posibles problemas que no necesariamente detienen el programa.
- Normalmente aparece en amarillo.

Ejemplo:

```javascript
console.warn("Debes revisar este dato");
```

## 3. console.info()
- Muestra un mensaje informativo.
- Se utiliza para comunicar información sobre la ejecución del programa.

Ejemplo:

```javascript
console.info("El programa funciona correctamente");
```

## 4. console.table()
- Muestra los datos en formato de tabla.
- Es especialmente útil para visualizar arrays de objetos.
- Facilita la lectura de información organizada.

Ejemplo:

```javascript
console.table(personas);
```

## 5. console.group()
- Agrupa varios mensajes en la consola.
- Utilizamos `console.group()` para comenzar un grupo.
- Utilizamos `console.groupEnd()` para finalizarlo.
- Permite organizar mejor los mensajes.

Ejemplo:

```javascript
console.group("Información");
console.log("Nombre: Carlos");
console.log("Edad: 25");
console.groupEnd();
```

## 6. console.time()
- Permite medir el tiempo que tarda una operación.
- Utilizamos `console.time()` para iniciar el cronómetro.
- Utilizamos `console.timeEnd()` para detenerlo y mostrar el tiempo transcurrido.
- Ambos métodos deben utilizar la misma etiqueta.

Ejemplo:

```javascript
console.time("Tiempo");

console.log("Ejecutando operación");

console.timeEnd("Tiempo");
```

## 7. console.assert()
- Comprueba si una condición es verdadera.
- Si la condición es falsa, muestra un mensaje de error.
- Si es verdadera, no muestra ningún mensaje.

Ejemplo:

```javascript
console.assert(5 > 0, "El número no es positivo");
```

## 8. console.count()
- Cuenta cuántas veces se ejecuta una determinada instrucción.
- Cada contador utiliza una etiqueta.
- Es útil para comprobar cuántas veces se llama a una función.

Ejemplo:

```javascript
console.count("Llamadas");
console.count("Llamadas");
console.count("Llamadas");
```

## 9. console.trace()
- Muestra el seguimiento de llamadas de una función.
- Permite saber desde dónde se ha llamado a una función.
- Es útil para localizar errores y entender el recorrido del programa.

Ejemplo:

```javascript
function ejemplo() {
    console.trace("Seguimiento");
}

ejemplo();
```

## 10. console.clear()
- Limpia el contenido visible de la consola.
- Se utiliza para eliminar los mensajes anteriores.
- Después de ejecutarlo, el programa puede continuar funcionando normalmente.

Ejemplo:

```javascript
console.clear();
```

---

# Conceptos importantes

| Método | Función |
|---|---|
| `console.error()` | Muestra errores. |
| `console.warn()` | Muestra advertencias. |
| `console.info()` | Muestra información. |
| `console.table()` | Muestra datos en forma de tabla. |
| `console.group()` | Comienza un grupo de mensajes. |
| `console.groupEnd()` | Finaliza un grupo de mensajes. |
| `console.time()` | Inicia un cronómetro. |
| `console.timeEnd()` | Finaliza el cronómetro. |
| `console.assert()` | Comprueba una condición. |
| `console.count()` | Cuenta las llamadas. |
| `console.trace()` | Muestra el seguimiento de llamadas. |
| `console.clear()` | Limpia la consola. |

---

# Conclusión

El objeto `console` proporciona diferentes herramientas para depurar y analizar nuestros programas JavaScript.

Podemos mostrar errores, advertencias e información, organizar datos en tablas, medir tiempos de ejecución y realizar un seguimiento de las llamadas a funciones.

Estos métodos son muy útiles durante el desarrollo y la depuración de aplicaciones.