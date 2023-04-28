import "./App.css";
import CurrentWeather from "./comp/CurrentWeather";
import Search from "./comp/Search";
// import { GEO_API_URL } from "./Api";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };
  return (
    <>
      <h1>Get City</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {/* Activates when full country is entered in the AsycPaginate */}
      <CurrentWeather />
    </>
  );
}

export default App;
