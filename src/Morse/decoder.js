import { alphabet } from './alphabet';

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

  export { decodeMorse }