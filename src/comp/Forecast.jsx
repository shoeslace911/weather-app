import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Slider } from "@mui/material";

export default function Forecast({ data }) {
  let [dateAndTimes, setDateAndTimes] = useState([]);
  // console.log(data);
  useEffect(() => {
    let extractedDates = data.list;
    let formattedDateAndTimes = [];
    let timeArray = [];
    let weatherArray = [];
    let tempArray = [];
    let id = 1;
    extractedDates.map((extractedDate) => {
      // format date to look nice
      const dateString = extractedDate.dt_txt.split(" ")[0];
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;
      // format time to look nice
      let formattedTime = extractedDate.dt_txt.split(" ")[1].slice(0, 5);
      // weather and temp
      let weather = extractedDate.weather[0].main;
      let temp = `${Math.floor(extractedDate.main.temp)}°`;
      if (formattedTime == "00:00") {
        {
          formattedDateAndTimes.push({
            date: formattedDate,
            id: id,
            time: [timeArray],
            weather: [weatherArray],
            temp: [tempArray],
            selectedIndex: 0,
          });
        }
        timeArray = [];
        weatherArray = [];
        tempArray = [];
        return id++;
      } else {
        timeArray.push(formattedTime);
        weatherArray.push(weather);
        tempArray.push(temp);
        return;
      }
    });

    setDateAndTimes(formattedDateAndTimes);
  }, [data]);

  // slider things
  let [index, setIndex] = useState(0);
  const valueText = (value) => {
    let num = Number(String(value).replace("0", ""));
    setIndex(num);
  };

  // key
  const toggleChange = (id) => {
    const updatedArray = dateAndTimes.map((item) => {
      if (item.id == id) {
        return { ...item, selectedIndex: index };
      }
      return item;
    });
    setDateAndTimes(updatedArray);
  };
  return (
    <div>
      <h1>4 day forecast</h1>
      {dateAndTimes.map((dateAndTime) => (
        <div key={dateAndTime.id}>
          {/* change depending if dateAndTimes key == this key */}
          <p>Date: {dateAndTime.date}</p>
          <p>Temperature: {dateAndTime.temp[0][dateAndTime.selectedIndex]}</p>
          <p>Time: {dateAndTime.time[0][dateAndTime.selectedIndex]}</p>
          <p>Weather: {dateAndTime.weather[0][dateAndTime.selectedIndex]}</p>
          <Slider
            aria-label="Time"
            defaultValue={10}
            step={10}
            marks
            min={10}
            max={(dateAndTime < 0 ? dateAndTime[0].time[0] : 7) * 10}
            key={dateAndTime.id + "slider"}
            onChangeCommitted={(event, value) => {
              toggleChange(dateAndTime.id);
              valueText(value);
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
