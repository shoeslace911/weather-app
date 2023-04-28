import "./App.css";
import Search from "./comp/search/Search";
import { GEO_API_URL } from "./Api";

function App() {
  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
  };
  return (
    <>
      <h1>Ola</h1>
      <Search onSearchChange={handleOnSearchChange} />
      {console.log(GEO_API_URL)}
    </>
  );
}

export default App;
