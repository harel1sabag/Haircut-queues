import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm';
import AdminCalendar from './components/AdminCalendar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/admin" element={<AdminCalendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 