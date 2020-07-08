	import { appStatus } from './store';
	import { decodedMessages } from './translatedMessages';
	import { get } from 'svelte/store';

	// global variable to run the recording via setInterval across functions
	let currentRecording;

/*--------Checking Arduino Connection & Starting/Quitting the App-------------*/

async function checkConnection(address) {
  try {
    const response = await fetch(address);
    const connectionStatus = await response.json();
    return connectionStatus;
  } catch (error) {
    handleError(error);
  };
}

async function startApp() {
  const serverAddress = 'http://localhost:4000/startApp';
  const arduinoConnected = await checkConnection(serverAddress);
  if (arduinoConnected) {
    appStatus.startApp();
  } else {
    alert('No Arduino detected. Please connect your device');
  };
}

function quitApp() {
  const confirmation = confirm('Are you sure you want to quit?');
  if (confirmation) {
	appStatus.quitApp();
	decodedMessages.resetStoredMessages();
  };
}

/*------------Recieve the morse code message from the server------------------*/

async function getMessage() {
	let currentStatus = get(appStatus);
	let unitIntervalParam = `${currentStatus.unitInterval}`
	let serverAddress = 'http://localhost:4000/receiveMessage/' + unitIntervalParam;
	try {
		const response = await fetch(serverAddress);
		const receivedMessage = await response.text();
		return receivedMessage;
	} catch (error) {
		handleError(error);
	};
}


/*----------Tell the server to clear the message to start again---------------*/

async function resetServerMessage() {
	const serverAddressReset = 'http://localhost:4000/reset';
	const response = await fetch(serverAddressReset);
	if (!response) {
		handleError(error);
	}
}


/*--Record the message for set time & allow to pause/resume/finish recording--*/

async function recordMessage(startTime) {
	let currentStatus = get(appStatus);
	appStatus.runTimer(startTime);
	if (currentStatus.timer < currentStatus.recordTime) {
		const currentMessage = await getMessage();
		appStatus.updateMessage(currentMessage);
	} else {
		clearInterval(currentRecording);
		appStatus.submitMessage()
	};
}

 async function startRecording() {
	clearInterval(currentRecording);
	resetServerMessage();
	appStatus.resetMessage();
	const startTime = Date.now();
 	currentRecording = setInterval(()=>{recordMessage(startTime)}, 100); //update every 100ms
}

async function sendPauseMessageToServer() {
	const serverAddress = 'http://localhost:4000/pause'
	const response = await fetch(serverAddress);
	if (!response) {
		handleError(error);
	}
}

async function pauseRecording() {
	sendPauseMessageToServer();
	clearInterval(currentRecording);
	appStatus.pauseAndResumeMessage();
}

async function resumeRecording() {
	let currentStatus = get(appStatus);
	const startTime = Date.now() - (currentStatus.timer * 1000); // convert current time to ms (same as Date.now())
	currentRecording = setInterval(()=>{recordMessage(startTime)}, 100); //update every 100ms
	appStatus.pauseAndResumeMessage();
}

async function finishRecording() {
	appStatus.submitMessage();
	clearInterval(currentRecording);
}

function handleError(error) {
	console.error(error);
  }

export { startApp, quitApp, startRecording, pauseRecording, resumeRecording, finishRecording }
