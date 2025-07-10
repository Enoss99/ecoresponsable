import React from "react";
import "./Header.css";
import { getUserData, signout } from "../../../services/ServiceUtilisateur";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const userData = getUserData();
  const navigate = useNavigate();
  return (
    <header className="mqc-header">
      <div className="mqc-logo">
        <a href="/">MQC</a>
      </div>
      <nav className="mqc-nav">
        <a href="/rubrique" className="mqc-menu">
          rubrique
        </a>
        <a href="#" className="mqc-menu">
          site
        </a>
        <a href="#" className="mqc-menu">
          comparateur
        </a>
        <a href="#" className="mqc-menu">
          questions
        </a>
      </nav>
      {userData ? (
        <div className="mqc-user-info">
          <span className="mqc-user-name">
            {userData.prenom} {userData.nom}
          </span>
          <button className="mqc-disconnect-btn" onClick={() => signout()}>
            Se déconnecter
          </button>
        </div>
      ) : (
        <button className="mqc-login-btn" onClick={() => navigate("/login")}>
          Connexion
        </button>
      )}
    </header>
  );
}
