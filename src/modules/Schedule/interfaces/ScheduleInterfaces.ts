export interface ISchedule {
  schedule: IScheduleItem[];
}
export interface IScheduleItem {
  id: number;
  v: number;
  dt_fr: string;
  dt_to: string;
  off: number[];
  on: number[];
  tm_fr: number;
  tm_to: number;
  off_fr: number;
  off_to: number;
}
