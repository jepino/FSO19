import React from "react";
import Weather from "./Weather";

const Results = ({ results, filter, onClick }) => {
  const fResults = results.filter(result =>
    result.name.toLowerCase().includes(filter.toLowerCase())
  );

  if (fResults.length === 0) {
    return <div>no matches</div>;
  } else if (fResults.length === 1) {
    return (
      <div>
        <h1>{fResults[0].name}</h1>
        <p>capital {fResults[0].capital}</p>
        <p>population {fResults[0].population}</p>
        <h2>languages</h2>
        <ul>
          <Languages languages={fResults[0].languages} />
        </ul>
        <img
          src={fResults[0].flag}
          alt={`flag of ${fResults[0].name}`}
          width="30%"
        />
        <Weather capital={fResults[0].capital} />
      </div>
    );
  } else if (fResults.length < 10) {
    return (
      <div>
        {fResults.map(c => (
          <div key={c.name}>
            {c.name}{" "}
            <button value={c.name} onClick={onClick}>
              show
            </button>
          </div>
        ))}
      </div>
    );
  } else {
    return <div>Too many matches, specify another filter</div>;
  }
};

const Languages = languages => {
  const lNames = languages.languages.map(l => <li key={l.name}>{l.name}</li>);

  return (
    <div>
      <ul>{lNames}</ul>
    </div>
  );
};

export default Results;
