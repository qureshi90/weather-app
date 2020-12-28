import React, { useState } from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';
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
  const [forecast, setForecast] = useState({});
  const [error, setError] = useState(false);

  const search = (e) => {
    if (e.key === "Enter") {
      Promise.all([
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(value => value.json()),
        fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`).then(value => value.json())
        ])
        .then((values) => {
          const value1 = values[0]
          const value2 = values[1]
          setWeather({
            temp: value2.list[0].main.temp,
            condition: value2.list[0].weather[0].main,
            city: value2.city.name,
            country: value2.city.country,
            humidity: value2.list[0].main.humidity,
            airPressure: value2.list[0].main.pressure,
            windSpeed: value2.list[0].wind.speed,
            date: value2.list[0].dt_txt,
            favicon: value2.list[0].weather[0].icon
          });
          setForecast(value2);
          setQuery('');
          setError(false);
          console.log(value1);
          console.log(value2);
        })
        .catch( err => {
          setError(true);
          setQuery('');
          setWeather({});
          }
        )
    }
  }

  function Day(a) {
    return(
      setWeather({
        temp: forecast.list[a].main.temp,
        condition: forecast.list[a].weather[0].main,
        city: forecast.city.name,
        country: forecast.city.country,
        humidity: forecast.list[a].main.humidity,
        airPressure: forecast.list[a].main.pressure,
        windSpeed: forecast.list[a].wind.speed,
        date: forecast.list[a].dt_txt,
        favicon: forecast.list[a].weather[0].icon
      })
    )
  }

  return (
    <Container fluid="sm-3" className={
      typeof weather.temp != "undefined"
        ? weather.temp > 18 
          ? "App hot"
          : "App cold"
        : "App"
      }
    >
      <main>
        <Row className="search-container">
          <input 
            type="text"
            className="search-bar"
            placeholder="Enter City Name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </Row>

        { error ? <div className="error-message alert alert-warning">Error! Incorrect City name.</div> : (typeof weather != "undefined") && (typeof forecast.city != "undefined") ? (
          <div className="window">
            <Row className="d-flex justify-content-between">

              <Col col="sm" className="left-container">
                <div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + weather.favicon + '.png' }
                    alt="weather condition icon" 
                    className="weather-icon"
                  />
                </div>

                <div className="weather">
                  {weather.condition}
                </div>

                <div className="temperature">
                  {Math.round(weather.temp)}°C
                </div>

                <div className="location">
                  {weather.city}, {weather.country}
                </div>

                <div className="date">
                  {(weather.date).slice(0, 10)}
                </div>
              </Col>

              <Col col="sm" className="gif-animation">
                <img 
                  src={ ["02d", "02n", "03d", "03n", "04d", "04n"].includes(weather.favicon)  
                    ? "https://media.giphy.com/media/Qrdep630dyOucGsEsB/giphy.gif"
                    : ["09d", "09n", "10d", "10n"].includes(weather.favicon)
                      ? "https://media.giphy.com/media/MDaMURfqSp7H1mQ1Ga/giphy.gif"
                      : ["11d", "11n"].includes(weather.favicon)
                        ? "https://media.giphy.com/media/gdNti10T5nbcnOkIIg/giphy.gif"
                        : ["13d", "13n"].includes(weather.favicon)
                          ? "https://media.giphy.com/media/h7Y3rfqV9qADYcOJaD/giphy.gif"
                          : ["50d", "50n"].includes(weather.favicon)
                            ? "https://www.flaticon.com/svg/static/icons/svg/2736/2736757.svg"
                            : ["01d"].includes(weather.favicon) 
                              ? "https://media.giphy.com/media/U5IshBeCxetWSPgC3f/giphy.gif"
                              : "https://media.giphy.com/media/f8hNMi8xjX8fVbNhet/giphy.gif"
                  }
                  alt="weather condition gif icon"
                  className="gif-icon"
                />
              </Col>
              
              <Col col="sm" className="right-container">
                <div className="i-container">
                  <img src={humidity} alt="humidity icon" className="icons" />
                  <div className="humidity">
                    <span className="small-text">Humidity</span> <br/> {weather.humidity}% {/*{weather.main.humidity}%*/}
                  </div>
                </div>

                <div className="i-container">
                  <img src={pressure} alt="pressure icon" className="icons" />
                  <div className="pressure">
                    <span className="small-text">Pressure</span> <br/> {weather.airPressure} mBar {/*{weather.main.pressure} mBar*/}
                  </div>
                </div>

                <div className="i-container">
                  <img src={wind} alt="wind icon" className="icons" />
                  <div className="wind">
                    <span className="small-text">Wind</span> <br/> {Math.round((weather.windSpeed) * 15/8)} km/h {/*{Math.round((weather.wind.speed) * 15/8 )}*/}
                  </div>
                </div>
              </Col>

              
              <Col col="sm">

                <div className="forecast-data" onClick={() => Day(0)}>
                  <div>{(forecast.list[0].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[0].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[0].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>

                <div className="forecast-data" onClick={() => Day(8)}>
                  <div>{(forecast.list[8].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[8].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[8].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>

                <div className="forecast-data" onClick={() => Day(16)}>
                  <div>{(forecast.list[16].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[16].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[16].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>

                <div className="forecast-data" onClick={() => Day(24)}>
                  <div>{(forecast.list[24].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[24].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[24].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>

                <div className="forecast-data" onClick={() => Day(32)}>
                  <div>{(forecast.list[32].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[32].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[32].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>

              </Col>

            </Row>

            <div className="scroll">
              {forecast.list.map((x) =>
                <div className="forecast-card">
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
    </Container>
  );
}

export default App;
