import { appStatus } from './store';
import { decodedMessages } from './translatedMessages';
import { alphabet } from './alphabet';
import { get } from 'svelte/store';

// test morse message
// let test = '--- --- --- .... / -- -.-- / -. .- -- . / .. ... / -- .- - - / --- --- --- .... / .. / - .... --- ..- --. .... - / .. - / .-- --- ..- .-.. -.. / -... . / ..-. ..- -. / - --- / ... . . / .-- .... .- - / - .... .. ... / ... .- -.-- ... / --- --- --- .... / .. / .- -- / ... --- / -- .- - - .... . .--';

function translateMessage() {
  appStatus.startTranslation();

  let currentInfo = get(appStatus);
  let translation = decodeMorse(currentInfo.message);
  let errorMessage = 'Sorry this message could not be translated. Please check for any errors';

  if (translation.length > 0) {
    decodedMessages.addMessage(translation);
    console.debug('message successfully translated');
  } else {
    decodedMessages.addMessage(errorMessage);
    console.debug('message could not be translated');
  }
}

function startNewMessage() {
  appStatus.resetMessage();
  console.debug('new message started');
}

function decodeMorse(morseMessage) {
  let words = morseMessage.split('/');
  let letters = words.map(word => word.split(' '));
  let decodedMessage = [];

  for (var i = 0; i < letters.length; i++) {
    decodedMessage[i] = [];
    for (var j = 0; j < letters[i].length; j++) {
      if (alphabet[letters[i][j]]) {
        decodedMessage[i].push(alphabet[letters[i][j]])
      };
    };
  };

  let result =  decodedMessage.map(letter => letter.join('')).join(' ');
  console.debug('morse decode function carried out');
  return result;
}



export { translateMessage, startNewMessage }
