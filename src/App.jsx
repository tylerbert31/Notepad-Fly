import React, { useEffect, useState } from "react";
import "./App.css";
import { notes as Template } from "./sample";
import trash from "./icons/trash.svg";

function App() {
  const [notes, setNotes] = useState([]);
  const [main_title, setMainTitle] = useState("");
  const [main_text, setMainText] = useState("");
  const [mainIndex, setMainIndex] = useState(0);

  const handleRemove = (index) => {
    const newItems = notes.filter((item, i) => i !== index);
    setNotes(newItems);
    reset(index == 0 ? 1 : 0);
  };

  const reset = (index) => {
    setMainIndex(index);
    setMainTitle(notes[index].title);
    setMainText(notes[index].text);
  };

  useEffect(() => {
    setNotes(Template);
    setMainIndex(0);
  }, []);

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
                  setMainIndex(index);
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
                  <img
                    src={trash}
                    alt="trash"
                    onClick={() => {
                      const isConfirmed = confirm(
                        `Are you sure you want to delete ${notes[mainIndex].title}`
                      );
                      if (isConfirmed) {
                        handleRemove(mainIndex);
                      }
                    }}
                  />
                </div>
                <div className="word-count">
                  <h4>Word Count : {main_text.length}</h4>
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
