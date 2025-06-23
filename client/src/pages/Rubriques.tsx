import React, { useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import Carrousel from './components/Carrousel';
import Pagination from './components/Pagination';

const themes = [
  { theme: 'Eau', note: 'A', image: '', selected: false },
  { theme: 'Énergie', note: 'B', image: '', selected: false },
  { theme: 'Déchets', note: 'C', image: '', selected: true },
  { theme: 'Carbone', note: 'B', image: '', selected: false },
  { theme: 'Biodiversité', note: 'A', image: '', selected: false },
];

export default function Rubriques() {
  const [site, setSite] = useState('site 1');
  const [produit, setProduit] = useState('produit 1');
  const [typeProduit, setTypeProduit] = useState('type produit 1');
  const [currentIndex, setCurrentIndex] = useState(2);

  return (
    <div className="comparateur-root">
      <Header />

      <FilterBar
        site={site}
        setSite={setSite}
        produit={produit}
        setProduit={setProduit}
        typeProduit={typeProduit}
        setTypeProduit={setTypeProduit}
      />

      <Carrousel
        themes={themes}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <Pagination
        count={themes.length}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}
