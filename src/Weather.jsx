import { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi'; // Weather icons

const Weathercard = ({ name }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      setForecast([]);

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedName}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('City or Country not found');
        }

        const result = await response.json();
        const dailyForecast = processForecast(result.list);
        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [name]);

  const processForecast = (data) => {
    const dailyData = [];
    const seenDates = new Set();

    data.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();

      if (!seenDates.has(day) && dailyData.length < 4) {
        seenDates.add(day);
        dailyData.push({
          date: date.toDateString(),
          temp: Math.floor(item.main.temp - 273.15),
          weather: item.weather[0].main,
        });
      }
    });

    return dailyData;
  };

  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return <WiDaySunny size={24} />;
      case 'clouds':
        return <WiCloud size={24} />;
      case 'rain':
        return <WiRain size={24} />;
      case 'snow':
        return <WiSnow size={24} />;
      default:
        return <WiCloud size={24} />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-wrap items-center justify-center gap-4 mx-auto">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {forecast.length > 0 && !error ? (
        forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-xs">
            <div className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold mb-2 text-center">{day.date}</div>
            <div className="text-lg sm:text-xl md:text-2xl text-blue-600 font-bold">{day.temp}°C</div>
            <div className="text-xs sm:text-sm md:text-base font-medium text-center">{day.weather}</div>
            <div>{getWeatherIcon(day.weather)}</div>
          </div>
        ))
      ) : (
        !loading && !error && <div>No Data Available</div>
      )}
    </div>
  );
};

export default Weathercard;
