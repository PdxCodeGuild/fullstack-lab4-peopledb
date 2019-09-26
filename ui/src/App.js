import React, { setGlobal, useGlobal } from "reactn";
import "./App.css";
import PeopleList from "./components/PeopleList";

setGlobal({
  people: [],
})

function App() {

  const [people, setPeople] = useGlobal("people");

  console.log(people);

  return (
    <div>
      <PeopleList />
    </div>
  );
}

export default App;
