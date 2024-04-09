import { LOCAL_STR_KEY } from "./config.js";

const completedTodo = document.querySelector(".todo__list-selesai");
const uncompletedTodo = document.querySelector(".todo__list-belum");
const form = document.querySelector(".form");
const todoEl = document.querySelector(".todo");
let todoList = [];

const renderTodo = function(todo){
    const todoMarkup = `
    <div class="card" id=${todo.id}>
        <img class="card__icn-edit" src="assets/icon/edit.svg">
        <p class="card__tahun">${todo.yearValue}</p>
        <h5 class="card__judul">${todo.titleValue}</h5>
        <figcaption class="card__penulis">${todo.writerValue}</figcaption>
        <img class="card__btn-selesai" src="assets/icon/${todo.isCompleted?'rotate-ccw':'check-square'}.svg" alt="Undo">
        <img class="card__btn-delete" src="assets/icon/trash.svg" alt="Delete">
    </div>
    `;

    todo.isCompleted === true ?
    completedTodo.insertAdjacentHTML("beforeend", todoMarkup)
    :uncompletedTodo.insertAdjacentHTML("beforeend", todoMarkup);
}

const clearTodo = function(){
    completedTodo.innerHTML = "";
    uncompletedTodo.innerHTML = "";
}


const createLocalStorage = function(){
    if(localStorage.getItem(LOCAL_STR_KEY)) return;

    localStorage.setItem(LOCAL_STR_KEY,JSON.stringify([]));
}

const update = function(todo){
    localStorage.setItem(LOCAL_STR_KEY,JSON.stringify(todo));
}

const generateId = function(){
    return todoList[todoList.length - 1]? 
    todoList[todoList.length - 1].id+1 
    : 0;
}

const toggleTodoList = function(){
    const cardId = +this.target.closest(".card").id;

    todoList[cardId].isCompleted = !todoList[cardId].isCompleted;

    update(todoList);

    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
}

const deleteTodo = function(){
    console.log(this);
    const cardId = +this.target.closest(".card").id;
        
    todoList = todoList.filter(todo =>{
        return todo.id !== cardId;
    })

    update(todoList);
    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
}
todoEl.addEventListener("click", function(e){
    if(e.target.classList.contains("card__btn-selesai")){
        toggleTodoList.call(e);
    }

    if(e.target.classList.contains("card__btn-delete")){
        deleteTodo.call(e);
    }
})
form.addEventListener("submit", function(e){
    e.preventDefault();

    const titleValue = document.querySelector("#inputJudul").value;
    const writerValue = document.querySelector("#inputPenulis").value;
    const yearValue = document.querySelector("#inputTahun").value;
    const isCompleted = document.querySelector("#inputStatus").checked;
    const todoObj = {
        titleValue : titleValue,
        writerValue : writerValue,
        yearValue : yearValue,
        isCompleted : isCompleted,
        id : generateId()
    }
    todoList.push(todoObj);
    update(todoList);

    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
})
document.addEventListener("DOMContentLoaded", function(){
    createLocalStorage();

    todoList = JSON.parse(localStorage.getItem(LOCAL_STR_KEY));

    todoList.forEach(todo => renderTodo(todo));
})