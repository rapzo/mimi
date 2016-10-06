const mimi = require('../mimi');

const keywords = ['f\\*\\*\\* you', 'f\\*\\*\\* u', 'boob', 'tit'];

function howDareYouInsults (transcript) {
    const re1 = new RegExp(`${keywords[0]}(.*)`, 'i');
    const re2 = new RegExp(`${keywords[1]}(.*)`, 'i');

    return re1.test(transcript) || re2.test(transcript);
}

function imatureInsults (transcript) {
    const re1 = new RegExp(`${keywords[1]}(.*)`, 'i');
    const re2 = new RegExp(`${keywords[2]}(.*)`, 'i');

    return re1.test(transcript) || re2.test(transcript);
}

module.exports = {
    keywords,
    fn: (transcript) => {
        if (howDareYouInsults(transcript)) {
            mimi.get('how-dare-you').play();
        }

        if (imatureInsults(transcript)) {
            mimi.get('imature').play();
        }
    }
};
