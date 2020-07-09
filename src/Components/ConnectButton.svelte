<script>
  import { startApp, quitApp } from '../Morse/morse';
  import { appStatus } from '../Morse/store';
</script>

<style>
  button {
    height: 40px;
    width: 70px;
    font-size: 10px;
    color: white;
    background: black;
    border: 1px solid white;
    cursor: pointer;
    text-align: center;
  }
  button:hover {
    border: 3px solid white;
  }
</style>


{#if $appStatus.isReady}
  <button class="quit" on:click={quitApp}>Quit</button>
{:else}
  <button class="start" on:click={startApp}>Start</button>
{/if}
