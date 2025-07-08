import { AppDataSource } from '../data-source';
import { Site } from '../entity/Site';

export class SiteService {
  static repo = AppDataSource.getRepository(Site);

  static async create(data: Partial<Site>) {
    const site = this.repo.create(data);
    return await this.repo.save(site);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['societe'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['societe'] });
  }

  static async update(id: number, data: Partial<Site>) {
    await this.repo.update(id, data);
    return await this.getById(id);
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
