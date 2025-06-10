import React from 'react';

interface Props {
  site: string;
  setSite: (v: string) => void;
  produit: string;
  setProduit: (v: string) => void;
  typeProduit: string;
  setTypeProduit: (v: string) => void;
}

export default function FilterBar({ site, setSite, produit, setProduit, typeProduit, setTypeProduit }: Props) {
  return (
    <div className="comparateur-filtres">
      <select value={site} onChange={e => setSite(e.target.value)}>
        <option>site 1</option>
        <option>site 2</option>
      </select>
      <select value={produit} onChange={e => setProduit(e.target.value)}>
        <option>produit 1</option>
        <option>produit 2</option>
      </select>
      <select value={typeProduit} onChange={e => setTypeProduit(e.target.value)}>
        <option>type produit 1</option>
        <option>type produit 2</option>
      </select>
    </div>
  );
}
