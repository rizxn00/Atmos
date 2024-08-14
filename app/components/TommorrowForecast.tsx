import React from 'react'
import WeatherIcons from './WeatherIcons';
import Image from 'next/image';

type Forcast = {
    getForecast: (time: string) => any;
}

export default function Weekforecast({ getForecast }: Forcast) {

    const times = ['06:00:00', '09:00:00', '12:00:00', '15:00:00', '18:00:00', '21:00:00', '00:00:00'];

    function timeToLabel(time:any) {
        const [hour, minute] = time.split(':');
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minute} ${period}`;
    }

    return (
        <div className='flex flex-col gap-10 md:gap-0 justify-between h-full'>
             {times.map((time) => (
                <div key={time} className="flex text-center gap-5 items-center justify-between">
                    <p className="font-medium text-sm text-zinc-400">{timeToLabel(time)}</p>
                    <div className="font-semibold text-sm text-zinc-200 flex items-center">
                        <Image src={`https://openweathermap.org/img/wn/${getForecast(time).weather[0].icon}.png`} width={30} height={30} alt="icon" />
                        {getForecast(time).weather[0].main}
                    </div>
                    <p className="font-semibold text-sm text-zinc-200">
                        {Math.floor(getForecast(time).main.temp)}°<span className="font-normal">/{Math.floor(getForecast(time).main.temp_min)}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}
