import React, { useState, useGlobal } from "reactn"
import { client } from '../api/client';
import PeopleForm from './PeopleForm';

const Person = (props) => {
  const { person } = props;
  const [people, setPeople] = useGlobal("people");
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    const { data } = await client.delete("/people/" + person._id);

    setPeople([
      ...people.filter((p) => p._id !== data._id)
    ])

    if(props.getPeople) props.getPeople();
  }

  const handleEdit = () => {
    setEditing(!editing);
  }

  return (
    <div>
      {editing && (
        <PeopleForm person={person} onSubmit={handleEdit} />
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