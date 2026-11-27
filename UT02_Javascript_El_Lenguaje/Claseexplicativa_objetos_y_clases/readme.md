# JavaScript: Clases y Objetos

Este documento contiene el resumen de 20 ejercicios de JavaScript divididos en dos bloques:

1. Clases y programación orientada a objetos.
2. Objetos y sus propiedades.

---

# PARTE 1. CLASES

## 1. Crear una clase con dos propiedades
- Utilizamos `class` para crear una clase.
- Utilizamos `constructor()` para inicializar sus propiedades.
- `this` hace referencia al objeto actual.

## 2. Añadir un método a la clase
- Un método es una función que pertenece a una clase.
- Puede utilizar las propiedades del objeto mediante `this`.

## 3. Mostrar las propiedades e invocar un método
- Utilizamos `new` para crear un objeto a partir de una clase.
- Accedemos a sus propiedades con el punto (`.`).
- Invocamos sus métodos utilizando paréntesis `()`.

## 4. Añadir un método estático
- Utilizamos la palabra `static`.
- Un método estático pertenece a la clase y no al objeto.
- No necesitamos crear un objeto para utilizarlo.

## 5. Utilizar el método estático
- Se llama directamente desde el nombre de la clase.

Ejemplo:

```javascript
Persona.saludar();
```

## 6. Crear una clase con herencia
- Utilizamos `extends` para heredar de otra clase.
- La clase hija recibe las propiedades y métodos de la clase padre.
- Utilizamos `super()` para llamar al constructor de la clase padre.

## 7. Utilizar getters y setters
- `get` permite obtener el valor de una propiedad.
- `set` permite modificar el valor de una propiedad.
- Se utilizan como si fueran propiedades normales.

## 8. Utilizar propiedades privadas
- Las propiedades privadas comienzan con `#`.
- Solo pueden utilizarse desde dentro de la propia clase.
- Permiten proteger los datos internos del objeto.

## 9. Utilizar getters y setters
- Accedemos al getter utilizando el nombre de la propiedad.
- Modificamos el valor utilizando el setter.

Ejemplo:

```javascript
producto.precio = 950;
console.log(producto.precio);
```

## 10. Sobrescribir un método
- Una clase hija puede modificar un método heredado de la clase padre.
- Basta con declarar otro método con el mismo nombre.
- Esto se conoce como sobrescritura de métodos (*overriding*).

---

# PARTE 2. OBJETOS

## 1. Crear un objeto con tres propiedades
- Utilizamos llaves `{}` para crear un objeto.
- Cada propiedad tiene un nombre y un valor.
- Las propiedades se separan mediante comas.

## 2. Acceder a las propiedades
- Utilizamos el punto (`.`) para acceder a una propiedad.
- También podemos utilizar corchetes `[]`.

Ejemplo:

```javascript
coche.marca;
coche["marca"];
```

## 3. Agregar una nueva propiedad
- Podemos añadir propiedades después de crear el objeto.
- Utilizamos el nombre del objeto seguido de un punto.

Ejemplo:

```javascript
coche.año = 2024;
```

## 4. Eliminar una propiedad
- Utilizamos `delete`.
- Indicamos el objeto y la propiedad que queremos eliminar.

Ejemplo:

```javascript
delete coche.color;
```

## 5. Agregar una función e invocarla
- Los objetos pueden contener funciones.
- Cuando una función pertenece a un objeto se llama método.
- Podemos utilizar `this` para acceder a las propiedades del propio objeto.

## 6. Iterar las propiedades de un objeto
- Utilizamos `for...in`.
- Permite recorrer las propiedades enumerables de un objeto.
- Accedemos a cada valor utilizando `objeto[propiedad]`.

## 7. Crear un objeto anidado
- Un objeto puede contener otros objetos como propiedades.
- Esto permite organizar información relacionada.

## 8. Acceder a propiedades anidadas
- Utilizamos varios puntos para acceder a propiedades internas.

Ejemplo:

```javascript
usuario.direccion.ciudad;
```

## 9. Comprobar si dos objetos son iguales
- Utilizamos `===` para comparar referencias.
- Dos objetos diferentes no son iguales aunque tengan las mismas propiedades y valores.
- Para comparar su contenido necesitamos realizar una comparación más profunda.

## 10. Comparar dos propiedades
- Utilizamos `===` para comprobar si dos valores son iguales.
- Podemos comparar propiedades de un mismo objeto o de objetos diferentes.

---

# CONCEPTOS IMPORTANTES

| Concepto | Función |
|---|---|
| `class` | Crea una clase. |
| `constructor()` | Inicializa un objeto. |
| `this` | Hace referencia al objeto actual. |
| `new` | Crea una instancia de una clase. |
| `static` | Declara un método estático. |
| `extends` | Permite heredar de otra clase. |
| `super()` | Llama al constructor de la clase padre. |
| `get` | Obtiene el valor de una propiedad. |
| `set` | Modifica el valor de una propiedad. |
| `#` | Declara una propiedad privada. |
| `return` | Devuelve un resultado. |
| `{}` | Permite crear objetos. |
| `.` | Accede a las propiedades y métodos. |
| `delete` | Elimina una propiedad. |
| `for...in` | Recorre las propiedades de un objeto. |
| `===` | Comprueba igualdad estricta. |

---

# DIFERENCIAS IMPORTANTES

### Clase y objeto
- Una clase es una plantilla para crear objetos.
- Un objeto es una instancia que contiene propiedades y métodos.

### Método estático y método normal
- Un método normal se utiliza desde una instancia.
- Un método estático se utiliza directamente desde la clase.

### Getters y setters
- `get` sirve para leer una propiedad.
- `set` sirve para modificar una propiedad.

### Herencia
- Permite reutilizar código de una clase padre en una clase hija.
- `extends` establece la herencia.
- `super()` permite acceder al constructor de la clase padre.

### Objetos
- Almacenan información mediante propiedades.
- Pueden contener otros objetos.
- También pueden contener funciones.

---

# CONCLUSIÓN

Las clases permiten organizar el código mediante plantillas, objetos y programación orientada a objetos.

Los objetos permiten almacenar información mediante propiedades y métodos.

La herencia facilita reutilizar código, mientras que los getters, setters y propiedades privadas permiten controlar el acceso a los datos.

Estos conceptos son fundamentales para trabajar con JavaScript y desarrollar aplicaciones más organizadas y reutilizables.