import React, { useState } from 'react';
import backgroundimage from './assets/backgroundimg.jpg';
import Weathercard from './Weather';

function App() {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      setSubmitted(true); 
    } else {
      console.log("Enter the country name or city name");
    }
  };

  const handleInputChange = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  return (
    <div
      className="relative h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundimage})`, backgroundSize: 'cover' }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative z-10 flex flex-col items-center justify-start p-4 h-full">
        <h1 
          className="text-yellow-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-4 md:mt-6 mb-4 md:mb-6 p-4 text-center"
          style={{
            textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
          }}
        >
          Weather Forecast
        </h1>

        <div className="flex flex-col w-full max-w-md space-y-4 md:space-y-0 md:space-x-4 mb-8 items-center md:items-start">
          <form className="flex flex-col md:flex-row w-full" onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={handleInputChange}
              value={name}
              placeholder="Enter City or Country Name Eg: USA, Japan, Delhi..."
              className="flex-1 h-10 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
            />
            <button className="h-10 px-4 mt-4 md:mt-0 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base md:text-lg">
              Submit
            </button>
          </form>
        </div>

        {submitted && (
          <div className="w-full max-w-screen-md px-4">
            <Weathercard name={name} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
