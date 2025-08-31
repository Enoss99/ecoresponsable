import { AppDataSource } from '../data-source';
import { Utilisateur } from '../entity/Utilisateur';
import { Societe } from '../entity/Societe';

export class UtilisateurService {
  static repo = AppDataSource.getRepository(Utilisateur);
  static societeRepo = AppDataSource.getRepository(Societe);

  static async create(data: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    isadmin?: boolean;
    isactive?: boolean;
    societeId: number;
  }) {
    const societe = await this.societeRepo.findOneByOrFail({ id: Number(data.societeId) });

    const user = this.repo.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password,
      isadmin: data.isadmin ?? false,
      isactive: data.isactive ?? true,
      societe,
    });
    return await this.repo.save(user);
  }

  static async getAll() {
    return await this.repo.find({ relations: ['societe'] });
  }

  static async getById(id: number) {
    return await this.repo.findOne({ where: { id }, relations: ['societe'] });
  }

  static async update(id: number, data: Partial<Utilisateur>) {
    await this.repo.update(id, data);
    return await this.getById(id);
  }

  static async disable(id: number) {
    await this.repo.update(id, { isactive: false });
    return await this.getById(id);
  }

  static async enable(id: number) {
    await this.repo.update(id, { isactive: true });
    return await this.getById(id);
  }

  static async delete(id: number) {
    await this.repo.delete(id);
    return true;
  }
}
