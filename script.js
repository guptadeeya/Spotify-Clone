console.log("Welcome to spotify");

// Initialize the variables

let songIndex = 0;
let audioElement = new Audio("songs/1.mp3")
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"))

let songs = [

    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: 'covers/cover1.png' },
    { songName: "Shape of you", filePath: "songs/2.mp3", coverPath: 'covers/cover2.png' },
    { songName: "Faded", filePath: "songs/3.mp3", coverPath: 'covers/cover3.png' },
    { songName: "Malang Sajna", filePath: "songs/4.mp3", coverPath: 'covers/cover4.png' },
    { songName: "Baarishein", filePath: "songs/5.mp3", coverPath: 'covers/cover5.png' },
    { songName: "Play Date", filePath: "songs/6.mp3", coverPath: 'covers/cover6.png' }

]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
});
// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})

// Listen to events - Timeupdate is the in built function which updates the time
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')

    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener("change", () => {
    // in below step we're calculating the value of current in number from %
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause")
        element.classList.add("fa-circle-play")

    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener('click', (e) => {
        // console.log(e.target);
        makeAllPlays();

        songIndex = parseInt(e.target.id)
        e.target.classList.remove("fa-circle-play")
        e.target.classList.add("fa-circle-pause")
        audioElement.src = `songs/${songIndex}.mp3`
        masterSongName.innerText = songs[songIndex].songName
        audioElement.currentTime = 0
        audioElement.play()
        gif.style.opacity = 1;

        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
    })
})

document.getElementById("next").addEventListener("click", () => {
    if (songIndex >= 6) {
        songIndex = 0;
    }
    else {
        songIndex += 1
    }

    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()

    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})

document.getElementById("previous").addEventListener("click", () => {
    if (songIndex < 0) {
        songIndex = 5;
    }
    else {
        songIndex -= 1
    }

    audioElement.src = `songs/${songIndex}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()

    masterPlay.classList.remove("fa-circle-play")
    masterPlay.classList.add("fa-circle-pause")
})