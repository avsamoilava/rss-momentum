import {lang} from './settings.js';

const changeQuoteButton = document.querySelector('.change-quote');
const quoteTextBox = document.querySelector('.quote');
const quoteAuthorBox = document.querySelector('.author');

let randomQuote = 0;

function getRandomQuote() {
    randomQuote = Math.ceil(Math.random() * 20);
}

getRandomQuote();

export async function getQuotes() {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    let quotesList = {};
    data.forEach(element => {
        let keys = Object.keys(element);
        if (keys.includes(lang)) quotesList = element;
    });

    quoteTextBox.textContent = quotesList[lang][randomQuote].text;
    quoteAuthorBox.textContent = quotesList[lang][randomQuote].author;
}

getQuotes();

changeQuoteButton.addEventListener('click', ()=> {
    getRandomQuote();
    getQuotes();
})
