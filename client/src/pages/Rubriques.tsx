import React, { useEffect, useState } from 'react';
import Carrousel from './components/Carrousel/Carrousel';
import FilterBar from './components/FilterBar/FilterBar';
import CarrouselPagination from './components/CarrouselPagination/CarrouselPagination'
import { useNavigate } from 'react-router-dom';
import './Rubriques.css';


type Rubrique = { id: number; titre: string };

export default function Rubriques() {
  const [rubriques, setRubriques] = useState<Rubrique[]>([]);
  const [site, setSite] = useState('');
  const [produit, setProduit] = useState('');
  const [typeProduit, setTypeProduit] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/rubrique')
      .then(res => res.json())
      .then(setRubriques)
      .catch(console.error);
  }, []);

  const handleRubriqueClick = async (rubriqueId: number) => {
    if (!produit) return alert('Veuillez sélectionner un produit');

    try {
      const res = await fetch('http://localhost:4000/api/evaluation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produit: Number(produit), rubrique: rubriqueId }), // ⬅️ important
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur création évaluation');

      navigate(`/questionnaire/${data.id}`); // le questionnaire chargera uniquement cette rubrique
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <FilterBar
        site={site} setSite={setSite}
        produit={produit} setProduit={setProduit}
        typeProduit={typeProduit} setTypeProduit={setTypeProduit}
      />

      <Carrousel
        rubriques={rubriques}
        onRubriqueClick={handleRubriqueClick}
      />
    </div>
  );
}
