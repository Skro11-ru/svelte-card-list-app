<div class="input-time">
  <input
    use:cleave="{optionsTime}"
    on:change="{onChange}"
    bind:value="{timeStart}"
    placeholder="00:00"
    maxlength="5"
    on:input="{(e) => jumpToNextInput(e.target)}"
    on:click="{handlerClickInput}"
  />
  <span class="input-time__separator">-</span>
  <input
    use:cleave="{optionsTime}"
    on:change="{onChange}"
    bind:value="{timeEnd}"
    placeholder="00:00"
    on:click="{handlerClickInput}"
  />
</div>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { cleave } from 'svelte-cleavejs';
  const dispatch = createEventDispatcher();

  // Props
  export let timeStart = '';
  export let timeEnd = '';

  // Functions
  /* Configuration object for the cleave.js library. */
  const optionsTime = {
    time: true,
    timePattern: ['h', 'm'],
  };

  /* Highlight the content of input */
  const handlerClickInput = (e) => {
    e.target.select();
  };

  /* Jump to the next input when the maximum length is reached. */
  const jumpToNextInput = (node) => {
    const maxlengthNode = node.getAttribute('maxlength');
    if (maxlengthNode && node.value.length >= maxlengthNode) {
      do {
        node = node.nextSibling;
      } while (node && !/text/.test(node.type));
      if (node && /text/.test(node.type)) {
        node.focus();
        node.select();
      }
    }
  };

  /* Sends an event to the parent component */
  const onChange = () => {
    console.log(timeEnd);
    const time = {
      timeStart: timeStart.toString().replace(/\D/g, ''),
      timeEnd: timeEnd.toString().replace(/\D/g, ''),
    };
    dispatch('updateValue', time);
  };
</script>

<style lang="scss">
  .input-time {
    display: flex;
    max-width: fit-content;
    text-align: center;
    border: 1px solid rgb(126, 127, 154);
    input {
      all: unset;
      border: none;
      max-width: 45px;
    }
    &__separator {
      margin: 0 5px;
    }
  }
</style>
