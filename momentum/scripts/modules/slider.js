import {
    imgSource
} from "./settings.js"
import { teg } from "./settings.js";

const prevBtn = document.querySelector('.slide-prev');
const nextBtn = document.querySelector('.slide-next');

let randomNum = '';


function getRandomNum() {
    randomNum = Math.ceil(Math.random() * 20).toString().padStart(2, '0');
}


function getTimeOfDayEn() {
    const date = new Date();
    const hours = date.getHours();
    let partsOfDay = ['night', 'morning', 'afternoon', 'evening'];

    return partsOfDay[Math.floor(hours / 6)];
}


export function setBg() {
    let img = new Image();
    let timeOfDay = getTimeOfDayEn();
    let url;
    if (imgSource === 'github') {
        url = `https://raw.githubusercontent.com/avsamoilava/momentum-images/assets/images/${timeOfDay}/${randomNum}.jpg`;
        img.src = url;
        img.onload = () => {
            document.body.style.backgroundImage = `url('${url}')`;
        }
    } else
    if (imgSource === 'unsplash') {
        fetch(`https://api.unsplash.com/photos/random?query=${teg}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`)
            .then(res => res.json())
            .then(data => {
                url = data.urls.regular;
                img.src = url;
                img.onload = () => {
                    document.body.style.backgroundImage = `url('${url}')`;
                }
            });
    } else
    if (imgSource === 'flickr') {
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=8b802a2a5f56fba3c4ba24d202c6cc9a&tags=${teg}&extras=url_l&format=json&nojsoncallback=1`)
            .then(res => res.json())
            .then(data => {
                url = data.photos.photo[Math.ceil(Math.random() * 100)].url_l;
                img.src = url;
                img.onload = () => {
                    document.body.style.backgroundImage = `url('${url}')`;
                }
            });
    }

}


function getSlideNext() {
    if (imgSource === 'github') {
        if (+randomNum < 20) {
            randomNum = (+randomNum + 1).toString().padStart(2, '0');
        } else randomNum = '01';
    }

    setBg();
}


function getSlidePrev() {
    if (imgSource === 'github') {
        if (+randomNum > 1) {
            randomNum = (+randomNum - 1).toString().padStart(2, '0');
        } else randomNum = '20';
    }
    setBg();
}

getRandomNum();


nextBtn.addEventListener('click', getSlideNext);
prevBtn.addEventListener('click', getSlidePrev);