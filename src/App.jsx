import React, { useState, useEffect } from "react";
import "./App.css";
// import createNote from "./scripts/createNote";

function App() {
  // const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   // Check if the localStorage has the variable "notes"
  //   if (!localStorage.getItem("notes")) {
  //     // localStorage.setItem("notes", { createNote });
  //     // setNotes(...notes, createNote);
  //   }
  // }, []);

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="sidebar">Hey</div>
          <div className="main">
            <div className="title">
              <input
                type="text"
                name="Title"
                id="Title"
                maxLength={30}
                placeholder="Title Here"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
