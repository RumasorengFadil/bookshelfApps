const completedTodo = document.querySelector(".todo__selesai");
const uncompletedTodo = document.querySelector(".todo__belum");
const form = document.querySelector(".form");

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
        isCompleted : isCompleted
    }

    console.log(todoObj);

    if(isCompleted === true){
        completedTodo.insertAdjacentHTML("beforeend", `
        <div class="card" id="0">
            <img class="card__icn-edit" src="assets/icon/edit.svg">
            <p class="card__tahun">${yearValue}</p>
            <h5 class="card__judul">${titleValue}</h5>
            <figcaption class="card__penulis">${writerValue}</figcaption>
            <img class="card__btn-selesai" src="assets/icon/rotate-ccw.svg" alt="Undo">
            <img class="card__btn-delete" src="assets/icon/trash.svg" alt="Delete">
        </div>
        `)
    }else{
        uncompletedTodo.insertAdjacentHTML("beforeend", `
        <div class="card" id="0">
            <img class="card__icn-edit" src="assets/icon/edit.svg">
            <p class="card__tahun">${yearValue}</p>
            <h5 class="card__judul">${titleValue}</h5>
            <figcaption class="card__penulis">${writerValue}</figcaption>
            <img class="card__btn-selesai" src="assets/icon/check-square.svg" alt="Completed">
            <img class="card__btn-delete" src="assets/icon/trash.svg" alt="Delete">
        </div>
        `)
    }
    
})