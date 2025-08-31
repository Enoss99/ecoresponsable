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
import EvaluationQuestionnairePage from './pages/EvaluationQuestionnairePage';
import ProduitScoresPage from './pages/ProduitScoresPage';
import CreateSite from './pages/components/FormCreateSite/FormCreateSite';
import CreateProduit from './pages/components/FormCreateProduit/FormCreateProduit';
import Layout from './pages/components/Layout/Layout';

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
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rubrique" element={<Rubriques />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/usertable" element={<UserTable />} />
          <Route path="/createsociete" element={<CreateSociete />} />
          <Route path="/createsite" element={<CreateSite />} />
          <Route path="/createproduit" element={<CreateProduit />} />
          <Route path="/listesite" element={<ListeSite />} />
          <Route path="/questionnaire/:evaluationId" element={<EvaluationQuestionnairePage />} />
          <Route path="/produits/scores" element={<ProduitScoresPage />} />



        </Routes>
        </Layout>
      </main>
    </Router>
  );
}

export default App;
