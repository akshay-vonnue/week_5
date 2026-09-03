"use strict";
class TypedEventEmitter {
    listeners = new Map();
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)?.add(listener);
        return this;
    }
    emit(event, ...args) {
        // console.log('called emit')
        let eventlistener = this.listeners.get(event);
        if (eventlistener) {
            eventlistener.forEach(listener => listener(...args));
        }
    }
}
let eventEmitter = new TypedEventEmitter();
eventEmitter.on('userRemoved', (userId) => {
    console.log(`User ${userId} was removed`);
});
eventEmitter.on('userRemoved', (userId) => {
    console.log(`user with id:${userId} removed`);
});
eventEmitter.on('userAdded', (user) => {
    console.log("added user:", user);
});
eventEmitter.on("userUpdated", (...args) => {
    console.log("called update with", args);
});
console.log(eventEmitter);
eventEmitter.emit('userRemoved', "13");
eventEmitter.emit('userAdded', { id: 'as', name: 'anjal' });
eventEmitter.emit('userUpdated', "akshay", { name: 'anjal' });
