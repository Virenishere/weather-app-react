import { useEffect, useState } from "react";
import { WiDaySunny, WiCloud, WiRain, WiSnow } from 'react-icons/wi'; // Weather icons

const Weathercard = ({ name }) => {
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmedName = name.trim();
    if (!trimmedName) return; // If name is empty, don't fetch weather data.

    const fetchWeather = async () => {
      setLoading(true);
      setError('');
      setForecast([]); // Reset previous data before fetching new one.

      try {
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY; // Use Vite-specific way to access env variables
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${trimmedName}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('City or Country not found');
        }

        const result = await response.json();
        const dailyForecast = processForecast(result.list); // Process data to get 4-day forecast.
        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [name]);

  // Helper function to process the forecast and return data for 4 days.
  const processForecast = (data) => {
    const dailyData = [];
    const seenDates = new Set();

    // Filter forecast data and select one entry per day for the next 4 days
    data.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.getDate();

      // If we haven't seen this date yet and we need more days
      if (!seenDates.has(day) && dailyData.length < 4) {
        seenDates.add(day);
        dailyData.push({
          date: date.toDateString(),
          temp: Math.floor(item.main.temp - 273.15), // Convert temperature from Kelvin to Celsius
          weather: item.weather[0].main,
        });
      }
    });

    return dailyData;
  };

  // Helper function to map weather to appropriate icon
  const getWeatherIcon = (weather) => {
    switch (weather.toLowerCase()) {
      case 'clear':
        return <WiDaySunny size={50} />;
      case 'clouds':
        return <WiCloud size={50} />;
      case 'rain':
        return <WiRain size={50} />;
      case 'snow':
        return <WiSnow size={50} />;
      default:
        return <WiCloud size={50} />; // Default icon
    }
  };

  return (
    <div className="bg-white w-full h-auto p-6 rounded-lg shadow-lg flex flex-row items-center justify-center text-gray-800 gap-10">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {forecast.length > 0 && !error ? (
        forecast.map((day, index) => (
          <div key={index} className="mb-6 flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm w-full">
            <div className="text-xl font-semibold mb-2">{day.date}</div>
            <div className="text-4xl text-blue-600 font-bold">{day.temp}°C</div>
            <div className="text-lg font-medium">{day.weather}</div>
            <div>{getWeatherIcon(day.weather)}</div> {/* Show corresponding weather icon */}
          </div>
        ))
      ) : (
        !loading && !error && <div>No Data Available</div>
      )}
    </div>
  );
};

export default Weathercard;
