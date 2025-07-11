import { postApi, getApi } from './APIService';

const ENDPOINT = '/question';

export async function createQuestion(data: {
  texte: string;
  rubrique: number;
  choixReponse?: { id: number; texte: string; valeur: number }[];
}) {
  return await postApi(ENDPOINT, data);
}

export async function getQuestions() {
  return await getApi(ENDPOINT);
}
