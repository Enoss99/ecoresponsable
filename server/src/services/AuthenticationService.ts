import { Utilisateur } from "../entity/Utilisateur";
import jwt from "jsonwebtoken";

export class AuthenticationService {
  public static readonly STORAGE_TOKEN_KEY = "token";
  private static JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète";

  static generateToken(utilisateur: Utilisateur): string {
    return jwt.sign(
      {
        email: utilisateur.email,
        isAdmin: utilisateur.isadmin,
        prenom: utilisateur.prenom,
        nom: utilisateur.nom,
      },
      this.JWT_SECRET,
      {
        expiresIn: "10h",
      }
    );
  }
}
