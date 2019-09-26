import React, { useState, useEffect } from "react";
import { client } from '../api/client';
import PeopleForm from "./PeopleForm";
import Person from './Person';


const PeopleList = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPeople = async () => {
    setLoading(true);
    const { data } = await client.get("/people");
    setPeople(data);
    setLoading(false);
  }

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <PeopleForm getPeople={getPeople}/>
      {loading && (<div>Loading...</div>)}
      {!loading && (
        <>
          {!people.length && (
            <div>No people <span role="img" aria-label="sad face">😢</span></div>
          )}
          {people.map((person) => (
            <Person 
              key={person._id} 
              getPeople={getPeople}
              person={person}
            />
          ))}
        </>
      )}
    </div>
  )
}

// Same!
// module.exports = PeopleList;
export default PeopleList;
