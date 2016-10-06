'use strict';

const listener = require('./listener');

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.commands.onCommand.addListener((command) => {
    if (command === 'activate-mimi') {
        listener();
    }
});

// console.log('\'Allo \'Allo! Event Page for Browser Action');
