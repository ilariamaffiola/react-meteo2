import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Weather.css";
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": cloudIcon,
    "03n": clearIcon,
    "04d": cloudIcon,
    "04n": clearIcon,
    "09d": drizzleIcon,
    "09n": drizzleIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "11d": rainIcon,
    "11n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search = (city) => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`
      )
      .then((response) => {
        console.log(response.data);

        const icon = allIcons[response.data.weather[0].icon] || clearIcon;
        setWeatherData({
          humidity: response.data.main.humidity,
          windSpeed: response.data.wind.speed,
          location: response.data.name,
          temperature: Math.floor(response.data.main.temp),
          icon: icon,
        });
      })
      .catch((error) => {
        setWeatherData(false);
        console.error("Error fetching weather data:", error);

        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Errore di rete");
        }
      });
  };

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          src={searchIcon}
          alt="search-icon"
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img
            src={weatherData.icon}
            alt="weather-icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity-icon" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind-icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
