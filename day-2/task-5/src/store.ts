export function createStore<S, A extends { type: string }>(initialState: S, reducer: (state: S, action: A) => S) {

    type ListenerFn = (state:S) => void

    let state = initialState
    let listeners:ListenerFn[] = []

    function getState():S {
        return state
    }

    function dispatch(action:A):S {
        state = reducer(state, action)
        listeners.forEach(listener => listener(state))

        // SET STORAGE
        localStorage.setItem("tasks",JSON.stringify(state))

        console.log("inside dispatch...")
        console.log(state)
        return state
    }

    function subscribe(listener: ListenerFn): () => void {
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