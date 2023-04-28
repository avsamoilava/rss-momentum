import {lang} from './settings.js';

const keyAPI = 'b4df00b7b072a6637dfa941be6688b65';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const description = {
    'ru': ['Скорость ветра', 'м/с', 'Влажность'],
    'en': ['Wind speed', 'm/s', 'Humidity']
}
const city = document.querySelector('.city');
const errorBox = document.querySelector('.weather-error');

let cityName = city.value;


export async function getWeather() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${keyAPI}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    errorBox.textContent = '';
    weatherIcon.className = 'weather-icon owf'; //* сбрасываем иконку для корректного отображения
    weatherIcon.classList.add(`owf-${data.weather[0].id}`); //* отображаем иконку
    temperature.textContent = `${Math.round(data.main.temp)}°C`; //* отображаем температуру
    weatherDescription.textContent = data.weather[0].description; //* отображаем описание погоды
    windSpeed.textContent = `${description[lang][0]}: ${Math.round(data.wind.speed)} ${description[lang][1]}`; //* отображаем скорость ветра
    humidity.textContent = `${description[lang][2]}: ${Math.round(data.main.humidity)}%` //* отображаем влажность воздуха

    } catch (err){
        errorBox.textContent = lang === 'en' ? 'Incorrect input' : 'Некорректный ввод'
    }
    
}


function setLocalStorageCity() {
    if (city.value) localStorage.setItem('city', city.value);
}


function getLocalStorageCity() {
    if (localStorage.getItem('city')) {
        cityName = localStorage.getItem('city');
        city.value = cityName;
        //getWeather();
    } else {
        cityName = lang === 'en' ? 'Minsk' : 'Минск';
        city.value = cityName;
        //getWeather();
    }
}


city.addEventListener('change', () => {
    cityName = city.value;
    getWeather();
});

window.addEventListener('beforeunload', setLocalStorageCity);
window.addEventListener('load', getLocalStorageCity);
