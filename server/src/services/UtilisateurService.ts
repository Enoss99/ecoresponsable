import { AppDataSource } from '../data-source';
import { Utilisateur } from '../entity/Utilisateur';

export class UtilisateurService {
  static repo = AppDataSource.getRepository(Utilisateur);

  static async create(data: Partial<Utilisateur>) {
    const user = this.repo.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: data.password,
      isadmin: data.isadmin ?? false,
      isactive: data.isactive ?? true,
      societe: data.societe,
    });
    return await this.repo.save(user);
  }

  static async getAll() {
    return await this.repo.find();
  }

  static async getById(id: number) {
    return await this.repo.findOneBy({ id });
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