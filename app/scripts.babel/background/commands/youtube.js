/**
 * https://www.googleapis.com/youtube/v3/search?part=snippet&q=cat&key=AIzaSyCCTWI59vpDdhiF87qzEdp0dGrEmCWNxv0
 * http://stackoverflow.com/questions/1979583/how-can-i-get-the-url-for-a-google-chrome-tab
 */
function queryYoutube(query) {
    const key = 'AIzaSyCCTWI59vpDdhiF87qzEdp0dGrEmCWNxv0';
    const baseUrl = 'https://www.googleapis.com/youtube/v3/search';
    const url = `${baseUrl}?part=snippet&q=${query}&key=${key}`;

    return fetch(url).then((result) => result.json());
}

function playRandomVideo(result) {
    const randId = Math.floor(Math.random() * (result.items.length - 1));
    chrome.tabs.create({
        url: `https://www.youtube.com/watch?v=${result.items[randId].id.videoId}`
    });
}

module.exports = {
    keywords: ['youtube'],
    fn: (transcript) => {
        const result = /youtube(.*)/i.exec(transcript);
        if (!result) {
            throw 'something went wrong';
        }

        return queryYoutube(result[1]).then(playRandomVideo);
    }
};
