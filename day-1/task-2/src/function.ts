function add(a:number, b:number):number {
    return a+b
}

function ObjectWrapper(a: string, b: string): {a:string,b:string}{
    return {
        a,b
    }
}

function addNumToStr(a: number, b: string): string{
    return a + b
}

function lenOfStr(a: string) {
    return a.length
}

console.log(lenOfStr("akshay"))


function typeOf(para: any) {
    return typeof(para)
}

console.log(typeOf("akshay"))
console.log(typeof(12))