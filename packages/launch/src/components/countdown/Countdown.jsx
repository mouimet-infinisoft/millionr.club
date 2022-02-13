import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import React from 'react'
import useCountdown from './useCountdown';
dayjs.extend(duration)
dayjs.extend(LocalizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

const Countdown = ({end, title}) => {
    const {countdown} = useCountdown({end});

    return (
            <div>
                <h1>{title}</h1>
                <p>{dayjs(end).tz(`EST`).format(`MMMM, D YYYY H:mm EST`)}</p>
                <p>
                    <span>{` ${dayjs.duration(countdown).format('D')}d `}</span>
                    <span>{` ${dayjs.duration(countdown).format('H')}h   `}</span>
                    <span>{` ${dayjs.duration(countdown).format('mm')}m   `}</span>
                    <span>{` ${dayjs.duration(countdown).format('ss')}s   `}</span>
                    <span>{` ${dayjs.duration(countdown).format('SSS')}ms`}</span>
                </p>
            </div>
    )
}

export default Countdown
