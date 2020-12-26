import React, { useState } from 'react';
import { Container, Row, Col } from 'bootstrap-4-react';
//import Carousel from 'react-bootstrap/Carousel';
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
          //setWeather(value1);
          setWeather({
            temp: value1.main.temp,
            condition: value1.weather[0].main,
            city: value1.name,
            country: value1.sys.country,
            humidity: value1.main.humidity,
            airPressure: value1.main.pressure,
            windSpeed: value1.wind.speed
          });
          setForecast(value2);
          setQuery('');
          setIcon(value1.weather[0].icon);
          console.log(value1);
          console.log(value2);
        })
        .catch( err => {
          console.log('error');
          alert("Error! Enter city name again...");
          setQuery('');
          } 
        )
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
    <Container fluid="sm-3" className={
      typeof weather.main != "undefined"
        ? weather.main.temp > 18 
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

        {(typeof weather != "undefined") && (typeof forecast.city != "undefined") ? (
          <div className="window">
            <Row className="d-flex justify-content-between">

              <Col col="sm" className="left-container">
                <div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + icon + '.png' }
                    alt="weather condition icon" 
                    className="weather-icon"
                  />
                </div>

                <div className="weather">
                  {weather.condition}
                </div>

                <div className="temperature">
                  {/*{Math.round(weather.main.temp)}°C*/}
                  {Math.round(weather.temp)}°C
                </div>

                <div className="location">
                  {/*{weather.name}, {weather.sys.country}*/}
                  {weather.city}, {weather.country}
                </div>

                <div className="date">
                  {dateBuilder(new Date())}
                </div>
              </Col>

              <Col col="sm" className="gif-animation">
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
                <div className="forecast-data">
                  <div>{(forecast.list[0].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[0].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[0].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>
                <div className="forecast-data">
                  <div>{(forecast.list[8].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[8].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[8].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>
                <div className="forecast-data">
                  <div>{(forecast.list[16].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[16].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[16].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>
                <div className="forecast-data">
                  <div>{(forecast.list[24].dt_txt).split('-').join('/').slice(5, 10)}</div>
                  <div>{Math.round(forecast.list[24].main.temp)}°C</div>
                  <img 
                    src={ 'http://openweathermap.org/img/w/' + forecast.list[24].weather[0].icon + '.png' } 
                    alt="weather icon"
                  />
                </div>
                <div className="forecast-data">
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

            {/*}
            <Row>
              <Carousel className="bottom-slider">
                {forecast.list.map((x) =>
                  <Carousel.Item>
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
                  </Carousel.Item>
                )}
              </Carousel>
            </Row>
            */}

          </div>
        ) : ('')}
      </main>
    </Container>
  );
}

export default App;
