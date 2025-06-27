import React from 'react';
import { useForm } from 'react-hook-form';
import './FormCreateUser.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../../services/ServiceUtilisateur';

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
  const navigate = useNavigate();

const onSubmit = async (data: FormData) => {
  try {
    await createUser(data);
    alert('Utilisateur créé !');
    navigate('/usertable');
  } catch (error: any) {
    alert(error.message);
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
      <Button type="submit" label="Créer"/>
    </form>
    </div>
  );
}
