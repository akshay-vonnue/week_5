"use strict";
function greet(name) {
    console.log("hello", name);
    // type error cannot assign number to a type string
    // name = 1
    name = "1";
    console.log(name);
}
greet("world");
