'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

if (localStorage.getItem('todoData')) {
  todoData = JSON.parse(localStorage.getItem('todoData'));
}

const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  localStorage.setItem('todoData', JSON.stringify(todoData));

  todoData.forEach(function (item, index) {
    const li = document.createElement('li');
    li.classList.add('todo-item');

    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    const btnTodoRemove = li.querySelector('.todo-remove');

    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      render();
    });

    btnTodoRemove.addEventListener('click', function () {
      todoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  if (headerInput.value !== '') {
    const newTodo = {
      value: headerInput.value,
      completed: false,
    };

    todoData.push(newTodo);

    render();

    headerInput.value = '';
  }
});

render();
