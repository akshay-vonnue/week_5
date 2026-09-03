import {describe, it, expect, beforeEach, vi, expectTypeOf } from "vitest";
import { createStore } from "../store.js";
import { reducer } from "../reducer.js";
import { Store } from "../type.js";

describe("state-manager", () => {

    let initialState = [
        {
            id: 0,
            text: 'hello world',
            completed:false
        }
    ]

    let store:Store;
    let subscriber:Function;

    beforeEach(() => {
        store = createStore(initialState, reducer);
        subscriber = vi.fn()

        store.subscribe(() => {
            subscriber()
        })
    })

    it("dispatch action", () => {
        console.log("######################## hi ##################")
        let state = store.dispatch({ type: 'TASK_DELETED', payload: 0 })

        // let newState = store.dispatch('TASK_DELETED',0)
        
        expect(state).toStrictEqual([])

        expectTypeOf(state).toBeArray()

        expect(subscriber).toHaveBeenCalledOnce()
    })
})