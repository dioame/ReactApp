import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import NotFound from './components/NotFound';
import AppNavigation from './components/AppNavigation';

export default function() {

  const appName = "Record System";
  
  return (
    <div>
     
    <Router>
      <AppNavigation></AppNavigation>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
  
  </Router>
  </div>
  );
}
