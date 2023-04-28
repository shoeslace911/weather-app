import PropTypes from "prop-types";
import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../../Api";

export default function Search({ onSearchChange }) {
  // required to validate the prop
  Search.propTypes = {
    onSearchChange: PropTypes.func.isRequired,
  };

  const { search, setSearch } = useState("");

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange("searchData");
  };

  const loadOptions = (inputValue) => {
    return (
      fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
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
    <div>
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
