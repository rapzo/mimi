const usermedia = require('../../common/usermedia.js');

module.exports = {
    keywords: ['screenshot'],
    fn: () => {
        console.log('taking screenshot');
        chrome.desktopCapture.chooseDesktopMedia(['screen', 'window'], (e) => {
            const options = {
                mandatory: {
                    chromeMediaSource: 'desktop',
                    chromeMediaSourceId: e,
                    maxWidth: 1280,
                    maxHeight: 720
                },
                optional: []
            }
            usermedia.getImage(options);
        });
    }
};
