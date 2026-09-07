export declare const router: {
    register: (path: string, component: () => void) => void;
    navigate: (path: string) => void;
    route: () => void;
};
export declare let store: {
    getState: () => import("./type.js").Task[];
    dispatch: (action: import("./type.js").Action) => import("./type.js").Task[];
    subscribe: (listener: import("./type.js").Listener) => void;
};
