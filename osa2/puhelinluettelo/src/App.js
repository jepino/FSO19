import React, { useState, useEffect } from "react";
import personService from "./services/persons";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    type: null
  });

  useEffect(() => {
    const fakePerson = {
      name: "hana vesi",
      number: "012343329"
    };
    personService.getAll().then(initialNumbers => {
      setPersons(initialNumbers.concat(fakePerson));
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
    const personObject = {
      name: newName,
      number: newNumber
    };
    if (persons.find(p => p.name === newName) !== undefined) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find(p => p.name === newName);
        personService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(p =>
                p.id !== returnedPerson.id ? p : returnedPerson
              )
            );
          })
          .catch(error => {
            setPersons(persons.filter(p => p.id !== person.id));
            setNotification({
              message: `Information of ${personObject.name} has already been removed from server`,
              type: "error"
            });
            setTimeout(() => {
              setNotification({
                message: null,
                type: null
              });
            }, 1000);
          });
        setNotification({
          message: `${personObject.name} updated`
        });
        setTimeout(() => {
          setNotification({
            message: null,
            type: null
          });
        }, 1000);
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService.create(personObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
      });
      setNotification({
        message: `Added ${personObject.name}`
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        });
      }, 1000);
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(id).catch(error => console.log(error));
      setPersons(persons.filter(p => p !== person));
      setNotification({
        message: `${person.name} deleted`
      });
      setTimeout(() => {
        setNotification({
          message: null,
          type: null
        });
      }, 1000);
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
      <Notification message={notification.message} type={notification.type} />
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
