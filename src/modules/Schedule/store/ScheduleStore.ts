import { writable } from 'svelte/store';
import { ScheduleModule } from '@/modules/Schedule/services/ScheduleServices';

// const ScheduleStore = () => {
//   const { subscribe, update, set } = writable<Array<IScheduleItem>>([]);
//
//   return {
//     subscribe,
//     set: (value: Array<IScheduleItem>) => {
//       set(value);
//     },
//     add: (item: IScheduleItem) =>
//       update((value) => {
//         return [item, ...value];
//       }),
//     remove: (id: number) =>
//       update((value) => {
//         return value.filter((i) => i.id !== id);
//       }),
//     removeAll() {
//       set([]);
//     },
//   };
// };
//
// export const store = ScheduleStore();

const localDB = [
  {
    id: 1,
    v: 1,
    dt_fr: '2020-12-01',
    dt_to: '2020-12-05',
    off: [2, 6, 7],
    on: [1, 3, 4, 5],
    tm_fr: 1000,
    tm_to: 1800,
    off_fr: 1330,
    off_to: 1415,
  },
];

const schedule = writable([]);

const scheduleStore = {
  subscribe: schedule.subscribe,
  // addItem(newItem) {
  //   schedule.update((items) => {
  //     return [...items, newItem];
  //   });
  // },
  //todo:прописать методы store
  editItem(id) {
    schedule.update((items) => {
      return items.map((el) => {
        if (el.id === id) {
          return { ...el, off_fr: 9999 };
        }
        return el;
      });
    });
  },
  async getSchedule() {
    const res = (await ScheduleModule.getSchedule()) || localDB;
    schedule.set(res);
  },
};

// export the custom store
export default scheduleStore;
