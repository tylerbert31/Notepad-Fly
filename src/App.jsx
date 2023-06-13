import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const counter = [0, 1, 2, 1, 2, 1, 2];
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="sidebar">
            {counter.map((counter) => (
              <div className="card" key={counter}>
                <ul>
                  <li className="title">Title of Notepad</li>
                  <li className="date">13-06-2023</li>
                </ul>
              </div>
            ))}
          </div>
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
            <div className="text">
              <textarea name="Text" id="Text" cols="30" rows="10"></textarea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
