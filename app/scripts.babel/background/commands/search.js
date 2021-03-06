function search(term) {
    return new Promise((resolve) => {
        chrome.tabs.create({
            url: `http://www.google.com/search?as_q=${term}`
        });

        resolve();
    });
}

module.exports = {
    keywords: ['search'],
    fn: (transcript) => {
        const result = /search(.*)/i.exec(transcript);

        if (!result) {
            throw 'something went wrong';
        }

        return search(result[1]);
    }
};
