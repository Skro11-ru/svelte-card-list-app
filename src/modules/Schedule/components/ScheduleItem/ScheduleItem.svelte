<div class="card">
  <!--  todo:удалить после реализации методов store-->
  {item.off_fr}
  <ScheduleSummary item="{item}" />
  <div class="card__row">
    <h3 class="card__title">Дни недели</h3>
    <ul class="card__buttons-list">
      {#each Array(7) as _, i}
        <li class="card__buttons-item">
          <ButtonSelectDayWeek
            on:updateValue="{selectEventHandler}"
            isWorkingDay="{checkOnWorkingDay(i + 1)}"
            dayWeek="{getDayWeek(i + 1)}"
          />
        </li>
      {/each}
    </ul>
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
  import ScheduleSummary from '@/modules/Schedule/components/ScheduleItem/ScheduleSummary.svelte';
  import scheduleStore from '@/modules/Schedule/store/ScheduleStore';

  //Props
  export let item;

  // Variables
  let breakCheck = item?.hasOwnProperty('off_fr');
  let breakStartTime, breakEndTime, workStartTime, workEndTime;

  $: scheduleStore,
    (workStartTime = item?.tm_fr ? item?.tm_fr : '1000'),
    (workEndTime = item?.tm_to ? item?.tm_to : '1800'),
    (breakEndTime = item?.off_to ? item?.off_to : '0000'),
    (breakStartTime = item?.off_fr ? item?.off_fr : '0000');

  // Functions
  /* It checks if the day is a business day. */
  const checkOnWorkingDay = (day: number) => {
    return item.on.includes(day);
  };

  /* The updateValue event handler from the ButtonSelectDayWeek component. */
  const selectEventHandler = async (event: CustomEvent) => {
    console.log(event.detail);
    scheduleStore.editItem(item.id);
  };

  /* The updateValue event handler from the InputTimeRange component. */
  const breakTimeInputHandler = (data: CustomEvent) => {
    console.log({ itemId: item.id, breakTime: data.detail });
  };

  /* The updateValue event handler from the InputTimeRange component. */
  const workTimeInputHandler = (data: CustomEvent) => {
    console.log(data);
    console.log({ itemId: item.id, workTime: data.detail });
  };

  /* Returns the name of the day of the week. */
  const getDayWeek = (dayWeekNumber: number) => {
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
    &__buttons-list {
      grid-column-gap: 0;
      grid-row-gap: 10px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
      width: 100%;
    }
  }
</style>
