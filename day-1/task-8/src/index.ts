// function greet(name) {
//     console.log(name)
// }

//######################### strictNullChecks

// let users = [
//     {
//         id: 1,
//         name:'akshay'
//     },
//     {
//         id: 2,
//         name:'anjal'
//     }
// ]

// let loggedInUser = users.find(usr => usr.id === 2)

// console.log(loggedInUser.id)
    
// #########################strict function checks

// function func(a: string ) {
//     console.log(a.toLocaleLowerCase())
// }

// type numberOrStringFunction = (x: string | number) => void

// let fn : numberOrStringFunction = func

// #########################noUncheckedIndexedAccess

// interface User{
//     name: string;
//     gender: string;

//     [propName:string]:string
// }

// declare const user: User;

// const usrName = user.name;
// const usrGender = user.gender;

// const usrPlace = user.place

// ######################### noUncheckedIndexedAccess on array

function getFirstIndex(arr: number[]) {
    const first = arr[0]
    return first
}

let firstLetter = getFirstIndex([])
console.log(firstLetter + 1)