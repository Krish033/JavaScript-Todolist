// SELECTORS
const render = document.querySelector(".render");
const todoInput = document.querySelector(".add__list");
const todoBtn = document.querySelector(".add__btn");
const filterOption = document.querySelector(".filter-todos");


// EVENTS
window.addEventListener("DOMContentLoaded", getLocalTodos);
todoBtn.addEventListener("click", addTodoList);
render.addEventListener("click", setTodos);
filterOption.addEventListener("click", filterTodos);

// FUNCTIONS;
function addTodoList(e) {

  // prevent default behaveior;
  e.preventDefault();

  // checking the value of input is not empty;
  if (todoInput.value === "") {

    // creating a span that says cant append;
    let span = document.createElement("span");
    span.classList.add("spans");
    span.innerText = "Cannot add Empty Todo";
    // appending child;
    render.appendChild(span);
    // removing span in 2 seconds
    setTimeout(() => {
      span.style.display = "none";
      render.removeChild(span);
    }, 2000);
    return;
  }

  // creating a div;
  let todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");

  // create a h1;
  let todoList = document.createElement('h1');
  todoList.innerText = todoInput.value;
  // checking for space and overflow;
  checkForSpace(todoList);
  todoDiv.appendChild(todoList);

  // saving todoInput to localStorage;
  saveLocalTodos(todoInput.value);

  // creating bttons;
  let tickBtn = document.createElement('button');
  tickBtn.classList.add("btn");
  tickBtn.setAttribute('value', 'completeBtn');
  todoDiv.appendChild(tickBtn);

  let crossBtn = document.createElement('button');
  crossBtn.classList.add("btn");
  crossBtn.setAttribute('value', 'deleteBtn')
  todoDiv.appendChild(crossBtn);

  // creating imgs;
  let tickImg = document.createElement('img');
  tickImg.src = "iconfinder_Tick_5957003.svg";
  tickImg.classList.add("completed-btn");
  tickBtn.appendChild(tickImg);

  let crossImg = document.createElement('img');
  crossImg.src = "iconfinder_Close.svg";
  crossImg.classList.add("delete-btn");
  crossBtn.appendChild(crossImg);

  // adding todos to render
  render.appendChild(todoDiv);

  // clearing input value;
  todoInput.value = "";
}

// FUNCTION TO DELETE AND COMPLETE TODOS;

function setTodos(e) {
  // find if the use ticks or delets the todos
  let item = e.target;
  let todo = item.parentElement.parentElement;
  // if user clicks delete;
  if (item.classList[0] === "delete-btn") {

    // removing the localStorage todos at the end;
    removeLocalTodos(todo);
    todo.classList.add("delFunction");
    // removing it from the ui;
    todo.addEventListener("transitionend", () => {
      todo.remove();
    })
    return;
  }

  // else if user clicks tick;
  if (item.classList[0] === "completed-btn") {
    todo.classList.toggle("tick");
  }
}



// CHECK FOR TODOS OVERFLOW THROUGH CONTAINER
function checkForSpace(val) {
  let todoValue = todoInput.value;

  // adding dots instead to excess words, NOT RECOMMENDED;
  for (let i = 0; i < todoInput.value.length; i++) {
    if (todoInput.value.length > 30) {

      // converting input value as an array;
      let todoValue0 = todoValue.split("");
      // removing the extran values with splice;
      let todoValue1 = todoValue0.splice(0, 21);
      let todoValue2 = todoValue1.join("");
      val.innerText = todoValue2 + "...";
    }
  }
}

// IMPLEMINTING LOCALSTORAGE;
function saveLocalTodos(todo) {
  // creating a variable as an array to append to localStorage;
  let todos;

  // checking for items that already exists i  localStorage;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  // if item already exists, get the item;
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // appending the items to localStorage;
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}



// CHECKING FOR LOCALSTORAGE TODOS TO APPEND IN APP;
function getLocalTodos(todo) {
  // creating a variable as an array to check localStorage;
  let todos;

  // checking for items that already exists i  localStorage;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  // if item already exists, get the item;
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // looping through it to add the todos already saved in localStorage;
  todos.forEach(function(todo) {
    // creating a element to append todoitems
    let todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // create a h1;
    let todoList = document.createElement('h1');
    todoList.innerText = todo;
    // checking for space and overflow;
    checkForSpace(todoList);
    todoDiv.appendChild(todoList);

    // creating bttons;
    let tickBtn = document.createElement('button');
    tickBtn.classList.add("btnss");
    tickBtn.setAttribute('value', 'completeBtn')
    todoDiv.appendChild(tickBtn);

    let crossBtn = document.createElement('button');
    crossBtn.classList.add("btnss");
    crossBtn.setAttribute('value', 'deleteBtn')
    todoDiv.appendChild(crossBtn);

    // creating imgs;
    let tickImg = document.createElement('img');
    tickImg.src = "iconfinder_Tick_5957003.svg";
    tickImg.classList.add("completed-btn");
    tickBtn.appendChild(tickImg);

    let crossImg = document.createElement('img');
    crossImg.src = "iconfinder_Close.svg";
    crossImg.classList.add("delete-btn");
    crossBtn.appendChild(crossImg);

    // adding todos to render
    render.appendChild(todoDiv);

  });
}


// REMOVING THE TODOS IN LOCALSTORAGE;
function removeLocalTodos(todo) {
  let todos;
  // checking for items that already exists i  localStorage;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  }
  // if item already exists, get the item;
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // get the item, splicing it to remove;
  let todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  // updating the spliced todos to the localStorage;
  localStorage.setItem("todos", JSON.stringify(todos));
}


// FILTER TODOS
function filterTodos(e) {

  // getting todos in render;
  let todos = render.childNodes;
  // Creating an array - to solve the undefined probleum;
  let todos1 = [];

  // looping through Todos in render and pushing it to the array;
  todos.forEach(todo => todos1.push(todo));

  // i is the undefined value of the render todos, splicing it from the list;
  let i = todos[0];
  todos1.splice(i, 1);

  // looping through the created Array;
  todos1.forEach(t => {
    switch (e.target.value) {
      // select option all;
      case "all":
        t.style.display = 'flex';
        break;

        // select option completed;
      case "completed":
        if (t.classList.contains("tick")) {
          t.style.display = 'flex';
        } else {
          t.style.display = 'none';
        }
        break;

        // select option uncompleted;
      case "uncompleted":
        if (!t.classList.contains("tick")) {
          t.style.display = 'flex';
        } else {
          t.style.display = 'none';
        }
        break;
    }
  });
}


/* END OF THE APP */