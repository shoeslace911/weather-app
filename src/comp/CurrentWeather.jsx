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
  let dailyIcon = `/src/img/icon/${forecastData.list[arrayNum].weather[0].icon}.png`;

  return (
    <div>
      <div className="text-center pt-8 transition ease-in-out">
        <h2 className="text-6xl ">{data.city}</h2>
        <h2 className="text-5xl">
          {hours}:{minutes}:{seconds}
        </h2>
        <h2 className="text-xl">
          {dayOfWeek}, {today}
        </h2>
      </div>
      <div className="flex justify-center relative py-10">
        <img src={dailyIcon} alt="weather-icon" className="w-56 -z-10 " />
        <div className="my-auto px-6">
          <h3 className="text-4xl capitalize">{data.weather[0].description}</h3>
          <p className="text-4xl text-center">{dailyTemp[arrayNum]}</p>
        </div>
        <div className="my-auto">
          <ul className="flex ">
            <li className="my-auto pr-6">
              <p className="text-2xl">Feels Like</p>
              <p className="text-center text-xl">{Math.floor(dailyFeels)}°</p>
            </li>
            <li className="my-auto pr-6">
              <div>
                <p className="text-2xl">Wind</p>
                <p className="text-center text-xl">{dailyWindSpeed} m/s</p>
              </div>
            </li>
            <li className="my-auto pr-6">
              <p className="text-2xl">Humidity</p>
              <p className="text-center text-xl">{dailyHumidity}%</p>
            </li>
            <li className="my-auto ">
              <p className="text-2xl">Pressure</p>
              <p className="text-center text-xl">{dailyPressure}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <Slider
          aria-label="Temperature"
          defaultValue={10}
          getAriaValueText={valueText}
          step={10}
          marks
          min={0}
          max={dailyWeatherLength < 0 ? 10 : dailyWeatherLength * 10}
          sx={{
            color: "white",
            width: 1200,
            height: 15,
          }}
        />
      </div>
      <div>
        <ul className="text-center">
          {dailyTime.map((shit) => {
            return (
              <li className="inline text-3xl px-16 " key={crypto.randomUUID()}>
                {shit}
              </li>
            );
          })}
        </ul>
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
