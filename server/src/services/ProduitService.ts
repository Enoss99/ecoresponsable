import { AppDataSource } from '../data-source';
import { Produit } from '../entity/Produit';
import { Site } from '../entity/Site';

export class ProduitService {
  static repo = AppDataSource.getRepository(Produit);
  static siteRepo = AppDataSource.getRepository(Site);

  static async create(data: { nom: string; siteId: number }) {
    const site = await this.siteRepo.findOneByOrFail({ id: data.siteId });

    const produit = this.repo.create({
      nom: data.nom,
      site: site,
    });

    return await this.repo.save(produit);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['site'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['site'] });
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
