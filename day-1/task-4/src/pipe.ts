let double = (x:number) => x * 2
let addOne = (x:number) => x + 1

//############ pipe ############

type Functions = (x:number) => number

let pipe = (...fns:Functions[]) => (val:number) => fns.reduce((prev,fn) => fn(prev),
val);

console.log("pipe:",pipe(double,addOne)(5) === 11) 
console.log("pipe:",pipe(double,addOne)(6) === 13)
console.log("pipe:", pipe(double, addOne)(7) === 15)
console.log("pipe:",pipe(double,addOne)(9) === 19)