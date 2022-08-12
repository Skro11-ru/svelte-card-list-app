<div class="schedule-summary">
  <p class="schedule-summary__row">
    {generateFirstRow()}
  </p>
  <p class="schedule-summary__row">
    {generateSecondRow()}
  </p>
  <p class="schedule-summary__row">
    {generateThirdRow()}
  </p>
</div>

<script lang="ts">
  import dayjs from 'dayjs';

  //  Props
  export let item;

  //Functions
  /* Generates a first row */
  const generateFirstRow = () => {
    if (item.hasOwnProperty('dt_fr')) {
      if (checkingDates(item.dt_fr, item.dt_to, 'YYYY')) {
        if (checkingDates(item.dt_fr, item.dt_to, 'M')) {
          return `c ${parseDate(item.dt_fr, 'D')}  по ${parseDate(
            item.dt_to,
            'D MMMM',
          )}  ${parseDate(item.dt_fr, 'YYYY')}  включительно`;
        } else {
          return `c ${parseDate(item.dt_fr, 'D MMMM')}  по ${parseDate(
            item.dt_to,
            'D MMMM',
          )} ${parseDate(item.dt_fr, 'YYYY')} включительно`;
        }
      } else {
        return `c ${parseDate(item.dt_fr, 'D MMMM YYYY')}  по ${parseDate(
          item.dt_to,
          'D MMMM YYYY',
        )}   включительно`;
      }
    } else {
      return '';
    }
  };

  /* Generates a second row */
  const generateSecondRow = () => {
    if (item.on && item.tm_fr && item.tm_to && !item.off_fr && !item.off_to) {
      let tempString = '';
      item.on.forEach((e, i) => {
        if (i === item.on.length - 1) {
          tempString += getDayWeek(e);
        } else {
          tempString += getDayWeek(e) + ', ';
        }
      });
      return `${tempString}, ${parseDate(
        splitStringTime(item.tm_fr),
        'HH:mm',
      )} - ${parseDate(splitStringTime(item.tm_to), 'HH:mm')}`;
    }
    if (item.on && item.tm_fr && item.tm_to && item.off_fr && item.off_to) {
      let tempString = '';
      item.on.forEach((e, i) => {
        if (i === item.on.length - 1) {
          tempString += getDayWeek(e);
        } else {
          tempString += getDayWeek(e) + ', ';
        }
      });
      return `${tempString}, ${parseDate(
        splitStringTime(item.tm_fr),
        'HH:mm',
      )} - ${parseDate(
        splitStringTime(item.tm_to),
        'HH:mm',
      )}, перерыв: ${parseDate(
        splitStringTime(item.off_fr),
        'HH:mm',
      )} - ${parseDate(splitStringTime(item.off_to), 'HH:mm')}`;
    }
    if (
      compareArrays([...item.on], [1, 2, 3, 4, 5]) &&
      !item.tm_fr &&
      !item.tm_to
    ) {
      return `Пн-Пт - полный день`;
    }
    if (item.on && !item.tm_fr && !item.tm_to) {
      let tempString = '';
      item.on.forEach((e, i) => {
        if (i === item.on.length - 1) {
          tempString += getDayWeek(e);
        } else {
          tempString += getDayWeek(e) + ', ';
        }
      });
      return `${tempString} - полный день`;
    }
  };
  const getDayWeek = (dayWeekNumber) => {
    return (
      dayjs()
        .day(dayWeekNumber)
        .locale('ru')
        .format('dd')
        .split('')[0]
        .toUpperCase() +
      dayjs().day(dayWeekNumber).locale('ru').format('dd').split('')[1]
    );
  };

  /* Generates a third row */
  const generateThirdRow = () => {
    if (item.off) {
      let tempString = '';
      item.off.forEach((e, i) => {
        if (i === item.off.length - 1) {
          tempString += getDayWeek(e);
        } else {
          tempString += getDayWeek(e) + ', ';
        }
      });
      return `${tempString} - выходной`;
    }
  };

  /**
   * It returns true if the two arrays are the same length and all of their elements are equal
   * @param {number[]} array1 - The first array to compare.
   * @param {number[]} array2 - number[] - This is the array that we're comparing against.
   * @returns true or false
   */
  const compareArrays = (array1: number[], array2: number[]) => {
    return (
      array1.length == array2.length &&
      array1.every((el, i) => el === array2[i])
    );
  };

  /**
   * It takes a date string and a format string and returns a formatted date string
   * @param {string} date - The date you want to parse.
   * @param {string} format - The format you want to convert the date to.
   * @returns A function that takes two arguments, date and format, and returns a string.
   */
  const parseDate = (date: string, format: string) => {
    return dayjs(date).format(format);
  };

  /**
   * Check if two dates are equal by comparing their formatted strings.
   * @param date1 - The first date to compare.
   * @param date2 - The date you want to compare to.
   * @param format - The format of the date.
   * @returns A boolean value.
   */
  const checkingDates = (date1, date2, format) => {
    return dayjs(date1).format(format) === dayjs(date2).format(format);
  };

  /**
   * It takes a string of time in the format of "hhmm" and returns a string of time in the format of "hh:mm"
   * @param {string} time - string
   * @returns a string with the hour and minute of the time passed in.
   */
  const splitStringTime = (time: string) => {
    const hh = time.toString().split('')[0] + time.toString().split('')[1];
    const mm = time.toString().slice(2);
    return `1/1/1 ${hh}:${mm}`;
  };
</script>

<style lang="scss">
  .schedule-summary {
    border-bottom: 1px solid $color-rhythm;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
</style>
