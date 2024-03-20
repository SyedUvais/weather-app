import React from 'react';
import { WiSunset, WiSunrise, WiStrongWind, WiHumidity  } from "react-icons/wi";
import Eachdetails from './Eachdetails';
import { TiWeatherWindy } from "react-icons/ti";

interface MoreDetailsProps {
    sunrise_hours: number,
    sunrise_minutes: number,
    sunset_hours: number,
    sunset_minutes: number,
    weather_details_obj: any
  }

const MoreDetails: React.FC<MoreDetailsProps> = ({sunrise_hours, sunrise_minutes, sunset_hours, sunset_minutes, weather_details_obj}) =>
{
    return (
        <>
            <Eachdetails icon=<WiSunrise className='text-3xl 2xl:text-[34px]' /> name= 'Sunrise' value={`${sunrise_hours}:${sunrise_minutes} AM`} />
            <Eachdetails icon=<WiSunset className='text-3xl 2xl:text-[34px]' /> name="Sunset" value={`${sunset_hours}:${sunset_minutes} PM`} />
            <Eachdetails icon=<TiWeatherWindy className='text-3xl 2xl:text-[34px]' /> name="Pressure" value={weather_details_obj.pressure} />
            <Eachdetails icon=<WiHumidity  className='text-3xl 2xl:text-[34px]' /> value={weather_details_obj.humidity} name="Humidity" />
            <Eachdetails icon=<WiStrongWind className='text-3xl 2xl:text-[34px]' /> value={weather_details_obj.windSpeed} name="Wind Speed" />
        </>
    )
};
export default MoreDetails;