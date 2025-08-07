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

  static async create(data: { produit: number }) {
    const produit = await this.produitRepo.findOneByOrFail({ id: data.produit });

    const evaluation = this.repo.create({
      produit,
      etat: EtatEvaluation.EnCours,
    });
    const savedEvaluation = await this.repo.save(evaluation);

    const questions = await this.questionRepo.find({ relations: ['rubrique'] });

    const eqrList = questions.map(q =>
      this.eqrRepo.create({
        question: q,
        rubrique: q.rubrique,
        choixreponse: q.choixreponse,
        reponse: -1,
        valeur: 0,
        evaluation: savedEvaluation,
      })
    );

    await this.eqrRepo.save(eqrList);
    return savedEvaluation;
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
}
