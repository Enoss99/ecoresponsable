import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/Notfound';
import Rubriques from './pages/Rubriques';

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:4000/api/ping')
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <Router>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rubrique" element={<Rubriques />} />

        </Routes>
      </main>
    </Router>
  );
}

export default App;
