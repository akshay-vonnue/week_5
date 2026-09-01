function greet(a) {
    console.log(a);
}
let a = "Hello";
// greet(a)
let b = "Hi";
greet(b);
const c = "Waassssup";
greet(c);
function concatOrAdd(a) {
    if (typeof a === 'string') {
        return 'hello ' + a;
    }
    a += 10;
    return a;
}
console.log(concatOrAdd("akshay"));
console.log(concatOrAdd(10));
// export {};
