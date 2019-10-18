import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then(initialNumbers => {
      setPersons(initialNumbers);
    });
  }, []);

  const personsToShow =
    filter === ""
      ? persons
      : persons.filter(p =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  const addPerson = event => {
    event.preventDefault();
    if (persons.find(p => p.name === newName) !== undefined) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      };
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id);
      setPersons(persons.filter(p => p !== person));
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => {
    setFilter(event.target.value);
  };

  const rows = () =>
    personsToShow.map(person => (
      <Person
        key={person.name}
        person={person}
        deletePerson={() => deletePerson(person.id)}
      />
    ));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <ul>{rows()}</ul>
    </div>
  );
};

export default App;
