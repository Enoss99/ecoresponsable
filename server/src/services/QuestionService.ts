import { AppDataSource } from '../data-source';
import { Question } from '../entity/Question';
import { Rubrique } from '../entity/Rubrique';

export class QuestionService {
  static repo = AppDataSource.getRepository(Question);
  static rubriqueRepo = AppDataSource.getRepository(Rubrique);

  static async create(data: {
    texte: string;
    rubrique: number;
    //choixReponse?: { id: number; texte: string; valeur: number }[];
  }) {
    const rubrique = await this.rubriqueRepo.findOneBy({ id: data.rubrique });
    if (!rubrique) throw new Error('Rubrique non trouvée');

    const question = this.repo.create({
      texte: data.texte,
      rubrique,
      //choixReponse: data.choixReponse ?? [],
    });

    return await this.repo.save(question);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['rubrique'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['rubrique'] });
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
