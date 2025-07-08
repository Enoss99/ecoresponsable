import React from 'react';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/Notfound';
import Rubriques from './pages/Rubriques';
import CreateUser from './pages/CreateUser';
import UserTable from './pages/UserTable';
import CreateSociete from './pages/CreateSociete';

import ListeSite from './pages/components/SiteList/SiteList';

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
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/createsociete" element={<CreateSociete />} />
          
          <Route path="/listesite" element={<ListeSite />} />


        </Routes>
      </main>
    </Router>
  );
}

export default App;
