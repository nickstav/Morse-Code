	import { appStatus, messageStarted } from './store';
	import { decodedMessages } from './translatedMessages';
	import { get } from 'svelte/store';

	// global variable to run the recording via setInterval across functions
	let currentRecording;

	// global variables to time button pressed / unpressed
	let startOfPress, lastEntry;

	let audio = new Audio('../audio/morse_beep.wav');

/*----------------------Starting/Quitting the App-----------------------------*/

function startApp() {
    appStatus.startApp();
}

function quitApp() {
  const confirmation = confirm('Are you sure you want to quit?');
  if (confirmation) {
	appStatus.quitApp();
	decodedMessages.resetStoredMessages();
  };
}

/*-------Update the message from the store with each button press/hold------*/

function startNewCharacter() {
	checkNewLetterOrWord();
	startButtonDownTimer();
	audio.play();
}

function updateMessage() {
	addCharacter();
	startButtonUpTimer();
	//allow enough time for a 'beep' to play for a short click
	setTimeout(()=>{audio.pause()}, 100);
	audio.currentTime = 0;
}

function addCharacter() {
	let currentStatus = get(appStatus);
	let unitInterval = currentStatus.unitInterval;

	const timePressed = Date.now() - startOfPress;

	if (timePressed < unitInterval * 3) {
		appStatus.addDot();
	} else {
		appStatus.addDash();
	};
}

function checkNewLetterOrWord() {
	let currentStatus = get(appStatus);
	let unitInterval = currentStatus.unitInterval;
	let IsMessageStarted = get(messageStarted);

	if (IsMessageStarted) {
		const timeSinceLastEntry = Date.now() - lastEntry;
		if (timeSinceLastEntry > unitInterval * 3 && timeSinceLastEntry < unitInterval * 7) {
			appStatus.newLetter();
		} else if (timeSinceLastEntry > unitInterval * 7) {
			appStatus.newWord();
		};
	}
}

function startButtonUpTimer() {
	lastEntry = Date.now();
}

function startButtonDownTimer() {
	startOfPress = Date.now();
}

/*--Record the message for set time & allow to pause/resume/finish recording--*/

function recordMessage(startTime) {
	let currentStatus = get(appStatus);
	appStatus.runTimer(startTime);
	if (currentStatus.timer > currentStatus.recordTime) {
		clearInterval(currentRecording);
		appStatus.submitMessage();
	};
}

 function startRecording() {
	clearInterval(currentRecording);
	appStatus.resetMessage();
	const startTime = Date.now();
 	currentRecording = setInterval(()=>{recordMessage(startTime)}, 100); //update every 100ms
}

function pauseRecording() {
	clearInterval(currentRecording);
	appStatus.pauseAndResumeMessage();
}

function resumeRecording() {
	let currentStatus = get(appStatus);
	const startTime = Date.now() - (currentStatus.timer * 1000); // convert current time to ms (same as Date.now())
	currentRecording = setInterval(()=>{recordMessage(startTime)}, 100); //update every 100ms
	appStatus.pauseAndResumeMessage();
	//reset the timer for new letter or word
	lastEntry = Date.now();
}

function finishRecording() {
	appStatus.submitMessage();
	clearInterval(currentRecording);
}

export { startApp, quitApp, startNewCharacter, updateMessage, startRecording, pauseRecording, resumeRecording, finishRecording }
