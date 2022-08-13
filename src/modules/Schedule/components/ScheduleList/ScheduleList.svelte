<ul class="schedule-list">
  {#each list as item (item.id)}
    <li class="schedule-list__item">
      <ScheduleItem item="{item}" />
    </li>
  {/each}
</ul>

<script lang="ts">
  import ScheduleItem from '@/modules/Schedule/components/ScheduleItem/ScheduleItem.svelte';
  export let list;
</script>

<style lang="scss">
  .schedule-list {
    &__item {
      padding: 10px;
      @include border(5px);
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      &:hover {
        @include shadow();
      }
    }
  }
</style>
