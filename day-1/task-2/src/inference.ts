type Greet = "Hello" | "Hi" | "Waassssup"

function greet(a:Greet) {
    console.log(a)
}

let a = "Hello"
// greet(a)

let b:Greet = "Hi"
greet(b)

const c = "Waassssup"
greet(c)


function concatOrAdd(a:string|number) {
    if (typeof a === 'string') {
        return 'hello ' + a
    }
    a += 10
    return a
}

console.log(concatOrAdd("akshay"))
console.log(concatOrAdd(10))