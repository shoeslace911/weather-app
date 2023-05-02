import PropTypes from "prop-types";
import "../css/currentWeather.css";
import { useEffect, useState } from "react";

export default function CurrentWeather({ data, forecastData }) {
  let [dailyWeather, setDailyWeather] = useState([]);
  let [dailyTime, setDailyTime] = useState([]);
  let [dailyTemp, setDailyTemp] = useState([]);
  const weatherIcon = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  let dailyTimeArray = [];
  let dailyWeatherArray = [];
  let tempArray = [];

  useEffect(() => {
    let dates = forecastData.list;
    dates.some((date) => {
      let extractedTime = date.dt_txt.split(" ")[1].slice(0, 5);
      let extractedWeather = date.weather[0].main;
      let extractedTemp = `${Math.floor(date.main.temp)}°`;
      if (extractedTime !== "00:00") {
        dailyTimeArray.push(extractedTime);
        dailyWeatherArray.push(extractedWeather);
        tempArray.push(extractedTemp);
        // exit map function immediately
      } else {
        return true;
      }
    });
    setDailyTime(dailyTimeArray);
    setDailyWeather(dailyWeatherArray);
    setDailyTemp(tempArray);
  }, [data]);
  return (
    <div>
      <div className="top">
        <img src={weatherIcon} alt="weather-icon" style={{ width: "10%" }} />
        <h2 className="city">{data.city}</h2>
        <h3 className="weather-desc">{data.weather[0].description}</h3>
      </div>
      <div className="bottom">
        <p className="temperature">{dailyTemp}</p>
        <div className="details">
          <ul className="weather-details">
            <li>
              <p>Feels Like</p>
              <p>{Math.floor(data.main.feels_like)}°</p>
            </li>
            <li>
              <div>
                <p>Wind</p>
                <p>{data.wind.speed} m/s</p>
              </div>
              <div>
                <p>Degrees</p>
                <p>{data.wind.deg}°</p>
              </div>
            </li>
            <li>
              <p>Humidity</p>
              <p>{data.main.humidity}%</p>
            </li>
            <li>
              <p>Pressure</p>
              <p>{data.main.pressure}</p>
            </li>
          </ul>
        </div>
        <div className="time-container">
          <div className="time">{dailyWeather}</div>
          <div className="time-slider">{dailyTime}</div>
        </div>
      </div>
    </div>
  );
}
CurrentWeather.propTypes = {
  data: PropTypes.shape({
    city: PropTypes.string.isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
      deg: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
