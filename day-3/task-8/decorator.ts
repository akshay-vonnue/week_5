function sealed(constructor: Function) {
    console.log(`sealing ${constructor.name}`)
    Object.seal(constructor)
    Object.seal(constructor.prototype)
}

function log(target: any, propertyKeys: string, descriptor: PropertyDescriptor) {
    let method = descriptor.value;

    descriptor.value = function(this:any,data:string) { 
        console.log(`Method ${propertyKeys} has been called`)
        console.log('arguments:', data)
        let returnedDate = method.apply(this,[data])
        console.log('returned:', returnedDate)
    }

    return descriptor
}

@sealed
class User{
    name: string;
    constructor(name: string) {
        this.name = name
    }

    @log
    greet(greeting:string):string{
        console.log(`${greeting} ${this.name}`)
        return `${greeting} ${this.name}`
    }
}

let user = new User('akshay');
user.greet('hi')
