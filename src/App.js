import "./App.css";
import Navbar from "./components/layout/Navbar";
import Contact from "./components/Pages/Contact";
import Home from "./components/Pages/Home";
import { Routes, Route } from "react-router-dom";
import PageNotFound from "./components/Pages/PageNotFound";
import React from 'react';
import Create from "./components/tasks/Create";
import { useState } from "react";
import Update from "./components/tasks/Update";
import About from "./components/Pages/About";





function App() {

  const [apiData, setApiData] = useState([]);

 

  return (
    <>
      <Navbar />  
      <Routes>
        <Route path="/" element={<Home apiData={apiData} setApiData={setApiData} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/edit" element={<Update />} />
       <Route path="/newtask" element={<Create apiData={apiData} setApiData={setApiData}/>} /> 
        <Route path="*" element={<PageNotFound />} />
        
      </Routes>
    </>
  );
}

export default App;
