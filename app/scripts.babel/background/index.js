'use strict';

const listener = require('./listener');

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.commands.onCommand.addListener((command) => {
    if (command === 'activate-mimi') {
        chrome.browserAction.setBadgeText({ text: ' ' });
        chrome.browserAction.setBadgeBackgroundColor({ color: '#FF0000' });

        listener().then(() => {
            chrome.browserAction.setBadgeText({ text: '' });
        }).catch(() => {
            chrome.browserAction.setBadgeText({ text: '' });
        });
    }
});
