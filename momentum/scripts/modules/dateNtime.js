import {showGreeting} from "./greetings.js";
import {lang} from "./settings.js"

const time = document.querySelector('.time');
const dateBox = document.querySelector('.date');

function showTime(){
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.innerHTML = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate(){
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long'};
    const currentDate = date.toLocaleDateString(lang, options);
    dateBox.innerHTML = currentDate;
}

showTime();

