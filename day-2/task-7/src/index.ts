type IsArray<T> = T extends any[] ? true : false

type Nums = IsArray<number[]>

type Flatten<T> = T extends Array<infer item> ? item : T

type a = Flatten<number[]>


// unwraps all the promises in async 
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T

type ofPromise = Awaited<Promise<Promise<number>>>

// Parameters<T>

type Parameter<T> = T extends (...args:infer U) => any ? U : never;

type stringFn = (s: string) => void

declare function f1(args: { name: string, age: number }): string;

type para = Parameter<<T>(arg: T) => T>
type para2 = Parameter<typeof f1>


// Return type

type ReturnType<T> = T extends (...args: any) => infer R ? R : never;

type fnReturn = ReturnType<typeof f1>

type StorageReturn = ReturnType<String>

type returnValue = ReturnType<() => { name: string, age: 12 }>

type User = {
    id:number,
    name: string,
}
function add(name:Partial<User>) {
    
}

// function add(a: number, b: number): number{
//     return a+b
// }

// type val = ReturnType<typeof add>

export { }


// https://freedium-mirror.cfd/https://medium.com/@jsmanifest/typescript-awaited-and-deep-promise-unwrapping-patterns-for-async-type-inference-that-actually-f1bd38ab2971
// https://freedium-mirror.cfd/https://medium.com/@szaranger/understanding-keyof-extends-and-never-keywords-in-typescript-9e0e11289522