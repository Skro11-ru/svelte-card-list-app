<ul class="schedule-list">
  {#each list as item}
    <li class="schedule-list__item">
      <ScheduleItem item="{item}" (item.id) />
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
      border: 1px solid $color-rhythm;

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
