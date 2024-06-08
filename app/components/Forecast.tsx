import React from 'react';
import Image from "next/image";
import { WiThermometerInternal } from "react-icons/wi";

type ForecastProps = {
    getForecast: (time: string) => any;
};

const Forecast = ({ getForecast }: ForecastProps) => {
    const times = [
        { label: '6:00 AM', time: '06:00:00' },
        { label: '9:00 AM', time: '09:00:00' },
        { label: '12:00 PM', time: '12:00:00' },
        { label: '3:00 PM', time: '15:00:00' },
        { label: '6:00 PM', time: '18:00:00' },
        { label: '9:00 PM', time: '21:00:00' }
    ];

    const renderForecast = (label: string, time: string) => {
        const forecast = getForecast(time);
        if (forecast) {
            return (
                <div>
                    <p className='text-sm font-bold text-zinc-400'>{label}</p>
                    <Image src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} width={50} height={50} alt="icon" />
                    <p className='text-xl font-semibold text-zinc-200'>{Math.floor(forecast.main.temp)}°</p>
                </div>
            );
        } else {
            return (
                <div>
                    <p className='text-sm font-bold text-zinc-400'>{label}</p>
                    <div className='text-sm flex flex-col items-center font-bold text-zinc-400'>
                        <WiThermometerInternal size={30}/>
                        EXPIRED
                    </div>
                </div>)
        }
    };

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 divide-x divide-zinc-500'>
            {times.map(({ label, time }) => (
                <div key={time} className='flex flex-col gap-1 text-center items-center'>
                    {renderForecast(label, time)}
                </div>
            ))}
        </div>
    );
};

export default Forecast;
