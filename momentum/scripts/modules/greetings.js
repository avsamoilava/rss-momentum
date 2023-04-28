import {
    lang
} from './settings.js';


const greetingsBox = document.querySelector('.greeting');
const nameInput = document.querySelector('.name');
const placeholder = {
    'en': 'Enter name',
    'ru': 'Введите имя'
}


export function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let partsOfDay = {
        'en': ['night', 'morning', 'afternoon', 'evening'],
        'ru': ['ночи', 'утро', 'день', 'вечер']
    };

    return partsOfDay[lang][Math.floor(hours / 6)];
}


export function showGreeting() {
    nameInput.setAttribute('placeholder', placeholder[lang]);
    let part = getTimeOfDay();
    if (lang == 'en') {
        greetingsBox.innerText = `Good ${part}, `
    } else if (lang == 'ru') {
        let greet = '';
        switch (part) {
            case 'ночи':
                greet = 'Доброй';
                break;
            case 'утро':
                greet = 'Доброе';
                break;
            case 'день':
                greet = 'Добрый';
                break;
            case 'вечер':
                greet = 'Добрый';
                break;
        }
        greetingsBox.innerText = `${greet} ${part}, `      
    }
}


function setLocalStorage() {
    if (nameInput.value) localStorage.setItem('name', nameInput.value);
}


function getLocalStorage() {
    if (localStorage.getItem('name')) {
        nameInput.value = localStorage.getItem('name');
    } else nameInput.value = '';
}


window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', getLocalStorage);