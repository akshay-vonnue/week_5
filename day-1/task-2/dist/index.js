let name = "akshay";
let age = 22;
let isMarried = false;
let nullVariable = null;
let undefinedVariable = undefined;
let symbol = Symbol("X");
let bigIntNumber = 121231231313142n;
// unknown - datatype is unknown and can be assigned data dynamically
let unknownVariable = "akshay";
unknownVariable = 12;
console.log(typeof unknownVariable);
// void - function without return statements are giving out void
function print(a) {
    console.log(a);
}
let voidValue = print("a");
let objectValue = {
    a: 12,
    b: "akshay"
};
console.log(typeof objectValue);
let arrayValue = [1, 2, 3, 4];
let tupleValue = [1, false, "akshay"];
// never - functions that never returns a value
//          but throws an exception or error and terminates.
let neverValue = (() => { throw new Error("this is an error"); })();
// any
let anyValue = 'akshay';
let anyValueBetter = 12;
export {};
