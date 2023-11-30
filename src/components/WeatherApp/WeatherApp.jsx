import React, { useState } from 'react'
import axios from 'axios'
import './WeatherApp.css';
import search_icon from '../assets/search.png'
import humidity_icon from '../assets/humidity.png'
import wind_icon from  '../assets/wind.png'



const WeatherApp = () => {
const[location,setlocation]=useState('');
const[weather,setweather]=useState('')
const api_key="000d82c60e9a1b7fa7d21fff43481fc8";
const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`


  //handling search button to fetch api and manage state
const search=()=>{
if(location.trim().length>0){
  axios.get(url)
  .then((response)=>{
     console.log(response.data)
     setweather(response.data)
     setlocation("");
  })
  .catch((error)=>{
    console.log(error)
  });
}else{
  alert("Please enter the city")
}
}

//jsx code
return (
  <div className="container">

    <div className='top-bar'>
      <input type='text' value={location} className='cityInput' placeholder='Search here...' onChange={(e)=>setlocation(e.target.value)} />
      <div className='search-icon' onClick={search}>
        <img src={search_icon} alt="" />
      </div>
    </div>

    {
      weather.length !== 0 
      ?
      <>
        <div className='weather-image' >
          <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" className='weather-icon' />
          <p className='weather-text'>{weather.weather[0].main}</p>
        </div>

        <div className='weather-temp'>{weather.main.temp}&deg;C</div>

        <div className='weather-location'>{weather.name}</div>

        <div className='data-container'>
          <div className='element'>
            <img src={humidity_icon} alt="" className='icon' />
            <div className='data'>
              <div className='humidity-percent'>{weather.main.humidity}%</div>
              <div className='text'>Humidity</div>
            </div>
          </div>

          <div className='element'>
            <img src={wind_icon} alt="" className='icon' />
            <div className='data'>
              <div className='wind-rate'>{weather.wind.speed} km/hr</div>
              <div className='text'>Wind Speed</div>
            </div>
          </div>
        </div>
      </>
      :
      <>
        <h3 style={{color:"white",fontSize:"70px",textAlign:"center",margin:"auto",padding:"70px"}}>Please enter a city to check the Weather</h3>
      </>
    }
  </div>
);

}

export default WeatherApp