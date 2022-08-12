<div class="card">
  <div class="card__row">
    <h3 class="card__title">Дни недели</h3>
    {#each Array(7) as _, i}
      <ButtonSelectDayWeek
        on:updateValue="{selectEventHandler}"
        isWorkingDay="{checkOnWorkingDay(i + 1)}"
        dayWeek="{getDayWeek(i + 1)}"
      />
    {/each}
  </div>
  <div class="card__row">
    <h3 class="card__title">Рабочее время</h3>
    <InputTimeRange
      timeStart="{workStartTime}"
      timeEnd="{workEndTime}"
      on:updateValue="{workTimeInputHandler}"
    />
  </div>
  <div class="card__row">
    <h3 class="card__title">Перерыв</h3>
    <input
      type="checkbox"
      name="break"
      id="break"
      bind:checked="{breakCheck}"
    />
  </div>
  {#if breakCheck}
    <div class="card__row">
      <h3 class="card__title">Время перерыва</h3>

      <InputTimeRange
        timeStart="{breakStartTime}"
        timeEnd="{breakEndTime}"
        on:updateValue="{breakTimeInputHandler}"
      />
    </div>
  {/if}
</div>

<script lang="ts">
  import InputTimeRange from '@/modules/UiKit/InputTimeRange/InputTimeRange.svelte';

  import ButtonSelectDayWeek from '@/modules/Schedule/components/ButtonSelectDayWeek/ButtonSelectDayWeek.svelte';
  import dayjs from 'dayjs';

  //Props
  export let item;

  // Variables
  let breakCheck = item?.hasOwnProperty('off_fr');

  const breakStartTime = item?.off_fr ? item?.off_fr : '0000';
  const breakEndTime = item?.off_to ? item?.off_to : '0000';

  const workStartTime = item?.tm_fr ? item?.tm_fr : '0800';
  const workEndTime = item?.tm_to ? item?.tm_to : '1700';

  // Functions
  /* It checks if the day is a business day. */
  const checkOnWorkingDay = (day: number) => {
    return item.on.includes(day);
  };

  /* The updateValue event handler from the ButtonSelectDayWeek component. */
  const selectEventHandler = (item) => {
    console.log(item.detail);
  };

  /* The updateValue event handler from the InputTimeRange component. */
  const breakTimeInputHandler = (data) => {
    console.log({ itemId: item.id, breakTime: data.detail });
  };

  /* The updateValue event handler from the InputTimeRange component. */
  const workTimeInputHandler = (data) => {
    console.log({ itemId: item.id, workTime: data.detail });
  };

  /* Returns the name of the day of the week. */
  const getDayWeek = (dayWeekNumber) => {
    return dayjs().day(dayWeekNumber).locale('ru').format('dd');
  };
</script>

<style lang="scss">
  .card {
    &__row {
      display: flex;
      align-items: center;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }

    &__title {
      min-width: 200px;
    }
  }
</style>
