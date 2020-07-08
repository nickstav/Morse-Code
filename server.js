/* ----------------------Get required npm packages------------------------------*/

const express = require("express");
const cors = require("cors");
const five = require("johnny-five");

/* -----------------------Set up server on a local port------------------------ */

const app = express();
const port = 4000;
app.use(cors());
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

/* ----------------------Set up the Arduino board------------------------------ */

const board = new five.Board();
let button;

const buttonPin = 7;
const buzzerPin = 3;

// define the time (in ms) of unit interval (equal to 1 'dot')
let unitInterval = 300;

let arduinoConnected = false;
let messageStarted = false;
let pauseAdjustment = false;

let message = '';
let storedMessage = '';

// variable to track the time since button was last pressed
let lastEntry;

board.on("ready", setUpArduino);

board.on("close", notifyBoardHasDisconnected);

/* --------------------Interaction with the front end---------------------------*/

app.get('/startApp', startApp);

app.get('/reset', resetMessage);

app.get('/receiveMessage/:unitInterval', submitMessage);

app.get('/pause', adjustMessageforPauseTime);

/* ------------------async (req, res) Functions---------------------------------*/

async function startApp(_, res) {
  try {
    res.send(arduinoConnected);
  } catch (error) {
    handleError(error);
  };
}

async function resetMessage(_, res) {
  try {
    messageStarted = false;
    message = '';
    storedMessage = '';
    res.send(true);
  } catch (error) {
    handleError(error);
  };
}

async function submitMessage(req, res) {
  try {
    correctForPause();
    const params = req.params;
    unitInterval = params.unitInterval;
    // adjust the holdtime for a dash that was defined at set up
    if (button) {
      button.holdtime = unitInterval * 3;
    }
    res.send(message);
  } catch (error) {
    handleError(error);
  };
}

async function adjustMessageforPauseTime(req, res) {
  try {
    pauseAdjustment = true;
    // save message as it was at the start of the pause period
    storedMessage = message;
    res.send(true);
  } catch (error) {
    handleError(error);
  };
}

/* ----------------------Arduino board functions------------------------------- */

function setUpArduino() {

  console.log('Board connected');
  arduinoConnected = true;

  //set buzzer to simple on/off output
  this.pinMode(buzzerPin, five.Pin.OUTPUT);

  //set up the button (see http://johnny-five.io/examples/button-pullup/)
  button = new five.Button({
    pin: buttonPin,
    isPullup: true,
    holdtime: 3 * unitInterval
  });

  // link buzzer output to whether button is pressed (value 0) or not (value 1)
  this.digitalRead(buttonPin, function(value) {
    if (value === 1) {
      this.digitalWrite(buzzerPin, 0);
    } else {
      if (value === 0) {
        this.digitalWrite(buzzerPin,1);
      };
    };
  })

  button.on("hold", function() {
    checkNewLetterOrWord();
    addDash();
  });

   button.on("press", function() {
    checkNewLetterOrWord();
    addDot();
   });

   button.on("release", function() {
     startTimer();
 });

}


function notifyBoardHasDisconnected() {
  arduinoConnected = false;
  console.log('Board disconnected');
}

/* ----------------------Encode the message-------------------------------------*/

function addDot() {
  message += '.';
}

function addDash() {
  //J-five will recognise a press before the hold condition, so remove the
  // dot and corresponding space from the array
  correctMessage = message.slice(0, -2)
  message = correctMessage + '-';
}

function startTimer() {
  if (message.length > 0) {
    messageStarted = true;
    lastEntry = Date.now();
  };
}

function checkNewLetterOrWord() {
  if (messageStarted) {
    const timeSinceLastEntry = Date.now() - lastEntry;
    if (timeSinceLastEntry > unitInterval * 3 && timeSinceLastEntry < unitInterval * 7) {
      message += ' ';
    } else if (timeSinceLastEntry > unitInterval * 7) {
      message += '/';
    };
  };
}

function correctForPause() {
  // ignore all actions carried out during pause by reverting to saved message
  if (pauseAdjustment) {
    message = storedMessage;
    pauseAdjustment = false;
  };
}

/* -------------------------Handle Errors---------------------------------------*/

function handleError(error) {
  console.error(error);
}
