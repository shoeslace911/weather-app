import "./App.css";
import CurrentWeather from "./comp/CurrentWeather";
import Search from "./comp/Search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./Api";

function App() {
  const handleOnSearchChange = (searchData) => {
    const [lat, long] = searchData.value.split(" ");
    const city = `{${WEATHER_API_URL}weather?appid=${WEATHER_API_KEY}&lat=${lat}&lon=${long}}`;
  };
  return (
    <>
      <h1>Cheese</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {/* Activates when full country is entered in the AsycPaginate */}
      <CurrentWeather />
    </>
  );
}

export default App;
