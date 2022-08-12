<button
  class="button-day"
  class:button-day--workind-day="{isWorkingDay}"
  class:button-day--free-day="{isWorkingDay === false}"
>
  <span class="button-day__title">
    {dayWeek}
  </span>
  <span
    on:click="{() => selectValue(true)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--working"
  >
  </span>
  <span
    on:click="{() => selectValue(null)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--null"
  >
  </span>
  <span
    on:click="{() => selectValue(false)}"
    class:button-day__selection__hidden="{!selectionMode}"
    class="button-day__selection button-day__selection--free"
  >
  </span>
</button>

<script lang="typescript">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let isWorkingDay: boolean | null = null;
  export let dayWeek;
  let selectionMode = false;

  const selectValue = (value) => {
    selectionMode = !selectionMode;
    if (value !== isWorkingDay) {
      isWorkingDay = value;
      dispatch('updateValue', value);
    }
  };
</script>

<style lang="scss">
  .button-day {
    margin: 50px;
    height: 40px;
    width: 40px;
    position: relative;
    background-color: $color-baby-powder;
    border: 1px solid $color-rhythm;
    border-radius: 10px;
    @include transition();
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
        top: -50px;
        background-color: $color-persian-green;
      }
      &--null {
        background-color: $color-baby-powder;
      }
      &--free {
        top: 50px;
        background-color: $color-burnt-sienna;
      }
      &__hidden {
        opacity: 0;
        top: 0;
      }
    }
  }
</style>
