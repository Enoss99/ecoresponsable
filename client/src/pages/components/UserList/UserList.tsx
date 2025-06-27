import React, { useEffect, useState } from 'react';
import './UserList.css'; 
import Button from '../Button/Button';
import { getUsers } from '../../../services/ServiceUtilisateur';

type Utilisateur = {
  id: number;
  nom: string;
  prenom: string;
  isadmin: boolean;
  isactive: boolean;
};

export default function UserList() {
  const [users, setUsers] = useState<Utilisateur[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <h2>Utilisateurs</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prénom</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user.id}
              className={!user.isactive ? 'user-inactive' : ''}
            >
              <td>{user.id}</td>
              <td>
                {user.nom} {user.isadmin && <span title="Admin">👑</span>}
              </td>
              <td>{user.prenom}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button label="Ajouter un utilisateur" to="/createuser" />
    </div>
  );
}
