const commands = require('./commands');
const mimi = require('./mimi');

let dialog;

function clear() {
    localStorage.setItem('listening', false);
    setTimeout(() => {
        localStorage.setItem('sentence', '');
        localStorage.setItem('image', '');
    }, 500);
}

module.exports = function listen() {

    return new Promise((resolve, reject) => {
        console.log('listening...');
        // mimi.get('hello').play();

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

        localStorage.setItem('listening', true);

        if (!dialog) {
            dialog = window.open(
                'popup.html',
                'extension_popup',
                'width=300,height=400,status=no,scrollbars=yes,resizable=no'
            );
        }

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0];
            localStorage.setItem('sentence', speechResult.transcript);

            console.log(speechResult.transcript);
            commands.execute(speechResult.transcript, speechResult.confidence)
                .then(() => {
                    clear();
                    resolve('action performed');
                })
                .catch((err) => {
                    clear();

                    mimi.get('huh').play();
                    console.log(err);
                    reject('I didnt recognise that command. ', err);
                });
        };

        recognition.onnomatch = () => {
            clear();

            reject('I didnt recognise that command.');
        };

        recognition.onspeechend = () => {
            clear();

            recognition.stop();
            resolve();
        };

        recognition.onerror = (event) => {
            clear();

            reject('Error occurred in recognition: ' + event.error);
        };
    });
}
