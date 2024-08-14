import React from 'react'
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { IoWaterSharp } from "react-icons/io5";
import { BiWater } from "react-icons/bi";

type AirConditionProps = {
    realFeel: number,
    wind: number,
    chanceofRain: number,
    Humidity: number

}

export default function AirConditions({ realFeel, wind, chanceofRain, Humidity }: AirConditionProps) {
    return (
        <div className='grid grid-cols-2 gap-12'>
            <div className="flex gap-2">
                <FaTemperatureHalf size={20} className='text-zinc-400' />
                <div className="flex flex-col">
                    <p className='font-medium text-zinc-400'>Real Feel</p>
                    <p className='text-xl md:text-3xl font-semibold text-zinc-200'>{realFeel}°</p>
                </div>
            </div>

            <div className="flex gap-2">
                <FaWind size={20} className='text-zinc-400' />
                <div className="flex flex-col">
                    <p className='font-medium text-zinc-400'>Wind</p>
                    <p className='text-xl md:text-3xl font-semibold text-zinc-200'>{wind} km/h</p>
                </div>
            </div>

            <div className="flex gap-2">
                <IoWaterSharp size={20} className='text-zinc-400' />
                <div className="flex flex-col">
                    <p className='font-medium text-zinc-400'>Chance of rain</p>
                    <p className='text-xl md:text-3xl font-semibold text-zinc-200'>{chanceofRain}%</p>
                </div>
            </div>

            <div className="flex gap-2">
                <BiWater size={20} className='text-zinc-400' />
                <div className="flex flex-col">
                    <p className='font-medium text-zinc-400'>Humidity</p>
                    <p className='text-xl md:text-3xl font-semibold text-zinc-200'>{Humidity}%</p>
                </div>
            </div>
        </div>
    )
}
