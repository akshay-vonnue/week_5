interface User{
    id: number,
    name:string
}

interface User{
    age: number,
    place:string
}

let user: User = {
    id: 0,
    name: 'akshay',
    age: 22,
    place:'BATHERY'
}

// array augmentation

interface Array<T>{
    sum(this:Array<number>): number;
}

Array.prototype.sum = function (this:Array<number>) {
    return this.reduce((total, curr) => total + curr, 0);
}

let arr: Array<number> = [1, 2, 3, 4, 5]
console.log(arr.sum())

// window

type AppState = {
    isUserLoggedIn: boolean;
    authToken: string;
}

interface Window{
    appState: AppState;
}

window.appState = {
    isUserLoggedIn: true,
    authToken:'skDFFj2023hfiuwSKJskDFFj2023hfiuwSKJ'
}
