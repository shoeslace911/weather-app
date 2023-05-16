import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

export default function CurrentWeather({ data, forecastData }) {
  let [dailyWeather, setDailyWeather] = useState([]);
  let [dailyTime, setDailyTime] = useState([]);
  let [dailyTemp, setDailyTemp] = useState([]);
  let dailyTimeArray = [];
  let dailyWeatherArray = [];
  let tempArray = [];

  //Slider
  let dailyWeatherLength = dailyWeather.length - 1;

  //ICons
  let weatherIcon = `/src/img/icon/${data.weather[0].icon}.png`;

  // date & time
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let timeZone = data.timezone;
  let convertedTime = new Date(Date.now() + timeZone / 3600);
  let dayOfWeek = daysOfWeek[convertedTime.getDay()];
  let day = monthsOfYear[convertedTime.getMonth()];
  let today = (dayOfWeek, `${day}, ${convertedTime.getDate()} ${convertedTime.getFullYear()}`);

  //time
  let [hours, setHours] = useState(0);

  let [minutes, setMinutes] = useState(0);

  let [seconds, setSeconds] = useState(0);
  setTimeout(() => {
    let now = new Date();
    let offset = timeZone + now.getTimezoneOffset() * 60;
    let date = new Date(now.getTime() + offset * 1000);
    setHours(date.getHours().toString().padStart(2, "0"));
    setMinutes(date.getMinutes().toString().padStart(2, "0"));
    setSeconds(now.getSeconds().toString().padStart(2, "0"));
  }, 1000);

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
      } else {
        return true;
      }
    });
    setDailyTime(dailyTimeArray);
    setDailyWeather(dailyWeatherArray);
    setDailyTemp(tempArray);
  }, [data]);

  let [sliderValue, setSliderValue] = useState(10);
  let [arrayNum, setArrayNum] = useState(0);
  const valueText = (value) => {
    let num = Number(String(sliderValue).replace("0", ""));
    setSliderValue(value);
    setArrayNum(num);
  };

  let dailyFeels = forecastData.list[arrayNum].main.feels_like;
  let dailyPressure = forecastData.list[arrayNum].main.pressure;
  let dailyHumidity = forecastData.list[arrayNum].main.humidity;
  let dailyWindSpeed = forecastData.list[arrayNum].wind.speed;
  let dailyWindDeg = forecastData.list[arrayNum].wind.deg;
  let dailyIcon = `/src/img/icon/${forecastData.list[arrayNum].weather[0].icon}.png`;

  return (
    <div className="top">
      <img src={weatherIcon} alt="weather-icon" style={{ width: "10%" }} />
      <div className="">
        <h2 className="city">{data.city}</h2>
        <h2 className="time">
          {hours}:{minutes}:{seconds}
        </h2>
        <h2 className="city-time">{today}</h2>
        <h3 className="weather-desc">{data.weather[0].description}</h3>
      </div>
      <div className="bottom">
        <p className="temperature">{dailyTemp[arrayNum]}</p>

        <div className="details ">
          <ul className="flex">
            <li>
              <p>Feels Like</p>
              <p>{Math.floor(dailyFeels)}°</p>
            </li>
            <li>
              <div>
                <p>Wind</p>
                <p>{dailyWindSpeed} m/s</p>
              </div>
              <div>
                <p>Degrees</p>
                <p>{dailyWindDeg}°</p>
              </div>
            </li>
            <li>
              <p>Humidity</p>
              <p>{dailyHumidity}%</p>
            </li>
            <li>
              <p>Pressure</p>
              <p>{dailyPressure}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="time-container">
        <div className="time">{dailyWeather[arrayNum]}</div>
        <div className="time-slider">{dailyTime[arrayNum]}</div>
        <img src={dailyIcon} alt="weather-icon" style={{ width: "10%" }} />
        <Slider
          aria-label="Temperature"
          defaultValue={10}
          getAriaValueText={valueText}
          step={10}
          marks
          min={0}
          max={dailyWeatherLength < 0 ? 10 : dailyWeatherLength * 10}
        />
      </div>

      <div className="time-slider">
        <p>{dailyTime}</p>
      </div>
    </div>
  );
}

// prop validations
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
  forecastData: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        dt_txt: PropTypes.string.isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            main: PropTypes.string.isRequired,
          })
        ).isRequired,
        main: PropTypes.shape({
          temp: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};
