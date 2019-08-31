import React from "react";

const Courses = ({ courses }) => {
  return courses.map((c, i) => (
    <div key={i}>
      <Header name={c.name} />
      <Content parts={c.parts} />
    </div>
  ));
};

const Header = ({ name }) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Parts parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Parts = ({ parts }) =>
  parts.map(part => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));

const Total = ({ parts }) => {
  const total = parts.reduce((e, p) => p.exercises + e, 0);
  return <b>total of {total} exercises</b>;
};

export default Courses;
