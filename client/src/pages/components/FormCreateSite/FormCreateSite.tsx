import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSocietes } from '../../../services/ServiceSociete';
import { createSite } from '../../../services/ServiceSite';
import './CreateSite.css';

type FormData = {
  nom: string;
  societeId: number;
};

export default function CreateSite() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [societes, setSocietes] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getSocietes().then(setSocietes).catch((err) => setError(err.message));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      await createSite(data);
      alert('Site créé avec succès !');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-site-form">
      <h2>Créer un site</h2>

      <div>
        <label>Nom du site</label>
        <input {...register('nom', { required: 'Le nom est requis' })} />
        {errors.nom && <p className="error">{errors.nom.message}</p>}
      </div>

      <div>
        <label>Société</label>
        <select {...register('societeId', { required: 'Sélectionnez une société' })}>
          <option value="">-- Choisir une société --</option>
          {societes.map((s) => (
            <option key={s.id} value={s.id}>{s.nom}</option>
          ))}
        </select>
        {errors.societeId && <p className="error">{errors.societeId.message}</p>}
      </div>

      <button type="submit">Créer le site</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
