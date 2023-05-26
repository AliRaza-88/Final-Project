import "./App.css";
import Navbar from "./components/layout/Navbar";
import React from 'react';
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Pages/Home";
import PageNotFound from "./components/Pages/PageNotFound";
import Contact from "./components/Pages/Contact";
import Create from "./components/tasks/Create";
import Update from "./components/tasks/Update";
import About from "./components/Pages/About";

function App() {

  const [apiData, setApiData] = useState([]);
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#042743";
    }}
  
  return (
    <>
      <Navbar mode={mode}
      toggleMode={toggleMode}/>  
      <Routes>
        <Route path="/" element={<Home apiData={apiData} setApiData={setApiData} mode={mode}/>} />
        <Route path="/about" element={<About mode={mode}/>} />
        <Route path="/contact" element={<Contact mode={mode}/>} />
        <Route path="/edit/:id" element={<Update apiData={apiData} setApiData={setApiData} mode={mode}/>} />
        <Route path="/newtask" element={<Create apiData={apiData} setApiData={setApiData} mode={mode}/>} /> 
        <Route path="*" element={<PageNotFound />} mode={mode}/>
        
      </Routes>
    </>
  );
}

export default App;
