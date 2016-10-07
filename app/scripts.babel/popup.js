'use strict';

const element = document.getElementById('is-listening');
const log = document.getElementById('dialog-log');
let previousSentence = '';

function update() {
    const isListening = localStorage.getItem('listening');
    const sentence = localStorage.getItem('sentence');
    const value = isListening === 'true' ? 'LISTENING' : 'NAO TOU A OUVIR NAO TOU A OUVIR';

    element.innerHTML = value;
    if (sentence && previousSentence !== sentence) {
        previousSentence = sentence;
        const li = document.createElement('li');
        li.innerHTML = sentence;
        log.appendChild(li);
    }
}

setInterval(update, 200);
