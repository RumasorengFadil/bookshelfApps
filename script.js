import { ADD_BTN_VALUE, EDIT_BTN_VALUE, LOCAL_STR_KEY } from "./config.js";

const completedTodo = document.querySelector(".todo__list-selesai");
const uncompletedTodo = document.querySelector(".todo__list-belum");
const form = document.querySelector(".form");
const btnAddToList = document.querySelector(".form__btn-add-to-list");
const submitBtn = document.querySelector(".form__submit");
const todoEl = document.querySelector(".todo");
const popupAlert = document.querySelector(".popup-alert");
const btnOke = document.querySelector(".popup__btn-oke");
const searchInput = document.querySelector(".search__input-search");
const overlay = document.querySelector(".overlay");
const btnX = document.querySelector(".form__btn-close");
const popupDelete = document.querySelector(".popup-delete");
const btnDelete = document.querySelector(".popup__btn-delete");
const btnCancel = document.querySelector(".popup__btn-cancel");
let inputTitle = document.querySelector("#inputJudul");
let inputWriter = document.querySelector("#inputPenulis");
let inputYear = document.querySelector("#inputTahun");
let isCompleted = document.querySelector("#inputStatus");
let todoList = [];

//todo Function
const createLocalStorage = function(value){
    if(localStorage.getItem(LOCAL_STR_KEY)) return;
    localStorage.setItem(LOCAL_STR_KEY,JSON.stringify(value));
}
const renderTodo = function(todo){
    const todoMarkup = `
    <div class="card" id=${todo.id}>
        <img class="card__icn-edit" src="assets/icon/edit.svg">
        <p class="card__tahun">${todo.yearValue}</p>
        <h5 class="card__judul">${todo.titleValue}</h5>
        <figcaption class="card__penulis">${todo.writerValue}</figcaption>
        <img class="card__btn-pindah" src="assets/icon/${todo.isCompleted?'rotate-ccw':'check-square'}.svg" alt="Undo">
        <img class="card__btn-delete" src="assets/icon/trash.svg" alt="Delete">
    </div>
    `;

    todo.isCompleted === true ?
    completedTodo.insertAdjacentHTML("beforeend", todoMarkup)
    :uncompletedTodo.insertAdjacentHTML("beforeend", todoMarkup);
}
const generateId = function(){
    return +new Date();
}
const toggleEditForm = function(){
    form.classList.toggle("form-edit");
    overlay.classList.toggle("hidden");
    btnX.classList.toggle("hidden");
    submitBtn.value = ADD_BTN_VALUE;
}
const update = function(todo){
    localStorage.setItem(LOCAL_STR_KEY,JSON.stringify(todo));
}
const clearTodo = function(){
    completedTodo.innerHTML = "";
    uncompletedTodo.innerHTML = "";
}
const clearForm = function(){
    inputTitle.value = "";
    inputWriter.value = "";
    inputYear.value = "";
    isCompleted.checked = false;
}
const toggleTodoList = function(){
    const cardId = +form.id;
    const todoIndex = todoList.findIndex(todo => todo.id === cardId);

    todoList[todoIndex].isCompleted =  !todoList[todoIndex].isCompleted;

    update(todoList);
    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
}
const toggleDeletePopup = function(){
    popupDelete.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}
const toggleAlertPopup = function(){
    popupAlert.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
}
const deleteTodo = function(){
    const cardId = +form.id;
    console.log(form.id);
        
    todoList = todoList.filter(todo =>{
        console.log(todo.id !== cardId)
        return todo.id !== cardId;
    })

    update(todoList);
    toggleDeletePopup();
    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
}

// todo Event
document.addEventListener("DOMContentLoaded", function(){
    createLocalStorage([]);

    todoList = JSON.parse(localStorage.getItem(LOCAL_STR_KEY));

    todoList.forEach(todo => renderTodo(todo));
})
form.addEventListener("submit", function(e){
    e.preventDefault();

    const todoObj = {
        titleValue : inputTitle.value.trim(),
        writerValue : inputWriter.value.trim(),
        yearValue : inputYear.value.trim(),
        isCompleted : isCompleted.checked,
        id : generateId()
    }

    if(e.target.classList.contains("form-edit")){
        const indexUpdate = todoList.findIndex(todo => todo.id === +form.id);
        todoList[indexUpdate] = todoObj;

        toggleEditForm();
    }else{
        todoList.push(todoObj);
        toggleAlertPopup();
    }

    update(todoList);
    
    clearTodo();
    todoList.forEach(todo => renderTodo(todo));
    
    clearForm();
})
searchInput.addEventListener("input", function(){
    const todoListEl = document.querySelectorAll(".card");
    const searchValue = searchInput.value.toLowerCase();

    todoListEl.forEach(todo => {
        const todoTitle = todo.querySelector(".card__judul").textContent.toLowerCase();
        const todoWriter = todo.querySelector(".card__penulis").textContent.toLowerCase();
        const todoYear = todo.querySelector(".card__tahun").textContent.toLowerCase();
        
        if(todoTitle.includes(searchValue) || 
        todoWriter.includes(searchValue) ||
        todoYear.includes(searchValue)){
            todo.classList.remove("hidden");
        }else{
            todo.classList.add("hidden");
        }
    })
})
todoEl.addEventListener("click", function(e){
    form.id = e.target.closest(".card").id;

    if(e.target.classList.contains("card__btn-pindah")){
        toggleTodoList();
    }

    if(e.target.classList.contains("card__btn-delete")){
        toggleDeletePopup();
    }

    if(e.target.classList.contains("card__icn-edit")){
        toggleEditForm();

        const cardId = +e.target.closest(".card").id;
        const todo = todoList
        .find(todo => todo.id === cardId);

        inputTitle.value = todo.titleValue;
        inputWriter.value = todo.writerValue;
        inputYear.value = todo.yearValue;
        isCompleted.checked = todo.isCompleted;
        form.id = todo.id;
        
        submitBtn.value = EDIT_BTN_VALUE;
    }
})
btnX.addEventListener("click", function(){
    toggleEditForm();
    clearForm();
});
btnOke.addEventListener("click", toggleAlertPopup)
btnCancel.addEventListener("click",toggleDeletePopup);
btnDelete.addEventListener("click", deleteTodo);