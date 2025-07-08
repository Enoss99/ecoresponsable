import { postApi, getApi } from './APIService';

export async function createProduit(data: { nom: string; siteId: number }) {
  return await postApi('/produit', data);
}

export async function getProduits() {
  return await getApi('/produit');
}
