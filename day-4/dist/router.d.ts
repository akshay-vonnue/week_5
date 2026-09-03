export declare function createRouter(): {
    register: (path: string, component: () => void) => void;
    navigate: (path: string) => void;
    route: () => void;
};
