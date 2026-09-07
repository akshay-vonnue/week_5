import { Listener, Task } from "./type"

export function createStore<S, A>(initialState:S, reducer:(state:S,action:A) => S) : {
    getState: () => S,
    dispatch: (action:A) => S,
    subscribe: (listener:Listener) => void
} {
    
    let persistedState = localStorage.getItem("tasks")
    let state : S = persistedState
        ? JSON.parse(persistedState)
        : initialState

    let listeners : Listener[] = []

    function getState():S {
        return state
    }

    function dispatch(action: A): S{
        console.log("entering dispatch with:",action)
        state = reducer(state, action)
        listeners.forEach(listener => listener())

        // SET STORAGE
        localStorage.setItem("tasks",JSON.stringify(state))

        console.log("inside dispatch...")
        console.log(state)
        return state
    }

    function subscribe(listener:Listener) {
        listeners.push(listener)
        return () => {
            let index = listeners.indexOf(listener)
            listeners.splice(index,1)
        }
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}