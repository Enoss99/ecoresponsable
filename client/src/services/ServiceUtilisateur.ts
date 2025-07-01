import { getApi, postApi } from './APIService';

export type NewUser = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  societe: string;
  isadmin: boolean;
};

export const createUser = async (user: NewUser) => {
  return await postApi('/users', user);
};

export const getUsers = async () => {
  return await getApi('/users');
};

export const disableUser = async (id: number) => {
  return await postApi(`/users/${id}/disable`, {});
};

export const enableUser = async (id: number) => {
  return await postApi(`/users/${id}/enable`, {});
};
