import React, { useState, useEffect } from "react";
import "./App.css";
import { notes as Template } from "./sample";
import trash from "./icons/trash.svg";
import add from "./icons/add.svg";
import arrow from "./icons/arrow.svg";
import textHandlers from "./scripts/textHandler";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  // SHOWS BACK BUTTON WHEN MOBILE VIEW SIZE
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    if (localNotes) {
      setNotes(JSON.parse(localNotes));
    } else {
      setNotes(Template);
      toast.info("Welcome to Tyler's Notepad-Fly!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
        <ToastContainer />
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
              <h4>Character Count : {main_text.length}</h4>
            </div>
          </div>
        </div>
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
                  if (isMobile) {
                    setTimeout(() => {
                      setShowSide(true);
                    }, 100);
                  }
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
            className={showSide ? "main" : isMobile ? "main blur" : "main"}
            onClick={() => {
              updateStorage;
              if (!showSide && isMobile) {
                setShowSide(true);
              }
            }}
          >
            <div className="title">
              <div className="textbox">
                {isMobile ? (
                  <img
                    className={
                      showSide ? "mobile-toggle " : "mobile-toggle rotate-180"
                    }
                    src={arrow}
                    alt="Open Sidebar"
                    onClick={() => {
                      showSidebar();
                    }}
                  />
                ) : (
                  ""
                )}

                <input
                  className={showSide ? "full-width" : ""}
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
