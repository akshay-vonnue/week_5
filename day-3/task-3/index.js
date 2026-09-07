"use strict";
class Shape {
    describe() {
        console.log(`the area and perimeter of the ${this.constructor.name} is ${this.area()} and ${this.perimeter()}`);
    }
    static create(type, ...args) {
        switch (type) {
            case "Circle":
                return new Circle(args[0]);
            case "Rectangle":
                return new Rectangle(args[0], args[1]);
            case "Triangle":
                return new Triangle(args[0], args[1], args[2], args[3]);
        }
    }
}
// let shape = new Shape();
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    l;
    b;
    constructor(l, b) {
        super();
        this.l = l;
        this.b = b;
    }
    area() {
        return this.l * this.b;
    }
    perimeter() {
        return 2 * (this.l + this.b);
    }
}
class Triangle extends Shape {
    a;
    b;
    c;
    h;
    constructor(a, b, c, h) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        this.h = h;
    }
    perimeter() {
        return this.a + this.b + this.c;
    }
    area() {
        return 0.5 * (this.b * this.h);
    }
}
let circle = Shape.create("Circle", 2);
circle.describe();
let triangle = Shape.create('Triangle', 1, 2, 3, 1);
triangle.describe();
let rectangle = Shape.create('Rectangle', 1, 2);
rectangle.describe();
