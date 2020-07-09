import { appStatus, liveTranslation } from './store';
import { decodedMessages } from './translatedMessages';
import { get } from 'svelte/store';

// test morse message
// let test = '--- --- --- .... / -- -.-- / -. .- -- . / .. ... / -- .- - - / --- --- --- .... / .. / - .... --- ..- --. .... - / .. - / .-- --- ..- .-.. -.. / -... . / ..-. ..- -. / - --- / ... . . / .-- .... .- - / - .... .. ... / ... .- -.-- ... / --- --- --- .... / .. / .- -- / ... --- / -- .- - - .... . .--';

function startNewMessage() {
  appStatus.resetMessage();
  console.debug('new message started');
}

function saveMessage() {
  appStatus.showTranslations();

  let currentMessage = get(liveTranslation);
  let errorMessage = 'Sorry this message could not be translated. Please check for any errors';

  if (currentMessage.length > 0) {
    decodedMessages.addMessage(currentMessage);
  } else {
    decodedMessages.addMessage(errorMessage);
  }

  console.debug('message saved');
}

export { saveMessage, startNewMessage }
