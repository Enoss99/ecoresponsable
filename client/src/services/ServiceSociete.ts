import { getApi, postApi } from './APIService';

export type NewSociete = {
  nom: string;
};

export const createSociete = async (societe: NewSociete) => {
  return await postApi('/societe', societe);
};

export const getSocietes = async () => {
  return await getApi('/societe');
};


