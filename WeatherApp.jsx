import React from "react";
import "./WeatherApp.css" ;
import rain from "./rain.png" 
import search from "./search.png" 
import snow from "./snow.png" 
import clear from "./clear.png"
import cloud from "./cloud.png" 
import drizzle from "./drizzle.png"
import wind from "./wind.png" 
import humidity from "./humidity.png"
import { useState } from "react" 

export default function WeatherApp()
{
    let api_key = "bb65cbeeb1776f50564b89493f72591f" ;
    const [wicon , setWicon] = useState(cloud) ; 


    const searching = async() =>
    {
        const element = document.getElementsByClassName("cityInput") ; 
        if(element[0].value === "")
        {
            return 0 ;
        }
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}` ;

        let response = await fetch(url) ;
        let data = await response.json() ; 
        const humid = document.getElementsByClassName("humidity-percent");
        const winds = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location") ; 
        humid[0].innerHTML = data.main.humidity+"%"; 
        winds[0].innerHTML = data.wind.speed+"km/hr"; 
        temperature[0].innerHTML = data.main.temp+"°c" ; 
        location[0].innerHTML = data.name ; 

        if(data.weather[0].icon ==="01d" || data.weather[0].icon === "01n")
        {
            setWicon(clear) ;
        }
        else if(data.weather[0].icon ==="02d" || data.weather[0].icon === "02n")
        {
            setWicon(cloud) ; 
        }
        else if(data.weather[0].icon ==="03d" || data.weather[0].icon === "03n")
        {
            setWicon(drizzle) 
        }
        else if(data.weather[0].icon ==="04d" || data.weather[0].icon === "04n")
        {
            setWicon(drizzle) ; 
        }
        else if(data.weather[0].icon ==="09d" || data.weather[0].icon === "09n")
        {
            setWicon(cloud) ; 
        }
        else if(data.weather[0].icon ==="10d" || data.weather[0].icon === "10n")
        {
            setWicon(rain) ; 
        }
        else if(data.weather[0].icon ==="13d" || data.weather[0].icon === "13n")
        {
            setWicon(snow) ; 
        }
        else
        {
            setWicon(clear) ;
        }
    }


    return (
        <div   className="container"    >  
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder="Search" />
            <div className="search-icon"  onClick={()=>  {searching()} }  >
                <img src = {search} alt="Rain-img"  id="imgsearch"  />
            </div>
        </div>
        <div className="weather-image">
            <img src={wicon} alt = "Cloud -icon" id="cloud" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="" className="icon" id="humidity" />
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="" className="icon" id="wind"/>
                <div className="data">
                    <div className="wind-rate">18km / hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
        </div>
    )
}