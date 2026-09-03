import { Listener } from "./type";
export declare function createStore<S, A>(initialState: S, reducer: (state: S, action: A) => S): {
    getState: () => S;
    dispatch: (action: A) => S;
    subscribe: (listener: Listener) => void;
};
