import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Forecast({ data }) {
  let [dateAndTimes, setDateAndTimes] = useState([]);

  useEffect(() => {
    let extractedDates = data.list;
    let formattedDateAndTimes = [];
    extractedDates.map((extractedDate) => {
      // console.log(extractedDate);
      // format date to look nice
      const dateString = extractedDate.dt_txt.split(" ")[0];
      const date = new Date(dateString);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = `${month}/${day}/${year}`;

      // format time to look nice
      let formattedTime = extractedDate.dt_txt.split(" ")[1].slice(0, 5);

      if (formattedTime !== "00:00") {
        formattedDateAndTimes.push({
          date: formattedDate,
          time: formattedTime,
          key: crypto.randomUUID(),
        });
      }
    });

    setDateAndTimes(formattedDateAndTimes);
  }, []);
  return (
    // loop over until time is 0000

    <div>
      <h1>4 day forecast</h1>
      {dateAndTimes.map((dateAndTime) => (
        <div key={dateAndTime.key}>
          <p>Date: {dateAndTime.date}</p>
          <p>Time: {dateAndTime.time}</p>
        </div>
      ))}
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
