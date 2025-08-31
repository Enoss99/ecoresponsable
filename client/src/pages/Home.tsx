import React from 'react';
import Hero from './components/Presentation/Presentation';
import KeyMembers from './components/KeyMember/KeyMember';
import AppPurpose from './components/AppPurpose/AppPurpose';


export default function Home() {
  return (
    <div className="home-page">

      <Hero />
      <KeyMembers />
      <AppPurpose />

    </div>
  );
}

