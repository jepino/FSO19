import React from "react";

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map(p => (
        <p key={p.name}>{p.name}</p>
      ))}
    </div>
  );
};

export default Persons;
