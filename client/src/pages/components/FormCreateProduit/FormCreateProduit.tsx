import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSites } from '../../../services/ServiceSite';
import { createProduit } from '../../../services/ServiceProduit';
import './CreateProduit.css';

type FormData = {
  nom: string;
  siteId: number;
};

export default function CreateProduit() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [sites, setSites] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getSites().then(setSites).catch((err) => setError(err.message));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await createProduit(data);
      alert('Produit créé !');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-produit-form">
      <h2>Créer un produit</h2>

      <div>
        <label>Nom du produit</label>
        <input {...register('nom', { required: 'Nom requis' })} />
        {errors.nom && <p className="error">{errors.nom.message}</p>}
      </div>

      <div>
        <label>Site associé</label>
        <select {...register('siteId', { required: 'Sélectionnez un site' })}>
          <option value="">-- Choisir un site --</option>
          {sites.map((s) => (
            <option key={s.id} value={s.id}>{s.nom}</option>
          ))}
        </select>
        {errors.siteId && <p className="error">{errors.siteId.message}</p>}
      </div>

      <button type="submit">Créer</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
