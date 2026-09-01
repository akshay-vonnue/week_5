// import fs from "node:fs";

// const data = fs.readFileSync("hello.txt", "utf8");

// data.toLocaleLowerCase()

import { add, greet, isMultipleOfTwo } from 'experiment';

const message = greet('akshay')
const sum = add(1, 2)
const isMultiple = isMultipleOfTwo(32)

console.log(message)
console.log(sum)
console.log(isMultiple)

const palette = {
    primary:'#0D9488'
} satisfies Record<string, string>
// type annotation tell ts what type a variable should have
// satisfies checks if the value against a type while keeping the inferred