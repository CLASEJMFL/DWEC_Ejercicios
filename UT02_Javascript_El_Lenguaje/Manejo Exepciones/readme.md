# JavaScript: Manejo de excepciones

Este documento contiene el resumen de 10 ejercicios sobre el manejo de errores y excepciones en JavaScript.

## 1. Capturar una excepción con try-catch
- `try`: contiene el código que puede producir un error.
- `catch`: captura el error si se produce.
- `error.message`: muestra el mensaje del error.

## 2. Utilizar try-catch-finally
- `try`: ejecuta el código.
- `catch`: captura posibles errores.
- `finally`: se ejecuta siempre, tanto si hay error como si no.

## 3. Lanzar una excepción genérica
- Utilizamos `throw` para lanzar una excepción.
- Utilizamos `new Error()` para crear un error.

Ejemplo:

```javascript
throw new Error("Ha ocurrido un error");
```

## 4. Crear una excepción personalizada
- Creamos una clase que hereda de `Error`.
- Utilizamos `extends Error`.
- Utilizamos `super()` para establecer el mensaje.
- Podemos personalizar el nombre del error.

## 5. Lanzar una excepción personalizada
- Creamos una instancia de nuestra excepción.
- Utilizamos `throw` para lanzarla.
- Podemos capturarla utilizando `catch`.

## 6. Lanzar varias excepciones según una lógica
- Utilizamos condiciones `if` para comprobar diferentes situaciones.
- Podemos lanzar distintos tipos de errores:
  - `TypeError`: cuando un valor tiene un tipo incorrecto.
  - `RangeError`: cuando un valor está fuera del rango permitido.
  - `Error`: para errores generales.

## 7. Capturar varias excepciones en un mismo try-catch
- Utilizamos un único bloque `try-catch`.
- Utilizamos `instanceof` para comprobar el tipo de error.
- Dependiendo del error, ejecutamos un mensaje diferente.

## 8. Convertir valores a float y capturar errores
- Utilizamos `parseFloat()` para convertir valores a números decimales.
- Utilizamos `for...of` para recorrer el array.
- Utilizamos `Number.isNaN()` para comprobar si la conversión ha fallado.
- Lanzamos un error cuando el valor no se puede convertir.
- Capturamos cada error sin detener el resto del bucle.

## 9. Comprobar si un objeto tiene una propiedad
- Creamos una excepción personalizada.
- Utilizamos `Object.hasOwn()` para comprobar si una propiedad pertenece directamente al objeto.
- Si no existe, lanzamos nuestra excepción personalizada.

Ejemplo:

```javascript
Object.hasOwn(persona, "nombre");
```

## 10. Realizar reintentos hasta un máximo de 10
- Creamos una función que recibe otra función como parámetro.
- Utilizamos un bucle `for` para realizar los intentos.
- Si la operación falla, capturamos el error y volvemos a intentarlo.
- Si funciona, utilizamos `return` para devolver el resultado.
- Si se agotan los intentos, lanzamos una excepción.

---

# Conceptos importantes

| Concepto | Función |
|---|---|
| `try` | Ejecuta código que puede producir errores. |
| `catch` | Captura las excepciones. |
| `finally` | Se ejecuta siempre al terminar el try-catch. |
| `throw` | Lanza una excepción. |
| `new Error()` | Crea un error genérico. |
| `extends Error` | Permite crear errores personalizados. |
| `super()` | Llama al constructor de la clase padre. |
| `error.message` | Obtiene el mensaje del error. |
| `error.name` | Obtiene el nombre del error. |
| `instanceof` | Comprueba si un objeto pertenece a una clase. |
| `TypeError` | Error relacionado con el tipo de dato. |
| `RangeError` | Error relacionado con un valor fuera de rango. |
| `parseFloat()` | Convierte un valor en un número decimal. |
| `Number.isNaN()` | Comprueba si un valor es NaN. |
| `Object.hasOwn()` | Comprueba si un objeto tiene una propiedad propia. |
| `for` | Permite repetir instrucciones. |

---

# Diferencias importantes

### try y catch
- `try` contiene el código que puede fallar.
- `catch` captura el error producido.

### finally
- Se ejecuta siempre al salir del bloque try-catch.
- Se utiliza habitualmente para realizar tareas de limpieza.

### throw y Error
- `Error` crea un objeto de error.
- `throw` lanza ese error.

### Errores genéricos y personalizados
- Los errores genéricos utilizan `new Error()`.
- Los personalizados se crean mediante clases que heredan de `Error`.

### Reintentos
- Permiten volver a ejecutar una operación cuando falla.
- Se pueden controlar mediante un bucle y un número máximo de intentos.

---

# Conclusión

El manejo de excepciones permite controlar los errores que pueden producirse durante la ejecución de un programa.

Gracias a `try`, `catch`, `finally` y `throw`, podemos evitar que un error detenga inesperadamente nuestra aplicación.

Además, las excepciones personalizadas permiten crear errores específicos y los reintentos ayudan a gestionar operaciones que pueden fallar temporalmente.