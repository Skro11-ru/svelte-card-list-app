<section class="schedule">
  <h1>Расписание</h1>
  <ScheduleList list="{scheduleList}" />
</section>

<script lang="typescript">
  import { onMount } from 'svelte';
  import ScheduleList from '@/modules/Schedule/components/ScheduleList/ScheduleList.svelte';
  import { ScheduleModule } from '@/modules/Schedule/services/ScheduleServices';
  import type { IScheduleItem } from '@/modules/Schedule/interfaces/ScheduleInterfaces';

  onMount(async () => {
    const res = await ScheduleModule.getSchedule();
    scheduleList = [...res];
  });

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
