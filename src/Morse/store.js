import { writable, derived } from 'svelte/store';
import { decodeMorse } from './decoder';

 const defaultValues = {
  isReady: false,
  message: '',
  isPaused: false,
  messageIsFinished: false,
  timer: 0,
  showMessages: false,
  unitInterval: 300,
  recordTime: 15
};

function setUpStore() {

  const { subscribe, set, update } = writable(defaultValues);

  function startApp() {
    update(status => {
      return {
        ...status,
        isReady: true
      };
    });
  }

  function quitApp() {
    set(defaultValues);
  }

  function updateMessage(string) {
    update(status => {
      return {
        ...status,
        message: string
      };
    });
  }

  function resetMessage() {
    update(status => {
      return {
        ...status,
        isPaused: false,
        message: '',
        messageIsFinished: false,
        timer: 0,
        showMessages: false
      };
    });
  }

  function pauseAndResumeMessage() {
    update(status => {
      return {
        ...status,
        isPaused: !status.isPaused
      };
    });
  }

  function submitMessage() {
    update(status => {
      return {
        ...status,
        messageIsFinished: true
      };
    });
  }

  function runTimer(startTime) {
    update(status => {
      return {
        ...status,
        timer: (Date.now() - startTime) / 1000 // as Date.now() format is in ms
      };
    });
  }

  function pauseTimer() {
    update(status => {
      return {
        ...status,
        timer: status.timer
      };
    });
  }

  function showTranslations() {
    update(status => {
      return {
        ...status,
        showMessages: true
      };
    });
  }

  function newLetter() {
    update(status => {
      return {
        ...status,
        message: status.message + ' '
      };
    });
  }

  function newWord() {
    update(status => {
      return {
        ...status,
        message: status.message + '/'
      };
    });
  }

  function addDot() {
    update(status => {
      return {
        ...status,
        message: status.message + '.'
      };
    });
  }

  function addDash() {
    update(status => {
      return {
        ...status,
        message: status.message + '-'
      };
    });
  }


  return {
		subscribe,
    set,
		startApp,
		quitApp,
    updateMessage,
    resetMessage,
    pauseAndResumeMessage,
    submitMessage,
    runTimer,
    pauseTimer,
    showTranslations,
    newLetter,
    newWord,
    addDot,
    addDash
	};

}

const appStatus = setUpStore();

const messageStarted = derived(
  appStatus,
  $appStatus => {
    if ($appStatus.message.length > 0) {
      return true
    } else {
      return false
    }
  }
)

const liveTranslation = derived(
  appStatus,
  $appStatus => {
    return decodeMorse($appStatus.message);
  }
)


export { appStatus, messageStarted, liveTranslation }