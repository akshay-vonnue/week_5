export type Task = {
    id: number;
    text: string;
    completed: boolean;
};
export type Listener = () => void;
export type Action = {
    type: 'TASK_ADDED';
    payload: string;
} | {
    type: 'TASK_TOGGLED';
    payload: number;
} | {
    type: 'CLEAR_TASKS';
} | {
    type: 'TASK_UPDATE';
    payload: {
        id: number;
        text: string;
    };
} | {
    type: 'TASK_DELETED';
    payload: number;
};
export type Store = {
    getState: () => Task[];
    dispatch: (action: Action) => Task[];
    subscribe: (listener: Listener) => void;
};
export type Router = {
    register: (path: string, component: () => void) => void;
    navigate: (path: string) => void;
    route: () => void;
};
export type PageParams = {
    store?: Store;
    router?: Router;
    todoId?: number;
};
export type Route = {
    path: string;
    component: (params?: PageParams) => void;
};
export type User = {
    id: number;
    name: string;
    email: string;
};
