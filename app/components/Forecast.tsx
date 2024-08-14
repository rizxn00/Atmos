import React from 'react';
import Image from "next/image";
import { WiThermometerInternal } from "react-icons/wi";

type ForecastProps = {
    getForecast: () => any[];
};

const Forecast = ({ getForecast }: ForecastProps) => {
    const forecastTimes = getForecast();

    return (
        <div className='overflow-x-auto whitespace-nowrap'>
            <div className='flex flex-row divide-x-2 divide-neutral-700 p-4'>
                {forecastTimes.length > 0 ? (
                    forecastTimes.map(({ label, time, forecast }) => (
                        <div key={time} className='flex flex-col gap-1 text-center items-center min-w-[150px]'>
                            <p className='text-sm font-bold text-zinc-400'>{label}</p>
                            {forecast ? (
                                <>
                                    <Image src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`} width={50} height={50} alt="icon" />
                                    <p className='text-xl font-semibold text-zinc-200'>{Math.floor(forecast.main.temp)}°</p>
                                </>
                            ) : (
                                <div className='text-sm flex flex-col items-center font-bold text-zinc-400'>
                                    <WiThermometerInternal size={30}/>
                                    NO DATA
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='text-center text-zinc-400'>No forecast data available</p>
                )}
            </div>
        </div>
    );
};

export default Forecast;
