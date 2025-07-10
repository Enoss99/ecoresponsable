import { AppDataSource } from "../data-source";
import { Societe } from "../entity/Societe";
import { Utilisateur } from "../entity/Utilisateur";
import bcrypt from "bcrypt";

export interface UtilisateurCreateData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  isadmin?: boolean;
  isactive?: boolean;
  societeId: number;
}

export class UtilisateurService {
  static repo = AppDataSource.getRepository(Utilisateur);

  static async create(data: UtilisateurCreateData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const laSociete: Societe | null = await AppDataSource.getRepository(
      Societe
    ).findOneBy({
      id: data.societeId,
    });

    if (!laSociete) {
      throw new Error("Société non trouvée");
    }
    const user = this.repo.create({
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
      password: hashedPassword,
      isadmin: data.isadmin ?? false,
      isactive: data.isactive ?? true,
      societe: laSociete,
    });
    return await this.repo.save(user);
  }

  static async getAll() {
    // ne pas renvoyer les mots mais créer des objets DTO
    return await this.repo.find();
  }

  static async getById(id: number) {
    // ne pas renvoyer les mots mais créer des objets DTO
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

  static async signIn(email: string, password: string) {
    const user = await this.repo.findOneBy({ email });
    console.log("Utilisateur trouvé :", user);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Mot de passe valide :", isPasswordValid);
    if (!isPasswordValid) return null;

    // modifier en DTO
    return user;
  }
}
