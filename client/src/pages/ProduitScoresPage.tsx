import React, { useEffect, useState } from 'react';
import { getProduitsWithScores } from '../services/ServiceProduit';
import './ProduitScoresPage.css';

type Produit = { id: number; nom: string; site?: { id: number; nom: string } };
type Score = {
  questionsCount: number;
  total: number;
  max: number;
  avgOn4: number;
  grade: 'A'|'B'|'C'|'D'|'E';
  percent: number;
};

type Row = { produit: Produit; score: Score | null };

export default function ProduitScoresPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduitsWithScores()
      .then(setRows)
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement…</p>;

  return (
    <div className="produit-score-page">
      <h2>Produits & Note (dernière évaluation)</h2>
      <table className="score-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Produit</th>
            <th>Site</th>
            <th>Moyenne /4</th>
            <th>Grade</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ produit, score }) => (
            <tr key={produit.id}>
              <td>{produit.id}</td>
              <td>{produit.nom}</td>
              <td>{produit.site?.nom ?? '-'}</td>
              <td>{score ? score.avgOn4.toFixed(2) : '-'}</td>
              <td>
                {score ? <span className={`grade-badge grade-${score.grade}`}>{score.grade}</span> : '-'}
              </td>
              <td>{score ? `${score.percent}%` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
