import React, { useEffect, useState } from "react";
import "./App.css";
import { notes as Template } from "./sample";
import trash from "./icons/trash.svg";
import add from "./icons/add.svg";
import getDate from "./scripts/getDate";

function App() {
  const [notes, setNotes] = useState([]);
  const [main_title, setMainTitle] = useState("");
  const [main_text, setMainText] = useState("");
  const [mainIndex, setMainIndex] = useState(0);
  const [showSide, setShowSide] = useState(false);

  const showSidebar = () => {
    setShowSide(!showSide);
  };
  // TO BE CONTINUED, ADD MOBILE_VIEW?

  const handleRemove = (index) => {
    const newItems = notes.filter((item, i) => i !== index);
    setNotes(newItems);
    reset(index);
    updateStorage();
  };

  const reset = (index) => {
    const check = index + 1 >= notes.length ? index - 1 : index + 1;
    setMainIndex(check - 1);
    setMainTitle(notes[check].title);
    setMainText(notes[check].text);
  };

  useEffect(() => {
    const localNotes = localStorage.getItem("user_notes");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    } else {
      setNotes(Template);
    }
    // setNotes(Template);
    setMainIndex(-1);
  }, []);

  const addNote = () => {
    const newNote = [{ title: "New Note", text: "New Note", date: getDate() }];
    setNotes([newNote[0], ...notes]);
    setMainTitle(newNote[0].title);
    setMainText(newNote[0].text);
    setMainIndex(0);
    updateStorage();
  };

  const handleUpdateTitle = (e) => {
    const newTitle = [...notes];
    newTitle[mainIndex].title = e;
    setNotes(newTitle);
    updateStorage();
  };

  const handleUpdateText = (e) => {
    const newText = [...notes];
    newText[mainIndex].text = e;
    setNotes(newText);
    updateStorage();
  };

  const updateStorage = () => {
    localStorage.setItem("user_notes", JSON.stringify(notes));
  };

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="add trash">
            <img
              src={add}
              alt="trash"
              onClick={() => {
                addNote();
              }}
            />
          </div>
          <div className="options">
            <div className="trash">
              <img
                src={trash}
                alt="trash"
                onClick={() => {
                  if (mainIndex > -1) {
                    const isConfirmed = confirm(
                      `Are you sure you want to delete ${notes[mainIndex].title}`
                    );
                    if (isConfirmed) {
                      handleRemove(mainIndex);
                    }
                  } else {
                    alert("Please select a note to delete.");
                  }
                }}
              />
            </div>
            <div className="word-count">
              <h4
                onClick={() => {
                  showSidebar();
                }}
              >
                Character Count : {main_text.length}
              </h4>
            </div>
          </div>
        </div>{" "}
        <div className="container">
          <div className={showSide ? "sidebar hide" : "sidebar"}>
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
                  <li className="title">
                    {notes.title ? notes.title : "My note"}
                  </li>
                  <li className="date">{notes.date}</li>
                </ul>
              </div>
            ))}
          </div>
          <div className={showSide ? "main full-width" : "main"}>
            <div className="title">
              <div className="textbox">
                <input
                  type="text"
                  name="Title"
                  id="Title"
                  maxLength={30}
                  placeholder="My note"
                  value={main_title ? main_title : ""}
                  onChange={(e) => {
                    setMainTitle(e.target.value);
                    handleUpdateTitle(e.target.value);
                  }}
                  disabled={notes.length < 1 || mainIndex < 0 ? true : false}
                  readOnly={notes.length < 1 || mainIndex < 0 ? true : false}
                />
              </div>
            </div>
            <div className="text">
              <textarea
                name="Text"
                placeholder="Empty"
                id="Text"
                maxLength={5900}
                cols="30"
                rows="10"
                value={main_text}
                onChange={(e) => {
                  setMainText(e.target.value);
                  handleUpdateText(e.target.value);
                }}
                disabled={notes.length < 1 || mainIndex < 0 ? true : false}
                readOnly={notes.length < 1 || mainIndex < 0 ? true : false}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
