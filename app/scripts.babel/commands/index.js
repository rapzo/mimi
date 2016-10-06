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

function commandGetGrammar() {
    let items = ['mimi'];
    commands.forEach((item) => {
        items = _.concat(items, item.keywords);
    });
    return items;
}

function commandExecute(transcript) {
    return new Promise((resolve, reject) => {
        if (!isMimiCommand(transcript)) { reject(); }

        const command = getCommand(transcript);
        command ? resolve(command.fn(transcript)) : reject();
    });
}
