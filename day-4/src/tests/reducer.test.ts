import { describe, it, expect, beforeEach,vi } from "vitest";
import { createStore } from "../store";
import { reducer } from "../reducer";

describe("reducer test", () => {

    
    let state = [
        {
            id: 0,
            text: 'hello world',
            completed:false
        }
    ]

    let store = createStore(state,reducer)
    
    it("reducer", () => {
        state = reducer(state, {
            type: 'TASK_ADDED',
            payload:'first task added'
        })
        
        expect(state.length).toBe(2)

        console.log("hiiiiiiiiii",state[1])
        state = reducer(state, {
            type: 'TASK_TOGGLED',
            payload:1
        })

        state = reducer(state, {
            type: 'TASK_UPDATE',
            payload: {
                id: 1,
                text:'something in the way'
            }
        })

        expect(state[1].text).toBe('something in the way')

        console.log("byeeeeeeeeee",state[1])
        expect(state[1].completed).toBeTruthy()

        state = reducer(state, {
            type: 'TASK_DELETED',
            payload:0
        })

        expect(state.length).toBe(1)

    })
})