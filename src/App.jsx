import "./App.css";
import CurrentWeather from "./comp/CurrentWeather";
import Search from "./comp/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";
import { useState } from "react";

function App() {
  const [cityWeather, setCityWeather] = useState(null);
  const [cityForecast, setCityForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");
    const weatherFetch = fetch(
      `${WEATHER_API_URL}weather?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${long}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${long}&units=metric`
    );

    // AJAX

    Promise.all([weatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json(); // await doesn't work without the async on line 19

        // this is reversed because if not the cities will just stack upon each other
        setCityWeather({ city: searchData.label, ...weatherResponse });
        setCityForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => {
        console.log("error is", err);
      });
  };

  console.log("city weather", cityWeather);
  console.log("city forecast", cityForecast);

  return (
    <>
      <h1>Cheese</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {/* Activates when full country is entered in the AsycPaginate */}
      {cityWeather && <CurrentWeather data={cityWeather} />}
    </>
  );
}

export default App;
