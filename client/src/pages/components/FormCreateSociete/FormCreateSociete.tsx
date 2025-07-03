import React from 'react';
import { useForm } from 'react-hook-form';
import { createSociete } from '../../../services/ServiceSociete';
import './FormCreateSociete.css';
import { useNavigate } from 'react-router-dom';

type FormData = {
  nom: string;
};

export default function FormCreateSociete() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await createSociete(data);
      alert("Société créée avec succès !");
    } catch (err: any) {
      alert(err.message || "Erreur lors de la création");
    }
  };

  return (
    <div className="societe-form-container">
      <h2>Créer une société</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="societe-form-box">
        <div className="form-group">
          <label>Nom de la société</label>
          <input {...register('nom', { required: 'Nom requis' })} />
          {errors.nom && <p className="error">{errors.nom.message}</p>}
        </div>
        <button type="submit" className="submit-btn">Créer</button>
      </form>
    </div>
  );
}
