import PropTypes from "prop-types";

export default function Forecast({ data }) {
  // console.log("forecast", data);
  console.log(data.list[0].dt_txt.split(" "));
  let [date, time] = data.list[0].dt_txt.split(" ");
  // let time =
  return (
    <div>
      <h1>Today&apos;s forecast</h1>
      <p>{date}</p>
      <p>{time}</p>
    </div>
  );
}

Forecast.propTypes = {
  data: PropTypes.object.isRequired,
};
