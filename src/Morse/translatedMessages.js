import { writable } from 'svelte/store';

const newMessageStore = [];

function setUpStore() {

    const { subscribe, set, update } = writable(newMessageStore);

    function addMessage(message) {
        update(messages => 
         [...messages, message]
        );
      }
    
      function resetStoredMessages() {
        set(newMessageStore);
      }

      return {
        subscribe,
        set,
        addMessage,
        resetStoredMessages
	};

}

export const decodedMessages = setUpStore();

