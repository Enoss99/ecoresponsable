import { getApi, postApi } from './APIService';

export type NewSite = {
  nom: string;
};

export const createSite = async (data: { nom: string; societeId: number }) => {
  return await postApi('/site', data);
};

export const getSites = async () => {
  return await getApi('/site');
};
