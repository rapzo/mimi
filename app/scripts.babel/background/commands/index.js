const _ = require('lodash');

const bookmark = require('./bookmark');
const screenshot = require('./screenshot');
const search = require('./search');
const selfie = require('./selfie');
const sounds = require('./sounds');
const youtube = require('./youtube');

const commands = [
  bookmark,
  screenshot,
  search,
  selfie,
  sounds,
  youtube
];

function isMimiCommand(transcript) {
    const prefix = ['ok', 'okay', 'hey'].join('|');
    const ids = ['meetme', 'meet me', 'mimi', 'mini'].join('|');

    const re = new RegExp(`(${prefix})?${ids}(.*)`, 'i');
    return re.test(transcript);
}

function getCommand(transcript) {
    return commands.find((command) => {
        return command.keywords.some((keyword) => {
            const re = new RegExp(`${keyword}(.*)`, 'i');
            return re.test(transcript);
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
        console.log(command)
        command ? resolve(command.fn(transcript)) : reject();
    });
}
