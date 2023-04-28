import playList from "./playList.js";
const playPrevBtn = document.querySelector('.play-prev');
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector('.play-next');
const musicList = document.querySelector('.play-list');

const audio = new Audio();

let isPlay = false; //флаг
let playNum = 0;


function play() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    playBtn.classList.add('pause');
    isPlay = true;
    list.forEach(elem => elem.classList.remove('item-active'));
    list[playNum].classList.add('item-active');
}


function pause() {
    audio.pause();
    playBtn.classList.remove('pause');
    isPlay = false;
}


function playAudio() {
    if (!isPlay) {
        play()
    } else {
        pause()
    }
}


function playNextAudio() {
    if (playNum < playList.length - 1) {
        playNum++;
    } else {
        playNum = 0;
    }
    play()
}


function playPrevAudio() {
    if (playNum > 0) {
        playNum--;
    } else {
        playNum = playList.length - 1;
    }
    play()
}


playList.forEach(elem => {
    const li = document.createElement('li');
    li.textContent = elem.title;
    li.classList.add('play-item');
    musicList.append(li)
})

const list = document.querySelectorAll('.play-item');


playBtn.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNextAudio);
playPrevBtn.addEventListener('click', playPrevAudio);
audio.addEventListener('ended', playNextAudio);