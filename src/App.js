// src/App.js
import React from "react";
import PrinterComponent from "./components/PrinterComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>DEVELOPMENT ENV</h2>
        <h1>qzTray Printer Integration</h1>
        <PrinterComponent />
      </header>
    </div>
  );
}

export default App;
