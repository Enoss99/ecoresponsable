import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { body } from "express-validator";
import { UtilisateurService } from "../services/UtilisateurService";
import { AuthenticationService } from "../services/AuthenticationService";

const loginRouter = Router();

// Clé secrète à garder dans une variable d'environnement en prod
const JWT_SECRET = process.env.JWT_SECRET || "votre_clé_secrète";

loginRouter.post(
  "/api/login",
  body("email").isEmail().withMessage("L'email doit être valide").toLowerCase(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Vous devez entrer un mot de passe"),
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UtilisateurService.signIn(email, password);
    if (!user) {
      res.status(401).json({ message: "Informations non valides" });
      return;
    }

    const token = AuthenticationService.generateToken(user);

    res.json({ token });
  }
);

export default loginRouter;
