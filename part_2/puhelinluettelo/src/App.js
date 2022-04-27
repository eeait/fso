import { useState, useEffect } from 'react'
import personService from "./services/persons"

const FilterForm = (props) => {
  return (
    <div>
    filter: <input
      value={props.filter}
      onChange={props.handleFilterChange}
    />
  </div>
  )
}

const NewPersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
          <div>
            name: <input
              value={props.newName}
              onChange={props.handleNameChange}
            />
          </div>
          <div>
            number: <input
              value={props.newNumber}
              onChange={props.handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form> 
    </div>
  )
}

const People = ({ personsToShow, handler }) => {
  return (
    <div>
    {personsToShow.map(person =>
      <Person key={person.name} person={person} handler={handler}/>
    )}
    </div>
  )
}

const Person = ({ person, handler }) => {
  return (
    <div className='person'>
      {person.name}: {person.number}<button onClick={handler(person.id)}>remove</button>
    </div>
  )
}

const Notification = ({ message, nature }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={nature}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("")
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState("")
  const [notificationNature, setNotificationNature] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const notify = (notification, nature, duration) => {
    setNotification(notification)
    setNotificationNature(nature)
    setTimeout(() => {
      setNotification(null)
    }, duration)
  }

  const checkName = (person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  
  const personsToShow = persons.filter(checkName)

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === "") {return}
    if (persons.map(p => p.name).includes(newName)) {
      if (window.confirm(`${newName} is already here. Replace the number?`)) {
        const id = persons.find(p => p.name === newName).id
        editPerson(id, newNumber)
        return
      } else {
        return
      }
    }
    const personObject = {name: newName, number: newNumber}
    //console.log(nameObject)
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName("")
        setNewNumber("")
        notify(`Successfully added ${newName}`, "positive", 5000)
      })
      .catch(error => {
        //console.log("About to notify error")
        //console.log(error.response)
        notify(error.response.data.error, "negative", 5000)
      })
  }

  const deletePerson = (id) => {
    //event.preventDefault()
    const personName = persons.find(person => person.id === id).name
    if (! window.confirm(`Remove ${personName}?`)) {
      return
    }
    //console.log(`Removed ${id}`)
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        notify(`Successfully deleted ${personName}`, "positive", 5000)
      })
  }

  const editPerson = (id, changedNumber) => {
    const person = persons.find(p => p.id === id)
    const editedPerson = { ...person, number: changedNumber}
    //console.log("trying to edit")
    personService
      .update(id, editedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id === id ? response.data : p))
        notify(`Successfully changed ${newName}'s number`, "positive", 5000)
      })
      .catch(error => {
        notify("This person was already deleted", "negative", 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const handleButtonClick = (id) => () => {
    //console.log("want to delete p with id", id)
    deletePerson(id)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} nature={notificationNature}/>
      <FilterForm filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <NewPersonForm 
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
        newName = {newName}
        newNumber = {newNumber}
        addPerson = {addPerson}
      />
      <h2>Numbers</h2>
      <People personsToShow={personsToShow} handler={handleButtonClick}/>
    </div>
  )
}

export default App

