<section class="schedule">
  <h1>Расписание</h1>
  <ScheduleList list="{$scheduleStore}" />
</section>

<script lang="ts">
  import { onMount } from 'svelte';
  import ScheduleList from '@/modules/Schedule/components/ScheduleList/ScheduleList.svelte';
  import type { IScheduleItem } from '@/modules/Schedule/interfaces/ScheduleInterfaces';
  import scheduleStore from '@/modules/Schedule/store/ScheduleStore';

  onMount(async () => {
    await scheduleStore.getSchedule();
  });

  const localDB = [
    {
      id: 1,
      v: 1,
      dt_fr: '2029-12-01',
      dt_to: '2020-12-05',
      off: [2, 6, 7],
      on: [1, 3, 4, 5],
      tm_fr: 1000,
      tm_to: 1800,
      off_fr: 1330,
      off_to: 1415,
    },
    {
      id: 2,
      v: 1,
      off: [1, 2, 6, 7],
      on: [3, 4, 5],
    },
    {
      id: 3,
      v: 1,
      off: [6, 7],
      on: [1, 2, 3, 4, 5],
    },
    {
      id: 4,
      v: 1,
      tm_fr: 2000,
      tm_to: 2100,
      off: [6, 7],
      on: [1, 2, 3, 4, 5],
      off_fr: 1330,
      off_to: 1415,
    },
  ];
  //Variables
  let scheduleList: IScheduleItem[] = [];
</script>

<style lang="scss">
  .schedule {
    max-width: 600px;
    padding: 20px;
    margin: auto;
  }
</style>
