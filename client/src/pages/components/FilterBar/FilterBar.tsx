import React, { useEffect, useState } from 'react';
import './FilterBar.css';
import { getSites } from '../../../services/ServiceSite';
import { getProduits } from '../../../services/ServiceProduit';

type Site = {
  id: number;
  nom: string;
};

type Produit = {
  id: number;
  nom: string;
  site: Site;
};

type Props = {
  site: string;
  setSite: (val: string) => void;
  produit: string;
  setProduit: (val: string) => void;
  typeProduit: string;
  setTypeProduit: (val: string) => void;
};

export default function FilterBar({
  site,
  setSite,
  produit,
  setProduit,
  typeProduit,
  setTypeProduit
}: Props) {
  const [sites, setSites] = useState<Site[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    getSites()
      .then(data => Array.isArray(data) ? setSites(data) : setSites([]))
      .catch(err => {
        console.error('Erreur chargement sites:', err);
        setSites([]);
      });

    getProduits()
      .then(data => Array.isArray(data) ? setProduits(data) : setProduits([]))
      .catch(err => {
        console.error('Erreur chargement produits:', err);
        setProduits([]);
      });
  }, []);

  return (
    <div className="comparateur-filtres">
      <select value={site} onChange={e => setSite(e.target.value)}>
        <option value="">-- Choisir un site --</option>
        {sites.map(s => (
          <option key={s.id} value={s.id}>
            {s.nom}
          </option>
        ))}
      </select>

      <select value={produit} onChange={e => setProduit(e.target.value)}>
        <option value="">-- Choisir un produit --</option>
        {produits
          .filter(p => site === '' || String(p.site.id) === site)
          .map(p => (
            <option key={p.id} value={p.id}>
              {p.nom}
            </option>
          ))}
      </select>

      <select value={typeProduit} onChange={e => setTypeProduit(e.target.value)}>
        <option value="">-- Choisir un type produit --</option>
        <option value="1">Type 1</option>
        <option value="2">Type 2</option>
      </select>
    </div>
  );
}
