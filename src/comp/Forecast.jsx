import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

export default function Forecast({ data }) {
  let [dateAndTimes, setDateAndTimes] = useState([]);

  console.log(`/src/img/icon/${data.list[0].weather[0].icon}.png`);
  useEffect(() => {
    let extractedDates = data.list;
    let formattedDateAndTimes = [];
    let timeArray = [];
    let feelsLikeArray = [];
    let weatherArray = [];
    let tempArray = [];
    let iconArray = [];
    let id = 1;
    extractedDates.map((extractedDate) => {
      // format date to look nice
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
      const dateString = extractedDate.dt_txt.split(" ")[0];
      const date = new Date(dateString);
      const month = monthsOfYear[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = `${dayOfWeek}, ${month} ${day} ${year}`;
      // format time to look nice
      let formattedTime = extractedDate.dt_txt.split(" ")[1].slice(0, 5);
      // weather and temp
      let weather = extractedDate.weather[0].main;
      let floorFloat = (float) => {
        return `${Math.floor(float)}°`;
      };
      if (formattedTime == "00:00") {
        {
          formattedDateAndTimes.push({
            date: formattedDate,
            id: id,
            time: [timeArray],
            weather: [weatherArray],
            temp: [tempArray],
            feelsLike: [feelsLikeArray],
            icon: [iconArray],
            selectedIndex: 0,
          });
        }
        timeArray = [];
        weatherArray = [];
        tempArray = [];
        feelsLikeArray = [];
        iconArray = [];
        return id++;
      } else {
        timeArray.push(formattedTime);
        weatherArray.push(weather);
        tempArray.push(floorFloat(extractedDate.main.temp));
        feelsLikeArray.push(floorFloat(extractedDate.main.feels_like));
        iconArray.push(`/src/img/icon/${extractedDate.weather[0].icon}.png`);
        return;
      }
    });

    setDateAndTimes(formattedDateAndTimes);
  }, [data]);

  // key
  let [sliderLength, setSliderLength] = useState(0);
  const toggleChange = (id, value) => {
    const updatedArray = dateAndTimes.map((item) => {
      if (item.id == id) {
        setSliderLength(item.time[0].length);
        return { ...item, selectedIndex: value };
      }
      return item;
    });
    setDateAndTimes(updatedArray);
  };
  return (
    <div>
      <h1>5 day forecast</h1>
      {dateAndTimes.map((dateAndTime) => (
        <div key={dateAndTime.id}>
          {/* change depending if dateAndTimes key == this key */}
          <p>Date: {dateAndTime.date}</p>
          <p>Temperature: {dateAndTime.temp[0][dateAndTime.selectedIndex]}</p>
          <p>Time: {dateAndTime.time[0][dateAndTime.selectedIndex]}</p>
          <p>Weather: {dateAndTime.weather[0][dateAndTime.selectedIndex]}</p>
          <p>Feels like: {dateAndTime.feelsLike[0][dateAndTime.selectedIndex]}</p>
          <img src={dateAndTime.icon[0][dateAndTime.selectedIndex]} alt="weather-icon" />
          <Slider
            aria-label="Time"
            defaultValue={10}
            step={10}
            marks
            min={10}
            max={(sliderLength <= 0 ? 0 : sliderLength) * 10}
            key={dateAndTime.id}
            onChange={(event, value) => {
              toggleChange(dateAndTime.id, Number(String(value).replace("0", "")) - 1);
            }}
          />
        </div>
      ))}
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
