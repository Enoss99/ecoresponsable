import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './FormCreateUser.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/ServiceUtilisateur';
import { getSocietes } from '../../../services/ServiceSociete';

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  isadmin: boolean;
  societeId: number; // <-- ID au lieu d'un string
};

export default function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [societes, setSocietes] = useState<{ id: number; nom: string }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSocietes()
      .then(data => Array.isArray(data) ? setSocietes(data) : setSocietes([]))
      .catch(() => setSocietes([]));
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      // cast car les <option> renvoient des strings
      const payload = { ...data, societeId: Number(data.societeId) };
      await createUser(payload as any);
      alert('Utilisateur créé !');
      navigate('/usertable');
    } catch (error: any) {
      alert(error.message || 'Erreur lors de la création');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
        <div>
          <label>Nom</label>
          <input {...register('nom', { required: 'Nom requis' })} />
          {errors.nom && <p>{errors.nom.message}</p>}
        </div>

        <div>
          <label>Prénom</label>
          <input {...register('prenom', { required: 'Prénom requis' })} />
          {errors.prenom && <p>{errors.prenom.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <input
            {...register('email', {
              required: 'Email requis',
              pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" {...register('password', { required: 'Mot de passe requis', minLength: { value: 6, message: '6 caractères min.' } })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>
            <input type="checkbox" {...register('isadmin')} />
            Administrateur
          </label>
        </div>

        <div>
          <label>Société</label>
          <select
            {...register('societeId', { required: 'Société requise', valueAsNumber: true })}
            defaultValue=""
          >
            <option value="" disabled>-- Choisir une société --</option>
            {societes.map(s => (
              <option key={s.id} value={s.id}>{s.nom}</option>
            ))}
          </select>
          {errors.societeId && <p>{String(errors.societeId.message)}</p>}
        </div>

        <Button type="submit" label="Créer" />
      </form>
    </div>
  );
}
