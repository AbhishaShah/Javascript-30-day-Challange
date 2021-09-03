const playSound = e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); // get audio element
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`); // get key DOM element

    if(!audio) return; // if element not found then return
    audio.currentTime = 0; // rewind to start
    audio.play();
    key.classList.add("playing"); // add animation class
} 

function removeTransition(e) {
   if(e.propertyName !== "transform") return;
   this.classList.remove("playing");
}

const createDrumNotes = drumKeys => {
    let drumNotes = [];
    drumKeys.forEach((key) => {

        if (!Array.isArray(drumNotes[key.getAttribute('data-name')]) ) {
            drumNotes[key.getAttribute('data-name')] = [];
        }
        drumNotes[key.getAttribute('data-name')]= {keyCode:key.getAttribute('data-key')};     
    });
    return drumNotes;
}

const allKeys = document.querySelectorAll(".key");
allKeys.forEach(key => key.addEventListener('transitionend',removeTransition));
window.addEventListener('keydown',playSound);

let isAutoDrumpPlaying = false;
let interval; // to manage start/stop auto drum audio
let bpm = 10; // bits per minute
const autoDrumButton = document.getElementById("playAutoDrum");

const playAutoDrum = e => {
    autoDrumButton.value = isAutoDrumpPlaying ? 'Start Audio' : 'Stop Audio';
    if(isAutoDrumpPlaying){
        stopAudio();
    } else {
        startAudio();
    }
    isAutoDrumpPlaying = !isAutoDrumpPlaying;
}

const startAudio = () => {
    interval = setInterval( () => {
        let drumNotescode = createDrumNotes(allKeys);
        const randomKeyCode = Math.floor(Math.random() * Object.keys(drumNotescode).length); // get random key to play 
        playSound(drumNotescode[Object.keys(drumNotescode)[randomKeyCode]]); // pass keycode

        if(!isAutoDrumpPlaying) stopAudio();

    }, (1500 / bpm));
}
const stopAudio = () => {
    clearInterval(interval);
}
autoDrumButton.addEventListener('click',playAutoDrum);