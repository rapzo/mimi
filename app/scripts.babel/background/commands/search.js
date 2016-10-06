function search(term) {
    return new Promise((resolve) => {
        chrome.tabs.create({
            url: `http://www.google.com/search?as_q=${term}`
        });

        resolve(url);
    });
}

module.exports = {
    keywords: ['search'],
    fn: (transcript) => {
        const result = /search(.*)/.exec(transcript);

        if (!result) {
            throw 'something went wrong';
        }

        return search(result[1]);
    }
};
