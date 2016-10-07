'use strict';

const element = document.getElementById('is-listening');
const log = document.getElementById('dialog-log');
let previousSentence = '';
let previousImage = '';

function createImage (dataURL) {
    const image = document.createElement('img');
    image.width = 200;
    image.src = dataURL;

    return image;
}

function update() {
    const isListening = localStorage.getItem('listening');
    const sentence = localStorage.getItem('sentence');
    const image = localStorage.getItem('image');
    const value = isListening === 'true' ? 'Listening...' : 'Waiting..';

    element.innerHTML = value;
    if (sentence && previousSentence !== sentence) {
        previousSentence = sentence;
        const li = document.createElement('li');
        li.innerHTML = sentence;
        log.appendChild(li);
    }

    if (image && previousImage !== image) {
        previousImage = image;

        const li = document.createElement('li');
        li.appendChild(createImage(image));
        log.appendChild(li);
    }
}

setInterval(update, 200);
