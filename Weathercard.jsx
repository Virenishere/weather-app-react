import {React,useEffect,useState} from "react";

const Weathercard = ({name, setName}) => {
    const yourAPI = "https://api.openweathermap.org/data/2.5/weather?q={name}&appid=5eadd4cf80abf727db93755a78ff7a6e"
    console.log(yourAPI)
    const [data,setData] = useState('');
    const [error,setError] = useState('');
    

    useEffect(()=>{
        const fetchweather = async () =>{
        try{
         await fetch(yourAPI)
        .then(res => res.json())
        .then(data => setData(data.main.temp))}
        catch(err){
            setError(error.message)
        }}
        fetchweather();
    }, [])

    
    

  return (
    <div className="bg-green-500 w-64 h-32 flex items-center justify-center text-white">
    <div>temperature: {data}</div>
  </div>
  );
};

export default Weathercard;
