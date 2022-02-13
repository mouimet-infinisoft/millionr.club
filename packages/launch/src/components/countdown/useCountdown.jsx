import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import React, { useEffect, useRef } from 'react';
dayjs.extend(duration);
dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

// end format = '2021/12/10T15:00'
const useCountdown = ({ end }) => {
  const _end = dayjs.tz(end, 'EST');
  const timerRef = useRef({});
  const [countdown, setCountDown] = React.useState(0);

  const format = () => `${dayjs.duration(countdown).format('D')}d
    ${dayjs.duration(countdown).format('H')}h
    ${dayjs.duration(countdown).format('mm')}m
    ${dayjs.duration(countdown).format('ss')}s`
    // ${dayjs.duration(countdown).format('SSS')}ms`;

  const tick = React.useCallback(() => {
    if (dayjs().diff(dayjs(_end)) <= 0) {
      timerRef.current = setTimeout(() => {
        setCountDown(Math.floor(dayjs(_end).diff(dayjs())));
      }, 10);
    }
  }, [_end]);

  useEffect(() => {
    tick();

    return () => clearTimeout(timerRef.current);
  }, [countdown, tick]);

  return {
    countdown,
    formatedCountdown: format(),
  };
};

export default useCountdown;
