<script>
	import TopBar from './Components/TopBar.svelte';
	import Welcome from './Components/Welcome.svelte';
	import WriteMessage from './Components/WriteMessage.svelte';
	import Translate from './Components/Translate.svelte';
	import { appStatus } from './Morse/store';
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
	{:else if !$appStatus.isTranslating}
		<WriteMessage/>
	{:else}
		<Translate/>
	{/if}
</div>
