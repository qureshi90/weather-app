import React, { useState } from 'react';

const api = {
  key: "9462236f0e28049b29c2a923b7eb368d",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');
  const [forecast, setForecast] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          setIcon(result.weather[0].icon);
          console.log(result);
        });
      
      fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
        .then(resp => resp.json())
        .then(result1 => {
          setForecast(result1);
          console.log(result1);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={
      typeof weather.main != "undefined"
        ? weather.main.temp > 18 
          ? "App hot"
          : "App cold"
        : "App"
      }
    >
      <main>
        <div className="search-container">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City Name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div className="main-container">

            <div className="left-container">
              <div className="icon">
                <img src={ 'http://openweathermap.org/img/w/' + icon + '.png' } alt="weather-icon" />
              </div>

              <div className="weather">
                {weather.weather[0].main}
              </div>

              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>

              <div className="date">
                {dateBuilder(new Date())}
              </div>

              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
            </div>
            
            <div className="right-container">
              <div className="humidity">
                Humidity <br/> {weather.main.humidity}%
              </div>
              <div className="pressure">
                Pressure <br/> {weather.main.pressure} mBar
              </div>
              <div className="wind">
                Wind <br/> {Math.round((weather.wind.speed) * 15/8 )} km/h
              </div>
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
