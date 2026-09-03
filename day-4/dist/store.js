export function createStore(initialState, reducer) {
    let persistedState = localStorage.getItem("tasks");
    let state = persistedState
        ? JSON.parse(persistedState)
        : initialState;
    let listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        console.log("entering dispatch with:", action);
        state = reducer(state, action);
        listeners.forEach(listener => listener());
        // SET STORAGE
        localStorage.setItem("tasks", JSON.stringify(state));
        console.log("inside dispatch...");
        console.log(state);
        return state;
    }
    function subscribe(listener) {
        listeners.push(listener);
        return () => {
            let index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }
    return {
        getState,
        dispatch,
        subscribe
    };
}
