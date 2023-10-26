import React, { useState } from 'react';
import './WeatherApp.css';
import searchIcon from '../Assets/search.png';
import clearIcon from '../Assets/clear.png';
import cloudIcon from '../Assets/cloud.png';
import drizzleIcon from '../Assets/drizzle.png';
import humidityIcon from '../Assets/humidity.png';
import rainIcon from '../Assets/rain.png';
import snowIcon from '../Assets/snow.png';
import windIcon from '../Assets/wind.png'; 

const WeatherApp = () => {

    let api_key = "fd73ce3a7fa00bf2c3e85815787a7380";

    const [wicon,setWicon] = useState(cloudIcon);

    const search = async () =>{
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity =document.getElementsByClassName("humidity-percent");
        const wind =document.getElementsByClassName("wind-rate");
        const temperature =document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = Math.floor(data.main.humidity)+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon === "01n"){
            setWicon(clearIcon);
        }
        else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
            setWicon(cloudIcon);
        }
        else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
            setWicon(drizzleIcon);
        }
        else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
            setWicon(rainIcon);
        }
        else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
            setWicon(snowIcon);
        }
        else {
            setWicon(clearIcon);
        }
     }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type='text' className='cityInput' placeholder='Search' /> 
            <div className='search-icon' onClick={()=>{search()}}>
                <img src={searchIcon} alt='' />
            </div>
        </div>
        <div className='weather-image'>
            <img src={wicon} alt="" />
        </div>
        <div className='weather-temp'>24°c</div>
        <div className='weather-location'>London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidityIcon} alt="" className="icon" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={windIcon} alt="" className="icon" />
                <div className="data">
                    <div className="wind-rate">18 km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp