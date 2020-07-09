<script>
	import TopBar from './Components/TopBar.svelte';
	import Welcome from './Components/Welcome.svelte';
	import WriteMessage from './Components/WriteMessage.svelte';
	import Translate from './Components/Translation.svelte';
	import { appStatus, liveTranslation } from './Morse/store';
	import { decodedMessages } from './Morse/translatedMessages';
</script>



<style>
	#background {
	position: relative;
	height:100%;
	width:100%;
	background-color: #565656;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}
</style>

<div id="background">
	<TopBar/>
	{#if !$appStatus.isReady}
		<Welcome/>
	{:else if !$appStatus.showMessages}
		<WriteMessage/>
	{:else}
		<Translate/>
	{/if}
</div>
