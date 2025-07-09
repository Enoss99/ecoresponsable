import { getApi, postApi } from './APIService';

const ENDPOINT = '/rubrique';

export async function getRubriques() {
  return await getApi(ENDPOINT);
}

export async function createRubrique(data: { titre: string }) {
  return await postApi(ENDPOINT, data);
}
