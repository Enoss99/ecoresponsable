import { AppDataSource } from '../data-source';
import { Societe } from '../entity/Societe';

export class SocieteService {
  static repo = AppDataSource.getRepository(Societe);

  static async create(data: Partial<Societe>) {
    const societe = this.repo.create({
      nom: data.nom,
      utilisateurs: data.utilisateurs ?? [],
      sites: data.sites ?? [],
    });
    return await this.repo.save(societe);
  }

  static async getAll() {
    return await this.repo.find();
  }

  static async getById(id: number) {
    return await this.repo.findOne({
      where: { id },
      relations: ['utilisateurs', 'sites'],
    });
  }

  static async update(id: number, data: Partial<Societe>) {
    await this.repo.update(id, data);
    return await this.getById(id);
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
