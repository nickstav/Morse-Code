<script>
  import ConnectButton from './ConnectButton.svelte';
</script>

<style>
  #topBar {
    width: 100%;
    height: 50px;
    background-color: #000000;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  h1 {
    font-size: 25px;
  }
</style>

<div id="topBar">
	<h1>Morse Code Translator</h1>
  <ConnectButton/>
</div>
