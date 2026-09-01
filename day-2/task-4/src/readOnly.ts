type MyReadOnly<T> = { readonly [K in keyof T]: T[K] }

type User = {
    name: string,
    age:number
}

let user: MyReadOnly<User> = {
    name: 'akshay',
    age:12
}

// user.name = 'antony' error: Cannot assign to 'name' because it is a read-only property.

type MyPartial<T> = { [K in keyof T]?: T[K] }


let partialUser: MyPartial<User> = {
    name:'akshay'
}

type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>
} : T;

type Place = {
    name: string,
    post: {
        area: string,
        code:number
    }
}

let nestedPartialPlace: DeepPartial<Place> = {
    name: 'bathery',
    post: {
        area: 'edakal',
        code: 123
    }
}


// https://dev.to/perennialautodidact/adventures-in-typescript-deeppartial-2f2a
// https://joeprevite.com/understanding-mapped-types-in-typescript/

const car = {
    name: 'bmw',
    power:'1000hp'
}

type CarLiteralType = keyof typeof car;

// let carProperties: CarLiteralType

function getProperty(key: CarLiteralType) {
    return car[key]
}

console.log(getProperty('name'))
console.log(getProperty('power'))

// console.log(getProperty('askjha'))



// https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript