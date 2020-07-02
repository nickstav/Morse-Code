<script>
  import { startApp, quitApp } from '../Morse/arduino';
  import { appStatus } from '../Morse/store'
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
  <button class="quit" on:click={quitApp}>Disconnect</button>
{:else}
  <button class="connect" on:click={startApp}>Connect</button>
{/if}
