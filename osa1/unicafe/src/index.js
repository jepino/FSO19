import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return (
    <span>
      <button onClick={onClick}>{text}</button>
    </span>
  );
};

const Statistics = ({ type, value, unit }) => {
  return (
    <p>
      {type} {value} {unit}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />
      </div>
      <div>
        <h1>statistics</h1>
        <Statistics value={good} type="good" />
        <Statistics value={neutral} type="neutral" />
        <Statistics value={bad} type="bad" />
        <Statistics value={good + neutral + bad} type="all" />
        <Statistics
          value={(good - neutral) / (good + neutral + bad)}
          type="average"
        />
        <Statistics
          value={(good / (good + neutral + bad)) * 100}
          type="positive"
          unit="%"
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
