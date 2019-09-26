import React, { useState } from "react";
import { client } from '../api/client';
import PeopleForm from './PeopleForm';

const Person = (props) => {
  const { person } = props;
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    await client.delete("/people/" + person._id);

    if(props.getPeople) props.getPeople();
  }

  const handleEdit = () => {
    if(props.getPeople) props.getPeople();
    setEditing(!editing);
  }

  return (
    <div>
      {editing && (
        <PeopleForm person={person} getPeople={handleEdit} />
      )}
      {!editing && (
        <>
          <div>{person.firstName} {person.lastName}</div>
          <div>Age: {person.age || "N/A"}</div>
          <div>Username: {person.username}</div>
        </>
      )}
      <div>
        <button onClick={() => setEditing(!editing)}>Edit</button>
        <button onClick={handleDelete}>X</button>
      </div>
    </div>
  )
}

export default Person;