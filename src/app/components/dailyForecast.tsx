import React from 'react'
import { WiDaySunny } from "react-icons/wi";

interface DailyForecastProps {
    dailyForecasts: any; // You should replace 'any' with the correct type for dailyForecasts
  }

const DailyForecast: React.FC<DailyForecastProps> = ({dailyForecasts}) =>
{
    return (
        <section className='flex sm:justify-around mt-2 gap-x-6 sm:gap-x-0 overflow-scroll no-scrollbar'>
            {Object.keys(dailyForecasts).map(date => {
            const forecast = dailyForecasts[date];
            const temperature = forecast.main.temp;

            const dayOfWeek = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });

            return (
                <div key={date} className='inline-flex flex-col items-center text-sm 2xl:text-base font-semibold'>
                    <p>{dayOfWeek}</p>
                    <WiDaySunny className="text-3xl" />
                    <p>{temperature}&#176;</p>
                </div>
            );
        })}
        </section>
    )
};
export default DailyForecast;