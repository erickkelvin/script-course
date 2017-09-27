// Tarefa 3.2: Polimorfismo
// Autor: Erick Kelvin

class Animal {
    talk () {
        return "?";
    }
}

class Dog extends Animal {
    talk () {
        return "Woof woof!";
    }
}

let testAnimal = new Animal();
let testDog = new Dog();

console.log(testAnimal.talk());
console.log(testDog.talk());