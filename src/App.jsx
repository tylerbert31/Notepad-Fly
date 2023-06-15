import React, { useState } from "react";
import "./App.css";
import { notes } from "./sample";
import trash from "./icons/trash.svg";

function App() {
  const [main_title, setMainTitle] = useState("");
  const [main_text, setMainText] = useState("");

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="sidebar">
            {notes.map((notes, index) => (
              <div
                className="card"
                key={notes}
                onClick={() => {
                  setMainTitle(notes.title);
                  setMainText(notes.text);
                }}
              >
                <ul>
                  <li className="title">{notes.title}</li>
                  <li className="date">{notes.date}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="main">
            <div className="title">
              <div className="textbox">
                <input
                  type="text"
                  name="Title"
                  id="Title"
                  maxLength={30}
                  placeholder="Title Here"
                  value={main_title ? main_title : ""}
                  onChange={(e) => {
                    setMainTitle(e.target.value);
                  }}
                />
              </div>
              <div className="options">
                <div className="trash">
                  <img src={trash} alt="trash" />
                </div>
              </div>
            </div>
            <div className="text">
              <textarea
                name="Text"
                id="Text"
                cols="30"
                rows="10"
                value={main_text}
                onChange={(e) => {
                  setMainText(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
