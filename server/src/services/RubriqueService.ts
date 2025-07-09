import { AppDataSource } from '../data-source';
import { Rubrique } from '../entity/Rubrique';

export class RubriqueService {
  static repo = AppDataSource.getRepository(Rubrique);

  static async create(data: Partial<Rubrique>) {
    const rubrique = this.repo.create({ titre: data.titre });
    return await this.repo.save(rubrique);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['questions'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['questions'] });
  }

  static async update(id: number, data: Partial<Rubrique>) {
    await this.repo.update(id, data);
    return await this.getById(id);
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
