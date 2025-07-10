import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { SocieteService } from "../services/SocieteService";
import { validateRequest } from "../middlewares/validate-request";
import { authenticateToken } from "../middlewares/authenticate-token";

const router = Router();

router.get("/", authenticateToken, async (_req, res) => {
  try {
    const societes = await SocieteService.getAll();
    res.json(societes);
    console.log(societes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  const societe = await SocieteService.getById(+req.params.id);
  if (!societe) res.status(404).json({ error: "Non trouvé" });
  try {
    res.json(societe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post(
  "/",
  [body("nom").notEmpty().withMessage("Le nom est requis")],
  validateRequest,
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const societe = await SocieteService.create(req.body);
      res.status(201).json(societe);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

export default router;
