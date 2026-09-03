## Action

used union types for actions page for different reducer options.

```
type Action = | {
    type: 'TASK_ADDED',
    payload:string
}
| {
    type: 'TASK_TOGGLED',
    :number
}
```

#### alternative considered
```
type action = {
    type?:number;
    payload?:string | number |
    {
        id?:number,
        text?:string
    };
}
```

## Store

manually given type to the parameters

```
export function createStore<S, A>(initialState:S, reducer:(state:S,action:A) => S) : {
    getState: () => S,
    dispatch: (action:A) => S,
    subscribe: (listener:Listener) => void
}
```

#### alternative considered

```
export function createStore(initialState:Task[], reducer:(state:Task[],action:Action) => Task[]) : {
    getState: () => Task[],
    dispatch: (action:Action) => Task[],
    subscribe: (listener:Listener) => void
}
```


## Assigning type using as for runtime data

```
let app = document.querySelector(".app") as HTMLElement
```

#### alternative considered

```
let app = document.querySelector(".app") as any
```

## Modal

made the parameter id optional for task : edit mode modal and add mode modal.
```
export function Modal(type: string, id?: number) {}
```
#### alternative considered
```
export function Modal(id:number){
    if(id !== undefined) //edit mode
    else add mode
}
```

## Dynamic Page parameters

```
export type PageParams = {
    store?: Store
    router?: Router
    todoId?: number
}

component: (params?: PageParams) => void;

```
#### alternative considered

```
component: (
    store?: Store
    router?: Router
    todoId?: number
) => void;
```