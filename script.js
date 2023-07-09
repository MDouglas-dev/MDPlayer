const player = document.querySelector("#audio");
const musicName = document.querySelector(".play-music--name");
const musicImage = document.querySelector(".play-info-img");
const bandName = document.querySelector(".play-band--name");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const  currentTime = document.querySelector("#currentTime");
const  duration = document.querySelector("#duration");
const  progressBar = document.querySelector(".progress-bar");

import songs from "./songs.js";

const textButtonPlay = '<ion-icon name="play"></ion-icon>';
const textButtonPause = '<ion-icon name="pause"></ion-icon>';

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    }else {
        playPauseButton.innerHTML = textButtonPlay;
        player.pause();
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted ? (player.currentTime / durationFormatted) * 100 : 0;

    progressBar.value = progressWidth;

    if (progressWidth === 100) {
        playPauseButton.innerHTML = textButtonPlay;          
        prevNextMusic();
    }
};

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

const prevNextMusic = (type = "next") => {
    if ((type == "next" && index + 1 === songs.length) || type === "init") {
        index = 0;
    } else if (type == "prev" && index === 0) {
        index = songs.length;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
    bandName.innerHTML = songs[index].band;
    musicImage.src = songs[index].image;

    if (type !== "init") {
        playPause();
    }

    updateTime();
};


prevNextMusic("init");