export default function CurrentWeather() {
  return (
    <div>
      <div className="top">
        <img src="../../sun.png" alt="sun" style={{ width: "20%" }} />
        <h2 className="city"></h2>
        <p className="weather-description">Sunny</p>
      </div>
      <div className="bottom">
        <p className="temperature">1000°</p>
        <div className="details">
          <ul>
            <li>
              <p>Feels Like</p>
              <p>22°</p>
            </li>
            <li>
              <p>Wind</p>
              <p>2 m/s</p>
            </li>
            <li>
              <p>Humidity</p>
              <p>200%</p>
            </li>
            <li>
              <p>Pressure</p>
              <p>10000 hPa</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
