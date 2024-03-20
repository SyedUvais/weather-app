"use client";
import React, { useEffect, useState } from 'react'
import { WiDaySunny } from "react-icons/wi";
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import MoreDetails from './moreDetails';
import DailyForecast from './dailyForecast';

const WeatherApp: React.FC = () =>
{
  const [cityName, updcityName] = useState('Shamli');

  const [ weather_details_obj, upd_weather_details_obj] = useState<any>({});

  const [dailyForecasts, setDailyForecasts] = useState<any>({});

  const getweatherinfo = async () =>
  {
    try
    {
      let api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=ed03aa16e6c94cbc36e42534abe9a753&units=metric`

      const response = await fetch(api_url);
      const data = await response.json();

      console.log("Syed api response", data);

      if (data.cod === '200')
      {
        const {name: city, country: countryName, sunrise, sunset} = data.city
        const {list} = data

        const data_obj = {
          date: list[0].dt,
          weatherList: list,
          city_name: city,
          country: countryName,
          sunrise_time: sunrise,
          sunset_time: sunset,
          cityTemperature: list[0].main.temp,
          humidity: list[0].main.humidity,
          pressure: list[0].main.pressure,
          weathermode: list[0].weather[0].main,
          windSpeed: list[0].wind.speed
        }
        console.log("syed data_obj", data_obj);

        const forecastData = list; // 'list' contains the list of forecast data
        const temp: any = {};

        forecastData.forEach((forecast: any) =>
          {
            // Extract date from the forecast timestamp
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            console.log("dailyForecasts dates", date);

            // If the date is not yet stored in 'dailyForecasts', store this forecast
            if (!temp[date])
            {
              console.log("inner data", temp);
              temp[date] = forecast;
            }
        });
        setDailyForecasts(temp);

        upd_weather_details_obj (data_obj);

        toast.success(`Weather data updated for ${cityName}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
      }
      else
      {
        toast.error(data.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
      }
    }

    catch (error)
    {
      console.log("error in getting response from api");
      toast.error('something is wrong', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    }
  }

  useEffect ( () =>
  {
    getweatherinfo();
  }, [])


  //Current time and date of the city
  const seconds = weather_details_obj.date;

  const d = new Date(seconds * 1000);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  const hours = d.getHours();
  const minutes = d.getMinutes();
  // console.log("hi" , d)

   //Sunrise time of the city

  const sR_seconds = weather_details_obj.sunrise_time;
  const sR_time = new Date(sR_seconds * 1000)
  const sunrise_hours = sR_time.getHours();
  const sunrise_minutes = sR_time.getMinutes();

  //Sunset time of the city

  const sS_seconds = weather_details_obj.sunset_time;
  const sS_time = new Date(sS_seconds * 1000)
  const sunset_hours = sS_time.getHours();
  const sunset_minutes = sS_time.getMinutes();

  return (
    <>
        <section className="w-[100vw] h-[100vh] bg-bg-weather-Image bg-cover grid place-items-center">
            <div className="mb-[10px]">
              <input
                className='w-[50vw] sm:w-[35vw] lg:w-[28vw] h-[7vh] text-base 2xl:text-lg outline-none border-[0] rounded-tl-md rounded-bl-md pl-4'
                type="search"
                autoComplete='on'
                placeholder='Enter city name'
                onChange = {(e) => updcityName(e.target.value)}
                />
              <button className='w-[20vw] sm:w-[12vw] lg:w-[7vw]  h-[7vh] border-[0] bg-[darkmagenta] text-white text-[17px] 2xl:text-[19px] font-normal rounded-tr-md rounded-br-md' onClick={getweatherinfo}>Search</button>
            </div>

            <div className="w-[98vw] sm:w-[90vw] md:w-[78vw] lg:w-[60vw] h-[80vh] bg-white rounded-xl ">
                  <div className="w-full h-[30%] grid place-items-center rounded-tl-xl rounded-tr-xl py-3">
                    {/* <WiDaySunny class="text-[120px]" /> */}
                    <Image src='/weather.png' width={100} height={100} alt='img' />
                  </div>

                  <div className="w-full h-[70%] rounded-bl-xl rounded-br-xl">
                      <div className="w-full h-[40%] bg-[wheat] flex">
                          <div className="w-[60%] sm:w-[70%] h-full bg-black text-white flex place-items-center sm:pl-[30px]">
                            <span className="text-4xl sm:text-5xl 2xl:text-[50px]" >{weather_details_obj.cityTemperature}&#176;</span>
                            <span className="text-2xl sm:text-3xl 2xl:text-[32px] ml-2 sm:ml-5 uppercase font-sans font-extralight flex flex-col">{weather_details_obj.weathermode}
                              <span className="text-xs 2xl:text-sm">{weather_details_obj.city_name}, {weather_details_obj.country}</span>
                            </span>
                          </div>

                          <div className="w-[40%] sm:w-[30%] h-full bg-[cadetblue] text-2xl sm:text-3xl 2xl:text-[32px] text-white flex flex-col place-items-center justify-center">
                            <span className="date">{`${date}/${month+1}/${year}`}</span>
                            <span className="time">{`${hours}:${minutes}`} <span className='text-[10px] 2xl:text-xs'>(Updated at)</span></span>
                          </div>

                      </div>

                      <div className="w-full h-[60%] rounded-bl-xl rounded-br-xl">

                        <div className='flex h-[40%] sm:justify-around gap-x-4 sm:gap-x-0 items-center overflow-scroll no-scrollbar'>
                          <MoreDetails sunrise_hours={sunrise_hours} sunrise_minutes={sunrise_minutes} sunset_hours={sunset_hours} sunset_minutes={sunset_minutes} weather_details_obj={weather_details_obj} />
                        </div>

                        <div className='sm:px-4'>
                          <h6 className='text-xl 2xl:text-2xl font-medium text-[#2a364f]'>Daily Forecast</h6>
                          <div className='bg-[#2a364f] h-[1px]' />
                          <DailyForecast dailyForecasts={dailyForecasts} />
                        </div>

                      </div>

                  </div>

            </div>
        </section>
    </>
  )
};

export default WeatherApp
