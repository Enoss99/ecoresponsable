import { AppDataSource } from '../data-source';
import { Evaluation } from '../entity/Evaluation';
import { Produit } from '../entity/Produit';

export class EvaluationService {
  static repo = AppDataSource.getRepository(Evaluation);
  static produitRepo = AppDataSource.getRepository(Produit);

  static async create(data: { produit: number }) {
    const produit = await this.produitRepo.findOneBy({ id: data.produit });
    if (!produit) throw new Error('Produit non trouvé');

    const evaluation = this.repo.create({ produit });
    return await this.repo.save(evaluation);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['produit', 'reponses'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['produit', 'reponses'] });
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
