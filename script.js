const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoCount = document.querySelector("#todo-count");
const remainingCount = document.querySelector("#remaining-count");
const allButton = document.querySelector("#filter-all");
const activeButton = document.querySelector("#filter-active");
const completedButton = document.querySelector("#filter-completed");
const savedTodos = localStorage.getItem("todos");

let currentFilter = "all";
let todos = savedTodos ? JSON.parse(savedTodos) : [];

function addTodo(title){
    const newTodo = {
        id: Date.now(), 
        title: title, 
        completed: false
    };

    todos.push(newTodo);
    saveTodos();
    renderTodos();
}

function toggledTodo(id){
    for(const todo of todos){
        if(todo.id === id){
            todo.completed = !todo.completed;
        }
    }

    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(function (todo) {
        return todo.id !== id;
    });

    saveTodos();
    renderTodos();
}

function renderTodos(){
    todoList.innerHTML = "";
    todoCount.textContent = todos.length;

    const activeTodos = todos.filter(function(todo){
        return !todo.completed;
    });

    remainingCount.textContent = activeTodos.length;

    let visibleTodos = todos;

    if(currentFilter === "active"){
        visibleTodos = todos.filter(function (todo){
            return !todo.completed;
        });
    }

    if(currentFilter === "completed"){
        visibleTodos = todos.filter(function (todo){
            return todo.completed;
        });
    }

    for (const todo of visibleTodos){
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

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

allButton.addEventListener("click", function(){
    currentFilter = "all";
    renderTodos();
});

activeButton.addEventListener("click", function () {
    currentFilter = "active";
    renderTodos();
});

completedButton.addEventListener("click", function(){
    currentFilter = "completed";
    renderTodos();
});

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

    addTodo(title);

    input.value = "";
    input.focus();
});

renderTodos();