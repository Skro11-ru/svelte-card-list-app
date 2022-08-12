import { writable } from 'svelte/store';
import type { IScheduleItem } from '@/modules/Schedule/interfaces/ScheduleInterfaces';

const ScheduleStore = () => {
  const { subscribe, update, set } = writable<Array<IScheduleItem>>([]);

  return {
    subscribe,
    set: (value: Array<IScheduleItem>) => {
      set(value);
    },
    add: (item: IScheduleItem) =>
      update((value) => {
        return [item, ...value];
      }),
    remove: (id: number) =>
      update((value) => {
        return value.filter((i) => i.id !== id);
      }),
    removeAll() {
      set([]);
    },
  };
};

export const store = ScheduleStore();
