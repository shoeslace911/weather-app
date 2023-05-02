import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Forecast({ data }) {
  let [dateAndTimes, setDateAndTimes] = useState([]);
  // console.log(data);
  useEffect(() => {
    let extractedDates = data.list;
    let formattedDateAndTimes = [];
    let timeArray = [];
    let weatherArray = [];
    let tempArray = [];
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
            key: crypto.randomUUID(),
            time: [timeArray],
            weather: [weatherArray],
            temp: [tempArray],
          });
        }
        timeArray = [];
        weatherArray = [];
        tempArray = [];
      } else {
        timeArray.push(formattedTime);
        weatherArray.push(weather);
        tempArray.push(temp);
        return;
      }
    });

    setDateAndTimes(formattedDateAndTimes);
  }, [data]);

  return (
    // loop over until time is 0000

    <div>
      <h1>4 day forecast</h1>
      {dateAndTimes.map((dateAndTime) => (
        <div key={dateAndTime.key}>
          <p>Date: {dateAndTime.date}</p>
          <p>Time: {dateAndTime.time + " "}</p>
          <p>Weather: {dateAndTime.weather + " "}</p>
          <p>Temperature: {dateAndTime.temp + " "}</p>
        </div>
      ))}
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
