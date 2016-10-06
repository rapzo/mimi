const commands = require('./commands');
const mimi = require('./mimi');

module.exports = function listen() {

    return new Promise((resolve, reject) => {
        console.log('listening...');
        mimi.get('hello').play();

        const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
        const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
        const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

        const grammar = `#JSGF V1.0; grammar keyword; public <keyword> = ${commands.getGrammar().join('|')};`;
        const recognition = new SpeechRecognition();
        const speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        recognition.grammars = speechRecognitionList;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0];

            console.log(speechResult.transcript);
            commands.execute(speechResult.transcript, speechResult.confidence)
                .then(() => resolve('action performed'))
                .catch(() => {
                    mimi.get('huh').play();
                    reject('I didnt recognise that command.')
                });
        };

        recognition.onnomatch = () => {
            reject('I didnt recognise that command.');
        };

        recognition.onspeechend = () => {
            recognition.stop();
            resolve();
        };

        recognition.onerror = (event) => {
            reject('Error occurred in recognition: ' + event.error);
        };
    });
}
