import api from '../../../server/api';

export const ScheduleModule = {
  getSchedule: async () => {
    try {
      const response = await api.get('/schedule');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
