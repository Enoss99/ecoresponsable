import { getApi, postApi } from "./APIService";
import { clearToken, getTokenData, saveToken } from "./TokenService";

export type NewUser = {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  societe: string;
  isadmin: boolean;
};

export const createUser = async (user: NewUser) => {
  return await postApi("/users", user);
};

export const getUsers = async () => {
  return await getApi("/users");
};

export const disableUser = async (id: number) => {
  return await postApi(`/users/${id}/disable`, {});
};

export const enableUser = async (id: number) => {
  return await postApi(`/users/${id}/enable`, {});
};

export const signout = () => {
  clearToken();
  window.location.href = "/";
};

export const loginUser = async (email: string, password: string) => {
  const data = await postApi("/login", { email, password });
  if (data.error || !data.token) {
    throw new Error(data.error || "Erreur de connexion");
  }

  // le login doit renvoyer le token qui permet de nous authentifier
  // on le sauvegarde
  saveToken(data.token);
};

export const getUserData = () => {
  return getTokenData() || null;
};
