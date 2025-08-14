import { postApi, getApi } from './APIService';

const ENDPOINT = '/evaluation';

export async function createEvaluation(produitId: number) {
  return await postApi(ENDPOINT, { produit: produitId });
}

export async function getEvaluations() {
  return await getApi(ENDPOINT);
}

export type ChoixReponse = { texte: string; valeur: number };

export type EQR = {
  id: number;
  reponse: number | null;                // index choisi (ou -1 / null si non répondu)
  choixreponse: ChoixReponse[];          // copie des choix au moment de l'éval
  question: { id: number; texte: string };
  rubrique?: { id: number; titre: string };
};

export type FinishScore = {
  questionsCount: number;
  total: number;
  max: number;
  avgOn4: number;
  grade: 'A'|'B'|'C'|'D'|'E';
  percent: number;
  breakdown: { rubriqueId: number; total: number; avgOn4: number; grade: 'A'|'B'|'C'|'D'|'E' }[];
};

export async function getEvaluationReponses(evaluationId: number): Promise<EQR[]> {
  return await getApi(`${ENDPOINT}/${evaluationId}/reponses`);
}

export async function updateReponse(eqrId: number, reponseIndex: number) {
  return await postApi(`${ENDPOINT}/reponse/${eqrId}`, { reponse: reponseIndex });
}

export async function finishEvaluation(evaluationId: number): Promise<{ evaluation: any; score: FinishScore }> {
  return await postApi(`${ENDPOINT}/${evaluationId}/finish`, {});
}