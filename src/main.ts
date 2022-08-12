import App from './App.svelte';
import 'dayjs/locale/ru';
import dayjs from 'dayjs';
dayjs.locale('ru');
import '@/assets/styles/_main.scss';

const app = new App({
  target: document.getElementById('app'),
});

export default app;
