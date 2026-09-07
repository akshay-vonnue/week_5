export type Task = {
    id: number,
    text: string,
    completed: boolean
}

export type Listener = () => void
/**
 action types for different reducer operations
 */
export type Action = 
    | {
        type: 'TASK_ADDED',
        payload:string
    }
    | {
        type: 'TASK_TOGGLED',
        payload:number
    }
    | {
        type:'CLEAR_TASKS'
    }
    | {
        type: 'TASK_UPDATE',
        payload: {
            id: number,
            text:string
        }
    }
    | {
        type: 'TASK_DELETED',
        payload:number
    }

/**
 getstate:returns the current state
 dispatch:calls reducer to manipulate state in the application
 subscribe:registers a new event listener for the operations
 */

export type Store = {
    getState: () => Task[];
    dispatch: (action: Action) => Task[];
    subscribe: (listener: Listener) => void;
}

/**
 register:registers a 'path-name' to a component(renderSomePage()),
 navigate:updates the search field or url and calls route.
 router:matches path from the registered routes and calls their corresponding component.
 */
export type Router = {
    register: (path: string, component: () => void) => void;
    navigate: (path: string) => void;
    route: () => void;
}

export type PageParams = {
    store?: Store
    router?: Router
    todoId?: number
}

export type Route = {
    path: string,
    component: (params?: PageParams) => void;
}


// type Pages = {
//     renderHomePage: null,
//     renderListPage: [Store, Router],
//     renderSettingsPage: Store,
//     renderDetailPage: [number, Store],
//     render404Page: null
// }

export type User = {
    id: number,
    name: string,
    email:string
}