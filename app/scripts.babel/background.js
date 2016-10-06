'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({ text: '\'Allo' });

chrome.commands.onCommand.addListener((command) => {
    console.log('Command:', command);
});

// console.log('\'Allo \'Allo! Event Page for Browser Action');
