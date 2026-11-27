
// ==========================================
// CLASES EN JAVASCRIPT
// ==========================================


// 1. Crea una clase que reciba dos propiedades

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }


    // 2. Añade un método que utilice las propiedades

    presentarse() {
        return "Hola, soy " + this.nombre + " y tengo " + this.edad + " años";
    }


    // 4. Añade un método estático

    static saludar() {
        return "Hola, bienvenido a mi programa";
    }
}


// 3. Muestra los valores de las propiedades e invoca al método

let persona1 = new Persona("Carlos", 25);

console.log("1-3. Nombre:", persona1.nombre);
console.log("1-3. Edad:", persona1.edad);
console.log("1-3. Presentación:", persona1.presentarse());


// 5. Haz uso del método estático

console.log("5. Método estático:", Persona.saludar());


// ==========================================
// HERENCIA
// ==========================================


// 6. Crea una clase que haga uso de herencia

class Estudiante extends Persona {
    constructor(nombre, edad, curso) {
        super(nombre, edad);
        this.curso = curso;
    }

    estudiar() {
        return this.nombre + " está estudiando " + this.curso;
    }


    // 10. Sobrescribe un método de la clase padre

    presentarse() {
        return "Soy " + this.nombre + ", tengo " + this.edad +
               " años y estudio " + this.curso;
    }
}

let estudiante1 = new Estudiante("Ana", 20, "JavaScript");

console.log("6. Herencia:", estudiante1.estudiar());


// 10. Utiliza el método sobrescrito

console.log("10. Método sobrescrito:", estudiante1.presentarse());


// ==========================================
// GETTERS, SETTERS Y PROPIEDADES PRIVADAS
// ==========================================


// 7. Crea una clase que utilice getters y setters
// 8. Modifica la clase para usar propiedades privadas

class Producto {
    #precio;

    constructor(nombre, precio) {
        this.nombre = nombre;
        this.#precio = precio;
    }

    get precio() {
        return this.#precio;
    }

    set precio(nuevoPrecio) {
        if (nuevoPrecio >= 0) {
            this.#precio = nuevoPrecio;
        } else {
            console.log("El precio no puede ser negativo");
        }
    }
}


// 9. Utiliza los get y set y muestra sus valores

let producto1 = new Producto("Ordenador", 800);

console.log("9. Precio inicial:", producto1.precio);

producto1.precio = 950;

console.log("9. Precio modificado:", producto1.precio);