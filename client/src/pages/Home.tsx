import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Presentation/Presentation';
import KeyMembers from './components/KeyMember/KeyMember';
import AppPurpose from './components/AppPurpose/AppPurpose';
import Footer from './components/Footer/Footer';

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

