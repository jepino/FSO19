import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const link = process.env.REACT_APP_APIKEY + capital;

  useEffect(() => {
    axios.get(link).then(response => {
      setWeather(response.data);
    });
  }, [link]);

  if (!!weather.current) {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>
          <b>temperature: </b> {weather.current.temp_c}
        </p>
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
        />
        <p>
          <b>wind: </b>
          {weather.current.wind_kph} kph <b>direction</b>{" "}
          {weather.current.wind_dir}
        </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Weather;
