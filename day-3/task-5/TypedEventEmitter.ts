class TypedEventEmitter<Events extends Record<string, any[]>>{
    private listeners = new Map<keyof Events,Set<(...data:any[]) => void>>()

    on<K extends keyof Events>(event: K, listener: (...args: Events[K]) => void): this {
        if (!this.listeners.has(event)) {
            this.listeners.set(event,new Set())
        }
        this.listeners.get(event)?.add(listener)
        return this
    }

    emit<K extends keyof Events>(event: K, ...args: Events[K]) {
        // console.log('called emit')
        let eventlistener = this.listeners.get(event)
        if (eventlistener) {
            eventlistener.forEach(listener => listener(...args))
        }
    }
}

type User = {
    id: string,
    name:string
}

type UserEvents = {
    userAdded: [User],
    userRemoved: [string],
    userUpdated:[string,Partial<User>]
}

let eventEmitter = new TypedEventEmitter<UserEvents>()

eventEmitter.on('userRemoved',(userId: string): void => {
  console.log(`User ${userId} was removed`);
})

eventEmitter.on('userRemoved',(userId: string): void => {
  console.log(`user with id:${userId} removed`);
})

eventEmitter.on('userAdded', (user: Partial<User>) => {
    console.log("added user:",user)
})

eventEmitter.on("userUpdated", (...args) => {
    console.log("called update with",args)
})


console.log(eventEmitter)
eventEmitter.emit('userRemoved', "13")
eventEmitter.emit('userAdded', { id: 'as', name: 'anjal' })
eventEmitter.emit('userUpdated', "akshay", { name: 'anjal' })

// eventEmitter.emit("callUser")  error: