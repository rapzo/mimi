/**
 * https://developer.chrome.com/extensions/bookmarks
 * http://stackoverflow.com/questions/1979583/how-can-i-get-the-url-for-a-google-chrome-tab
 */

const mimi = require('../mimi')

function getCurrentURL() {
    const query = {
        active: true,
        lastFocusedWindow: true
    };

    return new Promise((resolve, reject) => {
        chrome.tabs.query(query, (tabs) => {
          try {
            resolve(tabs[0])
          } catch (e) {
            mimi.get('wtf').play()
            reject('You are looking at the console damn it')
          }
        });
    });
}

function bookmark(tab) {
  console.log(tab)
    return new Promise((resolve) => {
      chrome.bookmarks.create({
        url: tab.url,
        title: tab.title
      }, (bookmark) => {
          resolve(bookmark)
      });
    });
}

module.exports = {
  keywords: ['bookmark'],
  fn: () => getCurrentURL().then((tab) => bookmark(tab))
};
