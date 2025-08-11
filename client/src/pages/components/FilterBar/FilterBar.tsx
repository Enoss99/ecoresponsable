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
  setTypeProduit,
}: Props) {
  const [sites, setSites] = useState<Site[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);

  useEffect(() => {
    getSites().then(data => {
      setSites(data);
      console.log('Sites récupérés :', data);
    });
    getProduits().then(data => {
      setProduits(data);
      console.log('Produits récupérés :', data);
    });
  }, []);

  const produitsFiltrés = produits.filter(
    p => String(p.site.id) === site
  );

  return (
    <div className="comparateur-filtres">
      <select value={site} onChange={e => setSite(e.target.value)}>
        <option value="">-- Choisir un site --</option>
        {sites.map(s => (
          <option key={s.id} value={s.id}>{s.nom}</option>
        ))}
      </select>

      <select value={produit} onChange={e => setProduit(e.target.value)} disabled={!site}>
        <option value="">-- Choisir un produit --</option>
        {produitsFiltrés.map(p => (
          <option key={p.id} value={p.id}>{p.nom}</option>
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
