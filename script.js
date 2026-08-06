const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");

let todos = [];

function addTodo(title){
    const newTodo = {
        id: Date.now(), 
        title: title, 
        completed: false
    };

    todos.push(newTodo);
    renderTodos();
}

function toggledTodo(id){
    for(const todo of todos){
        if(todo.id === id){
            todo.completed = !todo.completed;
        }
    }

    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });

    renderTodos();
}

function renderTodos(){
    todoList.innerHTML = "";
    todoCount.textContent = todos.length;

    for (const todo of todos){
        const li = document.createElement("li");
        const titleSpan = document.createElement("span");
        const completeButton = document.createElement("button");
        const deleteButton = document.createElement("button");

        titleSpan.textContent = todo.completed ? "✓ " + todo.title : todo.title;
        completeButton.textContent = todo.completed ? "취소" : "완료";
        deleteButton.textContent = "삭제";

        if(todo.completed){
            titleSpan.classList.add("completed");
        }

        completeButton.addEventListener("click", function(){
            toggledTodo(todo.id);
        });

        deleteButton.addEventListener("click", function(){
            const shouldDelete = confirm(
                `"${todo.title}"을(를) 삭제하시겠습니까?`);

            if (shouldDelete) {
                deleteTodo(todo.id);
            }
        });

        li.appendChild(titleSpan);
        li.appendChild(completeButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = input.value.trim();

    if (title === "") {
        alert("할 일을 입력해 주세요.");
        return;
    }

    if (title.length > 30) {
        alert("할 일은 30자 이내로 입력해 주세요.");
        return;
    }

    console.log("입력한 할 일:", title);
    console.log(title.length);

    addTodo(title);

    input.value = "";
    input.focus();
});