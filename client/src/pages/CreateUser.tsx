import React from 'react';
import { useForm } from 'react-hook-form';

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  isadmin: boolean;
  societe: string;
};

export default function CreateUser() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch('http://localhost:4000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.error || 'Erreur lors de la création');
    } else {
      alert('Utilisateur créé !');
    }
  };

  return (
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
        <input {...register('email', {
          required: 'Email requis',
          pattern: { value: /^\S+@\S+$/i, message: 'Email invalide' }
        })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" {...register('password', { required: 'Mot de passe requis' })} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label>
          <input type="checkbox" {...register('isadmin')} />
          Administrateur
        </label>
      </div>
      <div>
        <label>Nom de la société</label>
        <input {...register('societe', { required: 'Nom de société requis' })} />
        {errors.societe && <p>{errors.societe.message}</p>}
      </div>
      <button type="submit">Créer</button>
    </form>
  );
}
