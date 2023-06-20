import React, { useState } from "react";
import getDate from "./getDate";

const textHandlers = () => {
  const [notes, setNotes] = useState([]);
  const [main_title, setMainTitle] = useState("");
  const [main_text, setMainText] = useState("");
  const [mainIndex, setMainIndex] = useState(0);
  const [showSide, setShowSide] = useState(false);

  const addNote = async () => {
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

  const updateStorage = () => {
    localStorage.setItem("user_notes", JSON.stringify(notes));
  };

  return {
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
  };
};

export default textHandlers;
