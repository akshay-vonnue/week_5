import { store } from "../main.js";
import { Button } from "@components/button.js";
import { Modal } from "./modal.js";
import { router } from "../main.js";

export function Card(id:number,text:string) {
    let p = document.createElement("p")
    p.innerText = text
    
    // listener for detail page
    p.addEventListener('click', () => {
        router.navigate(`/detail/${id}`)
    })

    let isCompletedBox = document.createElement("input")
    isCompletedBox.setAttribute("type", "checkbox")
    // listener for isComplete
    isCompletedBox.addEventListener("change", () => {
        store.dispatch({type:'TASK_TOGGLED',payload:id})
    })
    // delete button
    const deleteBtn = Button("delete", () => {
        store.dispatch({type:'TASK_DELETED',payload:id})
    })

    // edit button
    const editBtn = Button("Edit", () => {
        console.log("edit button clicked with id:",id)
        let modalCard = Modal("edit", id)
        document.body.appendChild(modalCard)
    })
    
    let todoWrapper = document.createElement("div")
    
    todoWrapper.classList.add('todo-wrapper')
    todoWrapper.appendChild(p)
    todoWrapper.append(isCompletedBox)
    todoWrapper.append(deleteBtn)
    todoWrapper.append(editBtn)

    return todoWrapper
}