import { store } from "../main.js"
import { Task } from "../type.js"

export function Modal(type: string, id?: number) {
    console.log("modal...",id)
    let state = store.getState()

    const modal = document.createElement("div")
    modal.classList.add("modal")

    let task;
    if (type === 'edit') {
        task = state.find((taskItem:Task) => taskItem.id === id)
        console.log(task)
    }

    modal.innerHTML = `
        <form class="modal-form">
            <label for="task">task</label>
            <input type="text" id="task" value="${type === 'edit' ? task?.text : ''}" required name="task">
            <button>
                ${type === 'edit' ? 'Submit' : 'Add'}
            </button>
        </form>
    `;


    const form = modal.querySelector(".modal-form") as HTMLFormElement
    const formInput = modal.querySelector("#task") as HTMLInputElement

    form.addEventListener("submit", (e) => {
        console.log("clicked form button...")
        e.preventDefault()
        const text = formInput.value.trim()
        console.log(text)
        console.log(id)
        if(!text) return
        console.log(type === 'edit' && id)
        if (type === 'edit' && id !== undefined) {
            console.log("calling edit dispatch")
            store.dispatch({ type: 'TASK_UPDATE', payload: { id,text} })
        }
        if (type === 'add') {
            console.log("calling add dispatch")
            store.dispatch({ type: 'TASK_ADDED', payload: text })
        }
        modal.remove()
    })


    // event listeners
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          modal.remove();
        }
    });

    return modal
}