const mimi = require('../mimi');

const keywords = ['f\\*\\*\\* you', 'f\\*\\*\\* u', 'boob', 'tit', 'let\'s party'];

function isHowDareYouInsults (transcript) {
    const re1 = new RegExp(`${keywords[0]}(.*)`, 'i');
    const re2 = new RegExp(`${keywords[1]}(.*)`, 'i');

    return re1.test(transcript) || re2.test(transcript);
}

function isImatureInsults (transcript) {
    const re1 = new RegExp(`${keywords[2]}(.*)`, 'i');
    const re2 = new RegExp(`${keywords[3]}(.*)`, 'i');

    return re1.test(transcript) || re2.test(transcript);
}

function isParty (transcript) {
    const re = new RegExp(`${keywords[4]}(.*)`, 'i');
    return re.test(transcript);
}

module.exports = {
    keywords,
    fn: (transcript) => {
        if (isHowDareYouInsults(transcript)) {
            mimi.get('how-dare-you').play();
        }

        if (isImatureInsults(transcript)) {
            mimi.get('imature').play();
        }

        if (isParty(transcript)) {
            mimi.get('horn').play();
        }
    }
};
