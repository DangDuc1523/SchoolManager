export class User {
    name: string = "";
    age: number = 0;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    toString(): string {
        return `${this.name} is ${this.age} years old`;
    }
}
