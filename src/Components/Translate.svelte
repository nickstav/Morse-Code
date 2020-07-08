<script>
  import { startNewMessage } from '../Morse/translate';
  import { appStatus } from '../Morse/store';
  import { decodedMessages } from './Morse/translatedMessages';
  import { quitApp } from '../Morse/arduino';
</script>

<style>
  #translationText {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  #previousTranslations {
    padding-top: 50px;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 15px;
  }
  #buttons {
    padding-top: 200px;
    padding-bottom: 20px;
    width: 30%;
    height: 5%;
    display: flex;
    justify-content: space-between;
  }
  p.header {
    font-size: 35px;
  }
  p.message {
    font-size: 20px;
  }
  p.listHeader {
    font-size: 25px;
  }
  button {
    font-family: "Lucida Console", Monaco, monospace;
    cursor: pointer;
    border: none;
    background: black;
    color: white;
    height: 50px;
    width: 80px;
  }
  button:hover {
    border: 3px solid white;
  }
</style>


<div id="translationText">
  <p class="header">Translated Message</p>
  <p class="message">"{$appStatus.message}" = {$decodedMessages[$decodedMessages.length - 1]}</p>
</div>

{#if $decodedMessages.length > 1}
  <div id="previousTranslations">
    <p class="listHeader">All Translations</p>
    {#each $decodedMessages as message, messageIndex}
      <p><strong>message {messageIndex + 1}:</strong> {message}</p>
    {/each}
  </div>
{/if}

<div id="buttons">
  <button class="newMessage" on:click={startNewMessage}>New Message</button>
  <button class="quit" on:click={quitApp}>Quit App</button>
</div>
