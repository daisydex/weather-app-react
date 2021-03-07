import React, { useState } from "react";
import axios from 'axios';

export default function Weather() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [weather, setWeather] = useState({});

  function displayWeather(response) {
    setMessage(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "cc3c1c3a90bf11d5dba4d1d793f72cde";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={updateCity} />
      <button type="Submit">Search</button>
    </form>
  );

  if (message) {
    return (
       <div class="container">
        {form}
         <div class="weather-app">
        <div class="row">
          <div class="col-8">
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
        </div>
        </div>
        </div>
      </div>
    );
  } else {
    return form;
  }
}
