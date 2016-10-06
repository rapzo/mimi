/**
 * https://developer.chrome.com/extensions/bookmarks
 * http://stackoverflow.com/questions/1979583/how-can-i-get-the-url-for-a-google-chrome-tab
 */

function getCurrentURL() {
    const query = {
        active: true,
        lastFocusedWindow: true
    };

    return new Promise((resolve) => {
        chrome.tabs.query(query, (tabs) => resolve(tabs[0].url));
    });
}

function bookmark(url) {
    const params = {
        parentId: bookmarkBar.id,
        url
    };

    return new Promise((resolve) => {
        chrome.bookmarks.create(params, (bookmark) => {
            resolve(bookmark)
        });
    });
}

module.exports = {
    keywords: ['bookmark'],
    fn: () => {
        console.log('saving bookmark');
        return getCurrentURL().then((url) => bookmark(url));
    }
};
