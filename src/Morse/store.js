import { writable, derived } from 'svelte/store';

 const defaultValues = {
  isReady: false,
  message: '',
  isPaused: false,
  messageIsFinished: false,
  timer: 0,
  isTranslating: false,
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
        isTranslating: false
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

  function startTranslation() {
    update(status => {
      return {
        ...status,
        isTranslating: true
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
    startTranslation
	};

}

export const appStatus = setUpStore();
