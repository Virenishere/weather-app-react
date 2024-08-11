import React, { useState } from 'react'
import backgroundimage from './assets/backgroundimg.jpg' 
import Weathercard from './Weather';

function App() {
  const [name,setName] = useState('');

   return (
    <div
    className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-start p-4"
    style={{ backgroundImage: `url(${backgroundimage})` }}
  >
    <h1 className="text-yellow-500 text-4xl font-bold mt-8 mb-6 p-4 text-center">
      Weather Forecast
    </h1>
    <div className="flex w-full max-w-2xl space-x-4 mb-8 items-center">
      <input
        type="text"
        onChange={(e)=>{
          setName(e.target.value);
          console.log(e.target.value);
        }}
        value={name}
        placeholder="Enter City or Country Name Eg:- USA,Japan,Delhi,San Francisco.."
        className="flex-1 h-12 p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="h-12 px-6 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500">
        Submit
      </button>
    </div>
        
        <Weathercard name={name}/>

        

  </div>
  )
}

export default App