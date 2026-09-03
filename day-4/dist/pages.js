import { Button } from "./components/button.js";
import { Card } from "./components/card.js";
import { Modal } from "./components/modal.js";
let app = document.querySelector(".app");
console.log(app);
function animatePage() {
    app.classList.remove('fade-in-animation');
    void app.offsetWidth;
    app.classList.add('fade-in-animation');
}
export function renderHomePage() {
    console.log("rendering home..");
    app.replaceChildren();
    animatePage();
    let heading = document.createElement("h1");
    heading.innerText = 'TASK MANAGER';
    app.appendChild(heading);
}
export function renderListPage(store, router) {
    console.log("rendering list..");
    app.replaceChildren();
    animatePage();
    let openModalBtn = Button("Add", () => {
        console.log("modal button clicked");
        let modalCard = Modal('add');
        document.body.appendChild(modalCard);
    });
    openModalBtn.className = 'add-button';
    app.appendChild(openModalBtn);
    let todoTasks = document.createElement("div");
    todoTasks.innerText = 'TODO';
    let completedTasks = document.createElement("div");
    completedTasks.innerText = 'COMPLETED';
    let state = store.getState();
    state.forEach((stateItem) => {
        let taskCard = Card(stateItem.id, stateItem.text);
        if (stateItem.completed) {
            completedTasks.appendChild(taskCard);
        }
        else {
            todoTasks.appendChild(taskCard);
        }
    });
    app.appendChild(todoTasks);
    app.appendChild(completedTasks);
}
export function renderSettingsPage(store) {
    console.log("rendering settings..");
    app.replaceChildren();
    animatePage();
    let clearAllBtn = Button("Clear all tasks", () => store.dispatch({ type: 'CLEAR_TASKS' }));
    clearAllBtn.className = 'clear-button';
    app.appendChild(clearAllBtn);
}
export function renderDetailPage({ todoId, store }) {
    if (!store || !todoId)
        return;
    let state = store.getState();
    console.log("rendering todo with id:", todoId);
    app.replaceChildren();
    animatePage();
    let component = document.createElement("h2");
    component.innerText = String(todoId);
    app.appendChild(component);
    console.log(todoId);
    console.log(state);
    let task = state.find((task) => task.id == todoId);
    console.log(`inside rendering details page with`, task);
    if (task) {
        const taskCard = Card(todoId, task.text);
        app.appendChild(taskCard);
    }
}
export function render404Page() {
    console.log("##### 404 #####");
    app.replaceChildren();
    let h4 = document.createElement("h4");
    h4.innerText = '404: page not found';
    app.appendChild(h4);
}
