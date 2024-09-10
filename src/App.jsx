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

  // Reset submitted state when user types new input
  const handleInputChange = (e) => {
    setName(e.target.value);
    setSubmitted(false); // Reset submission state when user types
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-start p-4"
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      <h1 
        className="text-yellow-500 text-3xl md:text-4xl lg:text-5xl font-bold mt-12 mb-8 p-4 text-center"
        style={{
          textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
        }}
      >
        Weather Forecast
      </h1>

      <div className="flex flex-col w-full max-w-lg space-y-4 md:space-y-0 md:space-x-4 mb-8 items-center md:items-start">
        <form className="flex flex-col md:flex-row w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInputChange}
            value={name}
            placeholder="Enter City or Country Name Eg: USA, Japan, Delhi..."
            className="flex-1 h-12 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="h-12 px-6 mt-4 md:mt-0 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
            Submit
          </button>
        </form>
      </div>

      {/* Render Weathercard only when submitted */}
      {submitted && <Weathercard name={name} />}
    </div>
  );
}

export default App;
