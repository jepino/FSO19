import React, { useState } from "react";
import ReactDOM from "react-dom";

const initialPoints = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

const Button = ({ onClick, title }) => {
  return <button onClick={onClick}>{title}</button>;
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(initialPoints);

  const onVote = index => {
    const copy = { ...points };
    copy[index] += 1;
    setPoints(copy);
  };

  const onNext = () => {
    setSelected(Math.floor(Math.random() * Math.floor(6)));
  };

  const getMostVoted = () => {
    const arr = Object.values(points);
    const maxVotes = Math.max(...arr);
    const tempArr = Object.keys(points);
    return tempArr.find(a => points[a] === maxVotes);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button onClick={() => onVote(selected)} title="vote" />
      <Button onClick={onNext} title="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[getMostVoted()]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
