let name: string = "akshay";
let age: number = 22;
let isMarried: boolean = false;
let nullVariable: null = null;
let undefinedVariable: undefined = undefined;
let symbol: symbol = Symbol("X")
let bigIntNumber: bigint = 121231231313142n;

// unknown - datatype is unknown and can be assigned data dynamically
let unknownVariable: unknown = "akshay"
unknownVariable = 12
console.log(typeof unknownVariable)


// void - function without return statements are giving out void
function print(a:string) {
    console.log(a)
}
let voidValue: void = print("a")

let objectValue: { a: number, b: string } = {
    a: 12,
    b:"akshay"
}

console.log(typeof objectValue)


let arrayValue: number[] = [1, 2, 3, 4];
let tupleValue: [number ,boolean,string] = [1,false,"akshay"]


// never - functions that never returns a value
//          but throws an exception or error and terminates.
let neverValue: never = (() => { throw new Error("this is an error") })()


// any
let anyValue: any = 'akshay'

let anyValueBetter: string| number = 12