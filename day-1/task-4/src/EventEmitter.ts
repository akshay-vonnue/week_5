type EventName = string | symbol
type Listener = (...args:unknown[]) => void

class EventEmitter{
    observers: Record<EventName, Listener[]> = {};
    constructor(){
        this.observers = {}
    }

    on(event:EventName,listener:Listener){
        if(!this.observers[event]) this.observers[event] = []
        this.observers[event].push(listener)
    }

    off(event:EventName,listener:Listener){
        this.observers[event] = this.observers[event].filter(observer => observer !== listener);
    }

    once(event:EventName,listener:Listener){
        if(!this.observers[event]) return
        const wrapper = (...args: unknown[])=>{
            this.off(event,wrapper)
            listener(...args)
        }
        this.on(event,wrapper)
    }

    emit(event: EventName, ...args: unknown[]){
        console.log("emit")
        if(!this.observers[event]) return
        this.observers[event].forEach(listener => {
            listener(...args)
        });
    }

    log(event: EventName) {
        console.log(this.observers[event])
    }
}

type User = {
    name: string,
    age: number
}

class UserStore extends EventEmitter{
    protected users: User[];
    constructor(){
        super()
        this.users = []
    }

    addUser(name:string,age:number){
        this.users.push({
            name,
            age
        })
        this.emit("addUser")
        this.emit("*")
    }

    removeUser(name:string,age:number){
        this.users = this.users.filter(user => user.name !== name,age)
        this.emit("removeUser")
        console.log(this.users)
        this.emit("*")
    }

    updateUser(name:string,age:number){
        let userToUpdate = this.users.find(user => user.name === name)
        if(userToUpdate) userToUpdate.age = age;
        this.emit("updateUser")
        console.log(this.users)
        this.emit("*")
    }
}


let newevent = new EventEmitter()

function two(...args:unknown[]){
    console.log("two:",args)
}

function one(...args:unknown[]){
    console.log("one:",args)
}

newevent.on("click",one)

newevent.once("click",two)
newevent.emit("click",two)

newevent.log("click")

newevent.off("click",one)

newevent.log("click")

newevent.emit("click",1,2,3)




let user = new UserStore()

user.on("*",()=>{
    console.log("wildcard running")
})

user.on("addUser",()=>{
    console.log("added user")
})

user.on("addUser",()=>{
    console.log("setting up user")
})

user.on("removeUser",()=>{
    console.log("removed user")
})

user.on("updateUser",()=>{
    console.log("updated user")
})

user.addUser("akshay",12)
user.addUser("anjal",22)

user.removeUser("akshay",12)

user.updateUser("anjal",23)