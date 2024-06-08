/* eslint-disable react/no-unescaped-entities */
'use client'

import Forecast from "./components/Forecast";
import AirConditions from "./components/AirConditions";
import Tommorowforecase from "./components/TommorrowForecast";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "./components/Loader";
import WeatherIcons from "./components/WeatherIcons";


export default function Home() {

  const [response, setResponse] = useState<any>([])
  const [forecast, setForecast] = useState<any>([])
  const [error, setError] = useState<boolean>(false)
  const [lat, setLat] = useState<number>()
  const [lon, setLon] = useState<number>()

  const [loading, setLoading] = useState<boolean>(true)

  const getPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY

  useEffect(() => {
    getPosition()

    const weatherResponse = async () => {
      try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=alerts&appid=${API_KEY}&units=metric`);
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (weatherResponse.ok && forecastResponse.ok) {
          const weatherData = await weatherResponse.json();
          const forecastData = await forecastResponse.json()
          console.log(forecastData)
          setResponse(weatherData)
          setForecast(forecastData)
          setLoading(false)
        } else {
          setError(true);
          console.error('Error getting weather data:', weatherResponse.status);
        }
      } catch (error) {
        setError(true)
        console.error('Error getting position:', error);
      }
    }

    setTimeout(() => {
      setError(false)
    }, 2100);
    weatherResponse()
  }, [API_KEY, lat, lon])


  const getForecastAtTime = (time: string) => {
    if (!forecast || !forecast.list) return null;
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0')
    var yyyy = today.getFullYear()

    var date = yyyy + '-' + mm + '-' + dd

    const closestForecast = forecast.list.find((item: any) => {
      const itemTime = item.dt_txt;
      return itemTime === (date + ' ' + time);
    });

    return closestForecast;
  };

  const getTommorowsForecast = (time: string) => {
    if (!forecast || !forecast.list) return null;
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dd = String(tomorrow.getDate()).padStart(2, '0')
    var mm = String(tomorrow.getMonth() + 1).padStart(2, '0')
    var yyyy = tomorrow.getFullYear()

    var date = yyyy + '-' + mm + '-' + dd

    const closestForecast = forecast.list.find((item: any) => {
      const itemTime = item.dt_txt;
      return itemTime === (date + ' ' + time);
    });
    return closestForecast;
  };

  if (loading) {
    return <Loader />
  }
  else {

    return (

      <main className="p-4 min-h-screen h-full gap-5 flex flex-col md:flex-row bg-[#0b121e]">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-between p-5 h-full">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-zinc-100">{response.name}</h1>
                <p className="text-sm font-semibold text-zinc-400 tracking-wide">chance of rain {response.clouds?.all}%</p>
              </div>
              <div>
                <h1 className="text-6xl font-extrabold flex text-zinc-100">{Math.floor(response.main?.temp)}°</h1>
              </div>
            </div>
            <div className="flex items-center">
              <WeatherIcons icon={response.weather[0].icon} />
            </div>
          </div>
          <div id="forecast-card" className="flex flex-col gap-5 p-5 bg-[#202b3c] w-full shadow-sm rounded-2xl">
            <p className="font-semibold text-zinc-400">TODAY'S FORECAST</p>
            <Forecast getForecast={getForecastAtTime} />
          </div>
          <div id="aircondition-card" className="flex flex-col gap-5 p-5 bg-[#202b3c] w-full shadow-sm rounded-2xl">
            <p className="font-semibold text-zinc-400">AIR CONDITIONS</p>
            <AirConditions realFeel={Math.floor(response.main?.feels_like)} wind={Math.round((response.wind?.speed * (18 / 5)) * 100) / 100} chanceofRain={response.clouds?.all} Humidity={response.main?.humidity} />
          </div>
        </div>

        <div className="flex flex-col gap-10 p-6 px-10 max-h-full bg-[#202b3c] shadow-sm rounded-2xl min-w-80">
          <p className="font-semibold text-zinc-400">TOMMOROW'S  FORECAST</p>
          <Tommorowforecase getForecast={getTommorowsForecast} />
        </div>

        {error &&
          <div className="absolute top-5 right-5 p-3 flex gap-3 rounded-lg bg-red-600">
            <p className="text-white">Error while getting your location</p>
            <div className="flex items-center">
              <AiOutlineClose size={20} className="text-white" onClick={() => setError(false)} />
            </div>
          </div>
        }

      </main>
    );
  }
}