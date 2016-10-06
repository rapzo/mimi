const _ = require('lodash');

const bookmark = require('./bookmark');
const screenshot = require('./screenshot');
const search = require('./search');

const commands = [bookmark, screenshot, search];

function isMimiCommand(transcript) {
    const prefix = ['ok', 'okay', 'hey'].join('|');

    const re = new RegExp(`(${prefix})?mimi(.*)`, 'i');
    return re.test(transcript);
}

function getCommand(transcript) {
    return commands.find((command) => {
        return command.keywords.some((keyword) => {
            const re = new RegExp(`${keyword}(.*)`, 'i');
            const result = re.exec(transcript);

            return !!result;
        });
    });
}

exports.getGrammar = function getGrammar() {
    let items = ['mimi'];
    commands.forEach((item) => {
        items = _.concat(items, item.keywords);
    });
    return items;
}

exports.execute = function execute(transcript) {
    return new Promise((resolve, reject) => {
        if (!isMimiCommand(transcript)) { return reject(); }

        const command = getCommand(transcript);
        command ? resolve(command.fn(transcript)) : reject();
    });
}
