import { setBg } from "./slider.js";
import {
    getWeather
} from "./weather.js";
import {
    getQuotes
} from "./quotes.js";
import {
    setLangTodo
} from "./todoList.js";


const settingsButton = document.querySelector('.settings-btn');
const settingsList = document.querySelector('.settings-list');
const overlay = document.querySelector('.settings-overlay');
const langInputs = document.querySelectorAll('input[name=lang]');
const hiddenBlocksInputs = document.querySelectorAll('input[name=hidden-block]');
const settingsListItems = document.querySelectorAll('.settings-item');
const imgSourceInputs = document.querySelectorAll('input[name=img-source]');
export const tegs = document.querySelectorAll('option');


export const state = {
    lang: 'en',
    imgSource: 'github',
    teg: 'nature',
    blocks: new Set()
}


export let lang = state.lang;
export let imgSource = state.imgSource;
export let teg = state.teg;


const nameSettings = {
    settings: {
        'en': ['Choose language', 'Choose images source', 'Choose tegs','Choose hidden block'],
        'ru': ['Выбор языка', 'Выбор источника изображений','Выбор тега', 'Скрыть виджеты']
    },
    blocksName: {
        'en': ['Audio', 'Time', 'Date', 'Weather', 'Greeting', 'Quotes', 'TODO'],
        'ru': ['Аудиоплеер', 'Время', 'Дата', 'Погода', 'Приветствие', 'Цитаты', 'Список задач']
    }
}


/* функции по установке языка */

function setSettingsLang() {
    settingsListItems.forEach((elem, index) => {
        elem.firstChild.textContent = nameSettings.settings[lang][index];
    })
    hiddenBlocksInputs.forEach((elem, index)=>{
       elem.nextSibling.textContent = nameSettings.blocksName[lang][index]
    })
}


function setLang() {
    langInputs.forEach(elem => {
        if (elem.checked) {
            state.lang = elem.value;
            lang = state.lang;
            setSettingsLang();
            setLangTodo();
            getWeather();
            getQuotes();
        }
    })
}


function setLocalStorageLang() {
    langInputs.forEach(elem => {
        if (elem.checked) {
            localStorage.setItem('lang', elem.value);
        }
    })
}


function getLocalStorageLang() {
    if (localStorage.getItem('lang')) {
        langInputs.forEach(elem => {
            if (elem.value == localStorage.getItem('lang')) {
                elem.checked = true
            }
        })
    } else {
        langInputs.forEach(elem => {
            if (elem.value == 'en') elem.checked = true
        })
    }
}


/* функции по установке источника изображений */

function setImgSource(){
    state.imgSource = Array.from(imgSourceInputs).filter(elem => elem.checked)[0].value;
    imgSource = state.imgSource;
    setBg()
}


function setLocalStorageImgSource(){
    imgSourceInputs.forEach(elem => {
        if (elem.checked) {
            localStorage.setItem('source', elem.value);
        }
    })
}

function getLocalStorageImgSource(){
    if (localStorage.getItem('source')) {
        imgSourceInputs.forEach(elem => {
            if (elem.value == localStorage.getItem('source')) {
                elem.checked = true;
                imgSource = localStorage.getItem('source')
                
            }
        })
    } else {
        imgSourceInputs.forEach(elem => {
            if (elem.value == 'github') elem.checked = true
        })
    }
    
}

/* функции для тегов API */

function setTegAPI(){
    state.teg = Array.from(tegs).filter(elem => elem.selected)[0].value;
    teg = state.teg;
    setBg();
}


function setLocalStorageTeg(){
    localStorage.setItem('teg', Array.from(tegs).filter(elem => elem.selected)[0].value)
}

function getLocalStorageTeg(){
    if (localStorage.getItem('teg')) {
        tegs.forEach(elem => {
            if (elem.value == localStorage.getItem('teg')) {
                elem.selected = true;
                teg = localStorage.getItem('teg')   
            }
        })
    } else {
        teg.forEach(elem => {
            if (elem.value == 'nature') elem.selected = true
        })
    }
    
}


/* скрытие блоков */
function setLocalStorageHidden() {
    localStorage.setItem('state', JSON.stringify(Array.from(state.blocks)))
}

function getLocalStorageHidden() {
    state.blocks = new Set(JSON.parse(localStorage.getItem('state')));
}



/* событие для кнопки открытия настроек */
settingsButton.addEventListener('click', () => {
    settingsList.classList.toggle('_active');
    overlay.classList.toggle('_invisible');
})


/* клик вне блока настроек закрывает настройки */
overlay.addEventListener('click', () => {
    settingsList.classList.remove('_active');
    overlay.classList.add('_invisible');
})


/* добавление событий установки языка */
langInputs.forEach(elem => {
    elem.addEventListener('input', setLang);
})


/* добавление событий установки источника изображений */
imgSourceInputs.forEach(elem => {
    elem.addEventListener('input', setImgSource);
})


/* события для установки тега изображений */
document.querySelector('select').addEventListener('change', setTegAPI)

/* события для скрытия блоков */
hiddenBlocksInputs.forEach(elem => {
    elem.addEventListener('click', () => {
        if (elem.checked) {
            document.querySelector(`#${elem.value}`).classList.add('_invisible');
            state.blocks.add(`${elem.value}`);
        } else {
            document.querySelector(`#${elem.value}`).classList.remove('_invisible');
            state.blocks.delete(`${elem.value}`)
        }
    })
})


window.addEventListener('beforeunload', ()=>{
    setLocalStorageLang();
    setLocalStorageHidden();
    setLocalStorageImgSource();
    setLocalStorageTeg()
});


window.addEventListener('load', () => {
    getLocalStorageLang();
    setLang();
    getLocalStorageImgSource();
    getLocalStorageTeg();
    getLocalStorageHidden();
    setBg();

    Array.from(state.blocks).forEach(elem => {
        document.querySelector(`input[value =${elem}]`).checked = true;
        document.querySelector(`#${elem}`).classList.add('_invisible')
    });
});
