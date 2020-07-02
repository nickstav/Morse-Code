import { appStatus } from './store'
import { alphabet } from './alphabet';
import { get } from 'svelte/store';

let translatedMessages = [];

let test = '--- --- --- .... / -- -.-- / -. .- -- . / .. ... / -- .- - - / --- --- --- .... / .. / - .... --- ..- --. .... - / .. - / .-- --- ..- .-.. -.. / -... . / ..-. ..- -. / - --- / ... . . / .-- .... .- - / - .... .. ... / ... .- -.-- ... / --- --- --- .... / .. / .- -- / ... --- / -- .- - - .... . .--';


function translateMessage() {
  appStatus.startTranslation();

  let currentInfo = get(appStatus);
  let translation = decodeMorse(currentInfo.message);
  let errorMessage = 'Sorry this message could not be translated. Please check for any errors';

  if (translation.length > 0) {
    translatedMessages.push(translation);
  } else {
    translatedMessages.push(errorMessage);
  }
}

function startNewMessage() {
  appStatus.resetMessage();
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
  return result;
}



export { translatedMessages, translateMessage, startNewMessage }
