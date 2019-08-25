import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistic = ({ type, value, unit }) => {
  return (
    <tr>
      <td>{type}</td>
      <td>
        {value}
        {unit}
      </td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <table>
        <tbody>
          <Statistic value={good} type="good" />
          <Statistic value={neutral} type="neutral" />
          <Statistic value={bad} type="bad" />
          <Statistic value={good + neutral + bad} type="all" />
          <Statistic
            value={(good - bad) / (good + neutral + bad)}
            type="average"
          />
          <Statistic
            value={(good / (good + neutral + bad)) * 100}
            type="positive"
            unit="%"
          />
        </tbody>
      </table>
    );
  }
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
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
