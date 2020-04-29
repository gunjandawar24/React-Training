class Animal {
    constructor(name, height) {
        this.name = name;
        this.height = height;
    }

    hello() {
        console.log(`Hi I am ${this.name} from animal class`);
    }

    static sound() {
        return "Wohooooooo";
    }
}


class Lion extends Animal {
    constructor(name, height, fur) {
        super(name, height);
        this.fur = fur;
    }
    hello() {
        console.log(`Hi I am ${this.name} from Lion class`);
    }
    static sound() {
        return "Wohooooo Lion"
    }
}


class Tiger extends Lion {
    constructor(name, height, fur, color) {
        super(name, height, fur)
        this.color = color;
    }
    hello() {

        console.log(`Hi I am ${this.name} from tiger class`);
    }
    static colour() {
        return "Yellow";
    }
}


let king = new Animal("Animal", 6.5);
console.log(king);
king.hello();
console.log("---------------------------------------------------");

let lion = new Lion("Lion", 5.5, "White fur");
console.log(lion);
lion.hello();
console.log("---------------------------------------------------");

let tiger = new Tiger("Tiger", 7.6, "Yellow fur", "Yellow-Black");
console.log(tiger);
tiger.hello();
console.log("---------------------------------------------------");

let staticMethod = Tiger.colour();
console.log(staticMethod);
let staticMethodLion = Lion.sound();
console.log(staticMethodLion);
let staticMethodAnimal = Animal.sound();
console.log(staticMethodAnimal);




export {
    king,
    lion,
    tiger,
    staticMethod,
    staticMethodLion,
    staticMethodAnimal
};
