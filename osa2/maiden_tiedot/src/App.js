import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Results from "./components/Results";

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("effect");
    axios
      .get(
        "https://restcountries.eu/rest/v2/all?fields=name;capital;population;languages;flag"
      )
      .then(response => {
        console.log("promise fulfilled");
        setCountries(response.data);
      });
  }, []);

  const handleFilterChange = event => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Results
        results={countries}
        filter={filter}
        onClick={handleFilterChange}
      />
    </div>
  );
};

export default App;
