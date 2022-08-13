<button
  class="button-day"
  class:button-day--workind-day="{isWorkingDay}"
  class:button-day--free-day="{isWorkingDay === false}"
  use:clickOutside
  on:click_outside="{handleClickOutside}"
  on:click="{clickHandler}"
>
  <span class="button-day__title">
    {dayWeek}
  </span>
  <span
    on:click|stopPropagation="{() => selectValue(true)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--working"
  >
  </span>
  <span
    on:click|stopPropagation="{() => selectValue(null)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--null"
  >
  </span>
  <span
    on:click|stopPropagation="{() => selectValue(false)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--free"
  >
  </span>
</button>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { clickOutside } from '@/helpers/clickOutside';
  const dispatch = createEventDispatcher();

  //Props
  export let isWorkingDay: boolean | null = null;
  export let dayWeek: string;

  //Variables
  let selectionMode = false;

  //Functions

  /* Switching the day edit mode */
  const clickHandler = () => {
    selectionMode = !selectionMode;
  };

  /* A function that is called when the user presses one of the three buttons. 
  It sets the selectionMode to false and if the value is different from the current value, 
  it sets the new value and dispatches the event. */
  const selectValue = (value: boolean | null) => {
    selectionMode = false;
    if (value !== isWorkingDay) {
      isWorkingDay = value;
      dispatch('updateValue', value);
    }
  };

  /* A function that is called when the user clicks outside the button. 
  It turns off day edit mode. */
  const handleClickOutside = () => {
    selectionMode = false;
  };
</script>

<style lang="scss">
  .button-day {
    padding: 5px;
    position: relative;
    background-color: $color-baby-powder;
    border: 1px solid $color-rhythm;
    border-radius: 10px;
    @include transition();
    &:not(:last-child) {
      margin-right: 10px;
    }
    &__title {
      text-transform: uppercase;
    }
    &--workind-day {
      background-color: $color-persian-green;
    }

    &--free-day {
      background-color: $color-burnt-sienna;
    }

    &__selection {
      border-radius: 10px;
      @include transition();
      opacity: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      left: 0;
      &--working {
        top: -110%;
        background-color: $color-persian-green;
      }
      &--null {
        background-color: $color-baby-powder;
      }
      &--free {
        top: 110%;
        background-color: $color-burnt-sienna;
      }
      &__hidden {
        opacity: 0;
        top: 0;
        pointer-events: none;
      }
    }
  }
</style>
