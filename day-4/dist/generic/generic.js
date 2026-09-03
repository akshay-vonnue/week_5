// Write identity<T>(arg: T): T. Test with string, number, custom types.
function identity(arg) {
    return arg;
}
let user = {
    name: 'akshay',
    age: 12
};
console.log(identity(user));
let num = 1;
console.log(identity(num));
let str = 'name';
console.log(identity(str));
// Write first<T>(arr: T[]): T | undefined returning the first element of any array
function first(arr) {
    return arr[0];
}
let arr = [1, 2, 3, 4, 5, 6];
console.log("first of array", first(arr));
// Write fetchData<T>(url: string): Promise<T> that parses the response as T
async function fetchData(url) {
    const response = await fetch(url);
    if (!response) {
        throw new Error("http-error");
    }
    let data = await response.json();
    return data;
}
fetchData(`https://jsonplaceholder.typicode.com/users/1`).then((data) => console.log(data));
// 
// interface length{
//     length: number;
// }
// function findL<T extends length>(arr: T): T{
//     console.log(arr.length)
//     return arr;
// }
// findL([2,3])
// Write getProperty<T, K extends keyof T>(obj: T, key: K): T[K] - the typed property accessor
function getProperty(obj, key) {
    return obj[key];
}
let object = {
    name: 'akshay',
    age: 22,
    place: 'alappuzha'
};
console.log(getProperty(object, "place"));
// console.log(getProperty(object,'ethinicity'))
// Build a generic Queue<T> class with enqueue, dequeue, peek, isEmpty
export class Queue {
    que;
    constructor() {
        this.que = [];
    }
    enqueue(item) {
        this.que.push(item);
    }
    dequeue() {
        this.que.pop();
    }
    peek() {
        return this.que[this.que.length - 1];
    }
    isEmpty() {
        return this.que.length === 0;
    }
    log() {
        console.log(this.que);
    }
}
let queObj = new Queue();
console.log(queObj.isEmpty());
queObj.enqueue(1);
queObj.enqueue(2);
queObj.enqueue(3);
queObj.log();
queObj.dequeue();
console.log(queObj.peek());
queObj.log();
