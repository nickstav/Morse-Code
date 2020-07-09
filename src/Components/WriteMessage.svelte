<script>
  import { startRecording, startNewCharacter, updateMessage, pauseRecording, resumeRecording, finishRecording } from '../Morse/morse';
  import { saveMessage } from '../Morse/translation';
  import { appStatus, liveTranslation } from '../Morse/store';
</script>


<style>
  #instructions {
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  #messageBox {
    background-color: white;
    width: 90%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #input {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #settings {
    padding-top: 30px;
    display: flex;
    justify-content: space-between;
    width: 80%;
  }
  #definitions {
    border: 1px solid white;
    text-align: left;
    padding-right: 10px;
  }
  #buttons {
    padding-top: 20px;
    padding-bottom: 10px;
    width: 30%;
    height: 5%;
    display: flex;
    justify-content: space-between;
  }
  p.message {
    color: black;
    font-size: 25px;
    font-weight: 800;
    padding-bottom: 10px;
  }
  .slider {
  -webkit-appearance: none;
  width: 30%;
  height: 10px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  }
  .slider:hover {
    opacity: 1;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 10px;
    height: 10px;
    background: black;
    cursor: pointer;
  }
  .slider::-moz-range-thumb {
    width: 10px;
    height: 10px;
    background: black;
    cursor: pointer;
  }
  button.morse {
    background-image: url("../buttons/morse.png");
  }
  button.record {
    background-image: url("../buttons/record.png");
  }
  button.pause {
    background-image: url("../buttons/pause.png");
  }
  button.play {
    background-image: url("../buttons/play.png");
  }
  button.submit {
    background-image: url("../buttons/submit.png");
  }
  button {
    border: none;
    cursor: pointer;
    height: 60px;
    width: 60px;
    background-size: 100%;
  }
  button.save {
    background: black;
    color: white;
    height: 40px;
    width: 80px;
  }
  button.save:hover {
    background: none;
    border: 1px solid black;
    color: black;
  }
  button:hover {
    border: 3px solid black;
  }
  button:disabled {
    opacity: 0.3;
  }
</style>


<div id="instructions">
  <h2>Instructions</h2>
  <p>Click the record button below to start your message (up to {$appStatus.recordTime}s)</p>
  <p>Use the morse code machine to enter your message</p>
  <p>You can pause and resume your message at anytime</p>
  <p>Click 'submit' once you have finished your message</p>
  {#if $appStatus.timer > 0}
    <p>{Math.min($appStatus.timer.toFixed(1), $appStatus.recordTime)}s</p>
  {/if}
</div>

<div id="messageBox">
  <p class="message">{$appStatus.message}</p>
  <p class="message">{$liveTranslation}</p>
  {#if $appStatus.messageIsFinished}
    <button class="save" on:click={saveMessage}>Save Message</button>
  {/if}
</div>

<div id="buttons">
  <button class="morse" on:mousedown={startNewCharacter} on:mouseup={updateMessage} disabled={$appStatus.isPaused || $appStatus.messageIsFinished || $appStatus.timer === 0}></button>
  <button class="record" on:click={startRecording}></button>
  {#if !$appStatus.isPaused}
    <button class="pause" on:click={pauseRecording} disabled={$appStatus.timer === 0}></button>
  {:else}
    <button class="play" on:click={resumeRecording}></button>
  {/if}
  <button class="submit" on:click={finishRecording} disabled={$appStatus.timer === 0}></button>
</div>

<div id="settings">
  <div id="input">
    <input type="range" min="100" max="500" bind:value={$appStatus.unitInterval} class="slider">
    <p>One "unit interval" = {$appStatus.unitInterval} milliseconds</p>
  </div>
  <div id="definitions">
    <ul>
      <li>One dot = 1 UI</li>
      <li>One dash = 3 UI</li>
      <li>Pause to start new letter (' ') = 3 UI</li>
      <li>Pause to start new word ('/') = 7 UI</li>
    </ul>
  </div>
</div>
