import React, { useEffect, useState } from 'react';
import Carrousel from './components/Carrousel/Carrousel';
import FilterBar from './components/FilterBar/FilterBar';
import Header from './components/Header/Header';
import { useNavigate } from 'react-router-dom';
import './Rubriques.css';

type Rubrique = {
  id: number;
  titre: string;
};

export default function Rubriques() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [site, setSite] = useState('');
  const [produit, setProduit] = useState('');
  const [typeProduit, setTypeProduit] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/rubrique')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRubriques(data);
        } else {
          console.error("Réponse inattendue :", data);
          setRubriques([]);
        }
      })
      .catch(err => console.error('Erreur chargement rubriques', err));
  }, []);

  const handleRubriqueClick = async (rubriqueId: number) => {
    if (!produit) return alert('Veuillez choisir un produit avant de continuer');

    try {
      const res = await fetch('http://localhost:4000/api/evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produit: Number(produit), rubrique: rubriqueId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      navigate(`/questionnaire/${data.id}`); // redirige vers la page d'évaluation
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className='comparateur-root'>
      <Header />
      <FilterBar
        site={site}
        setSite={setSite}
        produit={produit}
        setProduit={setProduit}
        typeProduit={typeProduit}
        setTypeProduit={setTypeProduit}
      />

      <Carrousel rubriques={rubriques} onRubriqueClick={handleRubriqueClick} />
    </div>
  );
}
