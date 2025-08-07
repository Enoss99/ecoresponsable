import { postApi, getApi } from './APIService';

const ENDPOINT = '/evaluation';

export async function createEvaluation(produitId: number) {
  return await postApi(ENDPOINT, { produit: produitId });
}

export async function getEvaluations() {
  return await getApi(ENDPOINT);
}
