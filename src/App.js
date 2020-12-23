import React, { useState } from 'react';
import humidity from './icons/humidity.png';
import pressure from './icons/pressure.png';
import wind from './icons/wind.png';

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
      Promise.all([
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(value => value.json()),
        fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`).then(value => value.json())
        ])
        .then((values) => {
          const value1 = values[0]
          const value2 = values[1]
          setWeather(value1);
          setForecast(value2);
          setQuery('');
          setIcon(value1.weather[0].icon);
          console.log(value1);
          console.log(value2);
        })
    }
  }

  const dateBuilder = (d) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${month} ${date}, ${year}`
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

        {(typeof weather.main != "undefined") && (typeof forecast.city != "undefined") ? (
          <div className="window" >
            <div className="main-container">

              <div className="left-container">
                <div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + icon + '.png' }
                    alt="weather condition icon" 
                    className="weather-icon"
                  />
                </div>

                <div className="weather">
                  {weather.weather[0].main}
                </div>

                <div className="temperature">
                  {Math.round(weather.main.temp)}°C
                </div>

                <div className="location">
                  {weather.name}, {weather.sys.country}
                </div>

                <div className="date">
                  {dateBuilder(new Date())}
                </div>
              </div>

              <div className="gif-animation">
                <img 
                  src={ icon === '02d' || icon === '02n' || icon === '03d' || icon === '03n' || icon === '04d' || icon === '04n' 
                    ? "https://media.giphy.com/media/Qrdep630dyOucGsEsB/giphy.gif"
                    : icon === '09d' || icon === '09n' || icon === '10d' || icon === '10n'
                      ? "https://media.giphy.com/media/MDaMURfqSp7H1mQ1Ga/giphy.gif"
                      : icon === '11d' || icon === '11n'
                        ? "https://media.giphy.com/media/gdNti10T5nbcnOkIIg/giphy.gif"
                        : icon === '13d' || icon === '13n'
                          ? "https://media.giphy.com/media/h7Y3rfqV9qADYcOJaD/giphy.gif"
                          : icon === '50d' || icon === '50n'
                            ? "https://www.flaticon.com/svg/static/icons/svg/2736/2736757.svg"
                            : icon === '01d' 
                              ? "https://media.giphy.com/media/U5IshBeCxetWSPgC3f/giphy.gif"
                              : "https://media.giphy.com/media/f8hNMi8xjX8fVbNhet/giphy.gif"
                  }
                  alt="weather condition gif icon"
                  className="gif-icon"
                />
              </div>
              
              <div className="right-container">
                <div className="i-container">
                  <img src={humidity} alt="humidity icon" className="icons" />
                  <div className="humidity">
                    Humidity <br/> {weather.main.humidity}%
                  </div>
                </div>

                <div className="i-container">
                  <img src={pressure} alt="pressure icon" className="icons" />
                  <div className="pressure">
                    Pressure <br/> {weather.main.pressure} mBar
                  </div>
                </div>

                <div className="i-container">
                  <img src={wind} alt="wind icon" className="icons" />
                  <div className="wind">
                    Wind <br/> {Math.round((weather.wind.speed) * 15/8 )} km/h
                  </div>
                </div>
              </div>

            </div>

            <div className="bottom-slider">
              {forecast.list.map((x) =>
                <div className="card">
                  <div className="forecast-temp">
                    {Math.round(x.main.temp)}°C
                  </div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + x.weather[0].icon + '.png' }
                    alt="forecast icon" 
                  />
                  <div className="forecast-time">
                    {(x.dt_txt).slice(11, 16)}
                  </div>
                  <div className="forecast-date">
                    {(x.dt_txt).split('-').join('/').slice(0, 10)}
                  </div>
                </div>
              )}
            </div>

          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
