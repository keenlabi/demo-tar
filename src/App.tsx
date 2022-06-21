import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Schools from './pages/schools';
import School from './pages/school';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Schools /> } />
        {/* <Route path="/" element={ <School /> } /> */}
      </Routes>
    </Router>
  );
}
