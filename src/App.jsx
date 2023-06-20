import React, { useEffect } from "react";
import "./App.css";
import { notes as Template } from "./sample";
import trash from "./icons/trash.svg";
import add from "./icons/add.svg";
import textHandlers from "./scripts/textHandler";

function App() {
  const {
    notes,
    setNotes,
    main_title,
    setMainTitle,
    main_text,
    setMainText,
    mainIndex,
    setMainIndex,
    showSide,
    setShowSide,
    addNote,
    handleUpdateTitle,
    updateStorage,
  } = textHandlers();

  const showSidebar = () => {
    setShowSide(!showSide);
  };
  // TO BE CONTINUED, ADD MOBILE_VIEW? FOR RESPONSIVENESS

  const handleRemove = (index) => {
    const newItems = notes.filter((item, i) => i !== index);
    setNotes(newItems);
    reset(index);
    updateStorage();
  };

  const reset = (index) => {
    if (notes > 0) {
      const check = index + 1 >= notes.length ? index - 1 : index + 1;
      setMainIndex(check - 1);
      if (notes.length > 0) {
        setMainTitle(notes[check].title);
        setMainText(notes[check].text);
      } else {
        setMainTitle("");
        setMainText("");
        // NOT WORKING YET
      }
      updateStorage();
    }
  };

  useEffect(() => {
    const localNotes = localStorage.getItem("user_notes");
    const localIndex = localStorage.getItem("mainIndex");
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    } else {
      setNotes(Template);
      alert("Hi! Tyler's Notepad-Fly is yet to have a mobile view.");
    }
    setMainIndex(-1);
  }, []);

  const handleUpdateText = (e) => {
    const newText = [...notes];
    newText[mainIndex].text = e;
    setNotes(newText);
    updateStorage();
  };

  return (
    <>
      <div className="wrapper">
        <div className="header">
          <div className="add trash">
            <img
              src={add}
              alt="Add Note"
              onClick={() => {
                addNote();
                updateStorage();
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
        <div
          className="container"
          onMouseEnter={() => {
            updateStorage();
          }}
        >
          <div
            className={showSide ? "sidebar hide" : "sidebar"}
            onMouseEnter={() => {
              updateStorage();
            }}
          >
            {notes.map((notes, index) => (
              <div
                className="card"
                key={index}
                onClick={() => {
                  setMainIndex(index);
                  setMainTitle(notes.title);
                  setMainText(notes.text);
                  updateStorage();
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
          <div
            className={showSide ? "main full-width" : "main"}
            onClick={() => {
              updateStorage;
            }}
          >
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
