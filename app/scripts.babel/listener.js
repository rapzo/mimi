const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

function listen() {
    console.log('listening...');

    const grammar = `#JSGF V1.0; grammar keyword; public <keyword> = ${commandGetGrammar().join('|')};`;
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

        commandExecute(speechResult.transcript, speechResult.confidence)
            .then(() => console.log('action performed'))
            .catch(() => console.log('I didnt recognise that command.'));
    };

    recognition.onnomatch = () => {
        console.log('I didnt recognise that command.');
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.log('Error occurred in recognition: ' + event.error);
    };
}
