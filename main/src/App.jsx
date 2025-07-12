import React from "react";
import "./swap.css";
import { Route, Routes } from "react-router-dom";
import { Middle } from "./components/Middle";
import { Home } from "./components/Home";
import Head from "./components/Head";
import Listing from "./components/Listing";
// import { Npinfo23 } from './components/npinfo23';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Middle />} />
      <Route path="/profile" element={<Head />} />
      <Route path="/listing" element={<Listing />} />
    </Routes>
  );
}

export default App;
