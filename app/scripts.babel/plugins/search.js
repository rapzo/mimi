function search(term) {
    return new Promise((resolve) => {
        const url = term;
        chrome.tabs.create({ url });
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
