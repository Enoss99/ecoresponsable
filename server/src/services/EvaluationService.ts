// src/services/EvaluationService.ts
import { AppDataSource } from '../data-source';
import { Evaluation } from '../entity/Evaluation';
import { Produit } from '../entity/Produit';
import { Question } from '../entity/Question';
import { EvaluationQuestionReponse } from '../entity/EvaluationQuestionReponse';
import { Rubrique } from '../entity/Rubrique';

enum EtatEvaluation {
  Terminee = "terminee",
  EnCours = "en_cours",
}

export class EvaluationService {
  static repo = AppDataSource.getRepository(Evaluation);
  static produitRepo = AppDataSource.getRepository(Produit);
  static questionRepo = AppDataSource.getRepository(Question);
  static rubriqueRepo = AppDataSource.getRepository(Rubrique);
  static eqrRepo = AppDataSource.getRepository(EvaluationQuestionReponse);

  static async create(data: { produit: number; rubrique: number }) {
    const produit = await this.produitRepo.findOneByOrFail({ id: data.produit });
    const rubrique = await this.rubriqueRepo.findOneByOrFail({ id: data.rubrique });

    // crée l'évaluation "en cours"
    const evaluation = this.repo.create({ produit, etat: 'en_cours' as any });
    const savedEval = await this.repo.save(evaluation);

    // ne charge que les questions de la rubrique choisie
    const questions = await this.questionRepo.find({
      where: { rubrique: { id: rubrique.id } },
      relations: ['rubrique'],
    });

    // copier les choix au moment T, initialiser reponse/valeur
    const eqrs = questions.map(q =>
      this.eqrRepo.create({
        evaluation: savedEval,
        question: q,
        rubrique: q.rubrique,
        choixreponse: q.choixreponse, // copie figée
        reponse: -1,                  // non répondu
        valeur: 0,
      })
    );

    await this.eqrRepo.save(eqrs);
    return savedEval;
  }

  static async getById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ['produit'],
    });
  }

  static async getEvaluationReponses(evaluationId: number) {
    return await this.eqrRepo.find({
      where: { evaluation: { id: evaluationId } },
      relations: ['question', 'rubrique'],
    });
  }

  static async saveReponse(eqrId: number, reponseIndex: number) {
    const eqr = await this.eqrRepo.findOneByOrFail({ id: eqrId });

    const selected = eqr.choixreponse[reponseIndex];
    eqr.reponse = reponseIndex;
    eqr.valeur = selected?.valeur ?? 0;

    return await this.eqrRepo.save(eqr);
  }

  static async terminateEvaluation(evaluationId: number) {
    await this.repo.update(evaluationId, { etat: EtatEvaluation.Terminee });
    return await this.getById(evaluationId);
  }

    // Méthode pour calculer le score d'une évaluation
  static gradeFromAverage(avgOn4: number) {
    return avgOn4 >= 3.5 ? 'A' :
          avgOn4 >= 2.5 ? 'B' :
          avgOn4 >= 1.5 ? 'C' :
          avgOn4 >= 0.5 ? 'D' : 'E';
  }

  static async computeScore(evaluationId: number) {
    const eqrs = await this.eqrRepo.find({
      where: { evaluation: { id: evaluationId } },
      relations: ['rubrique'],
    });

    const questionsCount = eqrs.length;
    const total = eqrs.reduce((sum, r) => sum + (r.valeur ?? 0), 0);

    const avgOn4 = questionsCount > 0 ? total / questionsCount : 0;

    const grade = this.gradeFromAverage(avgOn4);

    const max = questionsCount * 4;
    const percent = max > 0 ? Math.round((total / max) * 100) : 0;

    // Breakdown par rubrique
    const breakdownMap = new Map<number, { rubriqueId: number; total: number; avgOn4: number; grade: string }>();

    for (const r of eqrs) {
      const rid = r.rubrique?.id ?? 0;
      if (!breakdownMap.has(rid)) {
        breakdownMap.set(rid, { rubriqueId: rid, total: 0, avgOn4: 0, grade: 'E' });
      }
      const b = breakdownMap.get(rid)!;
      b.total += (r.valeur ?? 0);
    }

    // Calcul moyenne et grade pour chaque rubrique
    for (const b of breakdownMap.values()) {
      const rubriqueQuestions = eqrs.filter(r => (r.rubrique?.id ?? 0) === b.rubriqueId).length;
      b.avgOn4 = rubriqueQuestions > 0 ? b.total / rubriqueQuestions : 0;
      b.grade = this.gradeFromAverage(b.avgOn4);
    }

    return {
      questionsCount,
      total,
      max,
      avgOn4: Number(avgOn4.toFixed(2)),
      grade,
      percent,
      breakdown: Array.from(breakdownMap.values()),
    };
  }

  static async finishEvaluation(evaluationId: number) {
    const score = await this.computeScore(evaluationId);
    await this.repo.update(evaluationId, { etat: 'terminee' as any });
    const evaluation = await this.getById(evaluationId);
    return { evaluation, score };
  }

  static async getLastFinishedByProduit(produitId: number) {
    return await this.repo.findOne({
      where: { produit: { id: produitId }, etat: 'terminee' as any },
      order: { id: 'DESC' },
      relations: ['produit'],
    });
  }

}
