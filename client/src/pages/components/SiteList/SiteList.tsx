import React, { useEffect, useState } from 'react';
import { getSites } from '../../../services/ServiceSite';

type Site = {
  id: number;
  nom: string;
  societe: { nom: string };
};

export default function SiteList() {
  const [sites, setSites] = useState<Site[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSites()
      .then(setSites)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="site-list-container">
      <h2>Liste des Sites</h2>
      {error && <p className="error">{error}</p>}
      <table className="site-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Société</th>
          </tr>
        </thead>
        <tbody>
          {sites.map(site => (
            <tr key={site.id}>
              <td>{site.id}</td>
              <td>{site.nom}</td>
              <td>{site.societe.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
