import React, { useState } from "react";
import { client } from '../api/client';

const PeopleForm = (props) => {
  const { person } = props;

  const initialState = {
    firstName: person.firstName || '',
    lastName: person.lastName || '',
    username: person.username || '',
    age: person.age || ''
  };

  const [formState, setFormState] = useState(initialState);

  const onSubmit = async (e) => {
    e.preventDefault();

    if(person) {
      await client.patch("/people/" + person._id, formState);
    } else {
      await client.post("/people", formState);
      setFormState(initialState);
    }

    // Check if the onSubmit function was passed as a property
    // to this component, if so call it!
    // && typeof props.getPeople === "function" for full sanity-check
    if(props.getPeople) props.getPeople();

  }
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formState.firstName}
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formState.lastName}
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange} 
        />
      </div>
      <div>
        <label>Age:</label>
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleChange} 
        />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  )
}
PeopleForm.defaultProps = {
  person: {},
}

export default PeopleForm;