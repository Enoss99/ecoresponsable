import React from 'react';
import "../../css/Header.css";

export default function Header() {
  return (
    <header className="mqc-header">
      <div className="mqc-logo"><a href="/">MQC</a></div>
      <nav className="mqc-nav">
        <a href="/rubrique" className="mqc-menu">rubrique</a>
        <a href="#" className="mqc-menu">site</a>
        <a href="#" className="mqc-menu">comparateur</a>
        <a href="#" className="mqc-menu">questions</a>
      </nav>
      <button className="mqc-login-btn">Connexion</button>
    </header>
  );
}
