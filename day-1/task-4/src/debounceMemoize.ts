function debounce(func:(...args:number[])=>void, delay:number) {
    let timeout:number;

    return function (...args:number[]) {
        clearTimeout(timeout)

        timeout = setTimeout(() => {
            func(...args)
        },delay)
    }
}

function sum(...args: number[]) {
    let total = args.reduce((acc: number, arg: number) => acc + arg, 0)
    console.log(total)
}

let debouncedSum = debounce(sum, 1000);
debouncedSum(1,2,3)


function memoize<T>(fn:(a:number,b:number) => T) {
    let cache = new Map()

    return function(a:number,b:number){
        
        const key = JSON.stringify({a,b})
        if(cache.has(key)) return cache.get(key)

        const result = fn(a,b)
        cache.set(key, result);
        return result
    } 
}

function sumFn(a:number, b:number) {
    console.log("memoised:",a + b)
    return a+b
}

let memoizedSum = memoize(sumFn)


console.time("start")
memoizedSum(1, 2)
console.timeEnd("start")

console.time("timer")
memoizedSum(1, 2)
console.timeEnd("timer")