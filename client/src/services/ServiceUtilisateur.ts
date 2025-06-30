import { BASE_API_URL } from './Restconfig';

const API_URL = '${BASE_API_URL}/users';

export type NewUser = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  societe: string;
  isadmin: boolean;
};

export async function createUser(user: NewUser) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Erreur API');
  }

  return await res.json();
}

export async function getUsers() {
  const res = await fetch(API_URL);

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Erreur lors de la récupération des utilisateurs');
  }

  return data;
}

export async function disableUser(id: number) {
  const res = await fetch(`${API_URL}/${id}/disable`, {
    method: 'POST',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur lors de la désactivation');
  return data;
}

export async function enableUser(id: number) {
  const res = await fetch(`${API_URL}/${id}/enable`, {
    method: 'POST',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur lors de l’activation');
  return data;
}