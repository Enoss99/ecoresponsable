import React from 'react';
import Header from './components/Header';
import Hero from './components/Presentation';
import KeyMembers from './components/KeyMember';
import AppPurpose from './components/AppPurpose';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <KeyMembers />
      <AppPurpose />
      <Footer />
    </div>
  );
}

