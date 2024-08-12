import {React,useEffect,useState} from "react";

const Weathercard = ({name}) => {
    
    const [data,setData] = useState(null);
    const [error,setError] = useState('');
    const [loading, setLoading] = useState(false);


    useEffect(()=>{
      const trimmedName = name.trim();
      if (!trimmedName) return;


        const fetchweather = async () =>{

          setLoading(true);
          setError('');

          try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5eadd4cf80abf727db93755a78ff7a6e`);
            
            if (!response.ok) {
                throw new Error('City or Country not found');
            }

            const result = await response.json();
            setData(result.main.temp); // Set temperature data

        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }
    };
        fetchweather();
    }, [name])




  return (
    <div className="bg-green-400 w-64 h-32 flex items-center justify-center text-white">
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
    {data !== null && !error ? (
        <div>Temperature: {Math.floor(data - 273)} °C</div>
    ) : (
        !loading && !error && <div>No Data Available</div>
    )}
</div>
  );
};
export default Weathercard;