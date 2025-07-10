import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/Notfound";
import Rubriques from "./pages/Rubriques";
import CreateUser from "./pages/CreateUser";
import UserTable from "./pages/UserTable";
import CreateSociete from "./pages/CreateSociete";
import Login from "./pages/Login/Login";
import withProtection from "./hoc/withProtection";

function App() {
  const [message, setMessage] = useState("");
  /*
  useEffect(() => {
    fetch("http://localhost:4000/api/ping")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);
*/

  /* les routes nécessitant une authentification sont protégées par le HOC withProtection */
  return (
    <Router>
      <main className="main">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/rubrique" element={withProtection(<Rubriques />)} />

          <Route path="/createuser" element={withProtection(<CreateUser />)} />
          <Route path="/usertable" element={withProtection(<UserTable />)} />
          <Route
            path="/createsociete"
            element={withProtection(<CreateSociete />)}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
