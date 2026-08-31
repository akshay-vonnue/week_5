import {
    DB_NAME,
    STORE_NAME,
    openDB,
    addRecord,
    getAllRecords,
    deleteRecord,
    updateRecord
} from "../indexDB.js";


let todoList = [];
let progressList = [];
let doneList = [];


const inProgressColumn = document.getElementById("in-progress");
const doneColumn = document.getElementById("done");

const todoRenderer = document.querySelector(".todo-render");
const inProgressRenderer = document.querySelector(".progress-render");
const doneRenderer = document.querySelector(".done-render");

function renderColumn(list, column) {

    column.replaceChildren();

    list.forEach(item => {

        const div = document.createElement("div");
        div.classList.add("list");
        div.innerText = item.todo;
        div.setAttribute("draggable", "true");
        div.setAttribute("tabindex", "0");
        div.setAttribute("id", item.id);

        div.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData(
                "text/plain",
                String(item.id)
            );
        });

        div.addEventListener("keydown", async (e) => {
            if (e.key !== "ArrowRight") return;
            if (div.parentElement.id === "todo") {
                const selectedItem = todoList.find(
                    item => item.id === Number(div.id)
                );
                if (!selectedItem) return;
                todoList.splice(todoList.indexOf(selectedItem),1);
                progressList.push(selectedItem);

                await updateRecord(
                    selectedItem.id,
                    "progress"
                );


                renderColumn(todoList, todoRenderer);
                renderColumn(progressList, inProgressRenderer);
            }else if (div.parentElement.id === "progress") {
                const selectedItem = progressList.find(
                    item => item.id === Number(div.id)
                );
                if (!selectedItem) return;
                progressList.splice(progressList.indexOf(selectedItem),1);
                doneList.push(selectedItem);
                await updateRecord(
                    selectedItem.id,
                    "done"
                );

                renderColumn(progressList, inProgressRenderer);
                renderColumn(doneList, doneRenderer);
            }

        });

        column.appendChild(div);
    });
}

async function readFromStorage() {
    const data = await getAllRecords();

    todoList = [];
    progressList = [];
    doneList = [];


    data.forEach(item => {
        if (item.status === "todo") {
            todoList.push(item);
        }else if (item.status === "progress") {
            progressList.push(item);
        }else if (item.status === "done") {
            doneList.push(item);
        }
    });
    renderColumn(todoList, todoRenderer);
    renderColumn(progressList, inProgressRenderer);
    renderColumn(doneList, doneRenderer);
}


readFromStorage();

inProgressColumn.addEventListener("dragover", (e) => {
    e.preventDefault();
});


inProgressColumn.addEventListener("dragenter", () => {
    inProgressColumn.style.backgroundColor = "rgb(37, 46, 23)";
});


inProgressColumn.addEventListener("dragleave", () => {
    inProgressColumn.style.backgroundColor = "darkolivegreen";
});


inProgressColumn.addEventListener("drop", async (e) => {

    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");

    inProgressColumn.style.backgroundColor = "darkolivegreen";


    const todoItem = todoList.find(
        item => item.id === Number(data)
    );


    if (!todoItem) return;


    todoList.splice(
        todoList.indexOf(todoItem),
        1
    );

    progressList.push(todoItem);


    await updateRecord(
        todoItem.id,
        "progress"
    );


    renderColumn(todoList, todoRenderer);
    renderColumn(progressList, inProgressRenderer);
});

doneColumn.addEventListener("dragover", (e) => {
    e.preventDefault();
});


doneColumn.addEventListener("dragenter", () => {
    doneColumn.style.backgroundColor = "rgb(37, 46, 23)";
});


doneColumn.addEventListener("dragleave", () => {
    doneColumn.style.backgroundColor = "darkolivegreen";
});

doneColumn.addEventListener("drop", async (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    doneColumn.style.backgroundColor = "darkolivegreen";
    const doneItem = progressList.find(
        item => item.id === Number(data)
    );
    if (!doneItem) return;
    progressList.splice(
        progressList.indexOf(doneItem),
        1
    );
    doneList.push(doneItem);
    await updateRecord(
        doneItem.id,
        "done"
    );
    renderColumn(progressList, inProgressRenderer);
    renderColumn(doneList, doneRenderer);
});

document.querySelector(".todo-add").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.querySelector(".todo-form");
    const formdata = new FormData(form);
    const todoText = formdata.get("todo");

    if (!todoText) return;
    const newItem = await addRecord({
        todo: todoText,
        status: "todo"
    });

    todoList.push(newItem);

    renderColumn(todoList, todoRenderer);
    form.reset();
});

document.querySelector(".todo-delete").addEventListener("click", async (e) => {
    e.preventDefault();
    const item = todoList.pop();
    if (!item) return;

    await deleteRecord(item.id);
    renderColumn(todoList, todoRenderer);
});

document.querySelector(".progress-add").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.querySelector(".progress-form");
    const formdata = new FormData(form);
    const progressText = formdata.get("progress");

    if (!progressText) return;
    const newItem = await addRecord({
        todo: progressText,
        status: "progress"
    });
    progressList.push(newItem);

    renderColumn(
        progressList,
        inProgressRenderer
    );

    form.reset();
});

document.querySelector(".progress-delete").addEventListener("click", async (e) => {
    e.preventDefault();
    const item = progressList.pop();
    if (!item) return;

    await deleteRecord(item.id);

    renderColumn(
        progressList,
        inProgressRenderer
    );
});

document.querySelector(".done-add").addEventListener("click", async (e) => {
    e.preventDefault();
    const form = document.querySelector(".done-form");
    const formdata = new FormData(form)
    const doneText = formdata.get("done")
    if (!doneText) return

    const newItem = await addRecord({
        todo: doneText,
        status: "done"
    })

    doneList.push(newItem);

    renderColumn(
        doneList,
        doneRenderer
    );

    form.reset();
});

document.querySelector(".done-delete").addEventListener("click", async (e) => {
    e.preventDefault();
    const item = doneList.pop();
    if (!item) return;

    await deleteRecord(item.id);

    renderColumn(
        doneList,
        doneRenderer
    );
});

async function mockSync(record){
    return new Promise((resolve) =>{
        setTimeout(() => {
            console.log('mock API running..')
            resolve({sucess:true})
        }, 1000);
    })
}


async function sync(){
    console.log('Device is online,syncing...')
    const allRecords = await getAllRecords()

    const db = await openDB()
    const transaction = db.transaction(STORE_NAME,"readwrite")
    const store = transaction.objectStore(STORE_NAME)

    for(const record of allRecords){
        if(record.syncStatus === 'pending'){
            try{
                await mockSync();
                record.syncStatus = 'synced'
                store.put(record)
            }catch(e){
                console.error('Failed to sync')
            }
        }else if(record.syncStatus === 'deleted'){
            try{
                await mockSync()
                store.delete(record)
            }catch(e){
                console.log('failed to delete sync')
            }
        }
    }
}

window.addEventListener('online',sync)

if(navigator.online) sync()