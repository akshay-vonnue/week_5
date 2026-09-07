"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    console.log(`sealing ${constructor.name}`);
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function log(target, propertyKeys, descriptor) {
    let method = descriptor.value;
    descriptor.value = function (data) {
        console.log(`Method ${propertyKeys} has been called`);
        console.log('arguments:', data);
        let returnedDate = method.apply(this, [data]);
        console.log('returned:', returnedDate);
    };
    return descriptor;
}
let User = class User {
    name;
    constructor(name) {
        this.name = name;
    }
    greet(greeting) {
        console.log(`${greeting} ${this.name}`);
        return `${greeting} ${this.name}`;
    }
};
__decorate([
    log
], User.prototype, "greet", null);
User = __decorate([
    sealed
], User);
let user = new User('akshay');
user.greet('hi');
