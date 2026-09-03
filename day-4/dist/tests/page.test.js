import { describe, it, expect, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import { createStore } from "../store.js";
import { reducer } from "../reducer.js";
let store;
let initialState = [
    {
        id: 0,
        text: 'hello world',
        completed: false
    }
];
describe("settings page", () => {
    let dom;
    let clearBtn;
    let document;
    let state = initialState;
    beforeEach(() => {
        store = createStore(initialState, reducer);
        dom = new JSDOM(`
            <button class="button">clear</button>    
        `);
        document = dom.window.document;
        clearBtn = document.querySelector(".button");
        clearBtn.addEventListener("click", () => {
            state = store.dispatch({
                type: 'CLEAR_TASKS'
            });
        });
    });
    it("clear all tasks", () => {
        expect(state).toHaveLength(1);
        clearBtn.click();
        expect(state).toHaveLength(0);
    });
});
describe("tasks page", () => {
    let dom;
    let checkbox;
    let document;
    beforeEach(() => {
        localStorage.clear();
        store = createStore(initialState, reducer);
        dom = new JSDOM(`
            <input type="checkbox" class="toggle">
        `);
        document = dom.window.document;
        checkbox = document.querySelector(".toggle");
        checkbox.addEventListener("click", () => {
            store.dispatch({
                type: "TASK_TOGGLED",
                payload: 0
            });
        });
    });
    it("isShownToggle", () => {
        expect(store.getState()[0].completed).toBeFalsy();
        checkbox.click();
        expect(store.getState()[0].completed).toBeTruthy();
    });
});
