import PropTypes from "prop-types";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../Api";

export default function Search({ onSearchChange }) {
  // required to validate the prop
  Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
  };

  // STEP 2 set data from input
  const [search, setSearch] = useState("");

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    // activate when search <Data>  </Data> is retrieve
  };

  const loadOptions = (inputValue) => {
    return (
      fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
        .then((response) => response.json())
        // we need lang and longitude for the weather
        .then((response) => {
          return {
            options: response.data.map((city) => {
              return { value: `${city.latitude} ${city.longitude}`, label: `${city.name}, ${city.countryCode}` };
            }),
          };
        })
    );
  };

  return (
    <div className="w-1/2 text-center mx-auto text-black py-5 ">
      {/* STEP 1 get data from input */}
      <AsyncPaginate
        placeholder="Enter City"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
      />
    </div>
  );
}
