interface Observer<T> {
    fn: (val: T) => void;
}

type Unsubscribe = () => void;

interface Observable<T>{
    subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observable<T>{
    observers: Observer<T>[];
    constructor(observer:Observer<T>) {
        this.observers = []
    }

    subscribe(observer: Observer<T>): Unsubscribe {
        this.observers.push(observer)
        return () => {
            let index = this.observers.indexOf(observer)
            this.observers.splice(index,1)
        }
    }
}


export interface Command{
    execute(): void
    undo():void
}

export class CommandHistory {
    undoHistory: Command[] = []
    redoHistory: Command[] = []

    executeCommand(command: Command): void {
        command.execute()
        this.undoHistory.push(command)
        this.redoHistory = []
    }

    undo(): void{
        let command = this.undoHistory.pop()
        if (command) {
            command.undo()
            this.redoHistory.push(command)    
        }    
    }
    
    redo(): void{
        let command = this.redoHistory.pop()
        if (command) {
            command.execute()
            this.undoHistory.push(command)
        }
    }
}