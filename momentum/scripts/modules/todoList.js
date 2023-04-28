import {
    lang
} from "./settings.js";

const todoTitle = document.querySelector('.todolist-title');
const addTodoInput = document.querySelector('.add-todo');
const todoList = document.querySelector('.todos');
const saveBtn = document.querySelector('.todo-save');
const clearBtn = document.querySelector('.todo-clear');

let saveList = [];

export function setLangTodo(){
    if (lang === 'en'){
        todoTitle.textContent = 'TODO List';
        addTodoInput.setAttribute('placeholder', 'Add new todo')
        saveBtn.textContent = 'Save';
        clearBtn.textContent = 'Clear';
    } else {
        todoTitle.textContent = 'Список дел';
        addTodoInput.setAttribute('placeholder', 'Добавить новый пункт')
        saveBtn.textContent = 'Сохранить';
        clearBtn.textContent = 'Очистить';
    }
}

function addTodo() {
    let li = document.createElement('li');
    let inputBox = document.createElement('div');
    let label = document.createElement('label');
    let check = document.createElement('input');
    let removeTodo = document.createElement('button');

    saveList.push(addTodoInput.value);

    li.classList.add('todo-item');
    inputBox.classList.add('todo-input-box');
    label.textContent = addTodoInput.value;
    check.setAttribute('type', 'checkbox');
    check.addEventListener('click', () => {
        check.nextElementSibling.classList.toggle('cross');
    });

    removeTodo.classList.add('remove-todo');
    removeTodo.addEventListener('click', ()=> {
        saveList = saveList.filter(elem => elem!==removeTodo.parentNode.firstChild.lastChild.textContent);
        removeTodo.parentNode.parentNode.removeChild(removeTodo.parentNode);       
    })

    inputBox.append(check);
    inputBox.append(label);

    li.append(inputBox);
    li.append(removeTodo);

    todoList.append(li);

    addTodoInput.value = '';
}


saveBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', () => {
    todoList.innerHTML = '';
    saveList = [];
})

window.addEventListener('beforeunload', () => {
    localStorage.setItem('list', JSON.stringify(saveList));
})

window.addEventListener('load', () => {
   
    saveList = JSON.parse(localStorage.getItem('list'));
    if (saveList) {
        saveList.forEach(elem => {
            let li = document.createElement('li');
            let inputBox = document.createElement('div');
            let label = document.createElement('label');
            let check = document.createElement('input');
            let removeTodo = document.createElement('button');

            li.classList.add('todo-item');
            inputBox.classList.add('todo-input-box');
            label.textContent = elem;
            check.setAttribute('type', 'checkbox');
            check.addEventListener('click', () => {
                check.nextElementSibling.classList.toggle('cross');
            });

            removeTodo.classList.add('remove-todo');
            removeTodo.addEventListener('click', ()=> {
                saveList = saveList.filter(elem => elem!==removeTodo.parentNode.firstChild.lastChild.textContent);
                removeTodo.parentNode.parentNode.removeChild(removeTodo.parentNode);  
            })

            inputBox.append(check);
            inputBox.append(label);
            li.append(inputBox);
            li.append(removeTodo);

            todoList.append(li);
        })
    } else saveList = [];
})

