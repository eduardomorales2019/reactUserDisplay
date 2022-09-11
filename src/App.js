import "./index.css";
import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import axios from "axios";
// ==============
// We have to create States for Proyect.

// URL from RandomApi
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [people, setpeople] = useState(null);
  const [title, setTitle] = useState("name");

  const [value, setValue] = useState("random Person");

  const handleValue = (e) => {
    // console.log(e.target);

    if (e.target.classList.contains("icon")) {
      // console.log("Soy el boton"); // not so exact
      const newVaalue = e.target.dataset.info;
      console.log(newVaalue);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios(url);
      // console.log(data);

      // as we use api object  we have to points sometimes to differents sites to get the data we wish for. !!
      // setLoading(true);
      const person = data.results[0];
      console.log(person);
      const { email, phone } = person;
      const { large: image } = person.picture; // RENAME SYNTAXIS
      const {
        login: { password },
      } = person; // NESTED OBJECT

      const { first, last } = person.name; // othe method

      // const { age, date } = person.dob; // one method
      const {
        dob: { age },
      } = person; // another method of get age

      const {
        dob: { date },
      } = person; // DATE OF BIRTH

      const {
        street: { number, name },
      } = person.location; // nested inside other object
      // =======

      // THE  EASE WAY IS TO CREATE A NEW OBJECT AND GET ALL ITEM INSIDE OF IT.

      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} , ${name}`,
        name: `${first} , ${last}`,
      };

      setpeople(newPerson);
      setLoading(false);
      setTitle("name");
      setValue(newPerson.name);
    } catch (error) {
      console.log(error);
    }
  };

  // depedency array just once as we render will fetch!
  useEffect(() => {
    fetchUser();
  }, []);

  // =========
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={people && people.image}
            alt="random user"
            className="user-img"
          ></img>
          <p className="user-title"> My {title} is </p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button className="icon" data-info="name" onMouseOver={handleValue}>
              <FaUser />
            </button>
            <button
              className="icon"
              data-info="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            {/* CHECK THE DATA. IT COULD ANY NAME, JUST DATA- "ANY NAME.. ANS IN JS LAND WE MUST  SET A DATASET. " OUT TERM  " */}
            <button className="icon" data-info="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-info="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-info="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>

          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
