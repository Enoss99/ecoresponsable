import { Router, Request, Response } from 'express';
import { SiteService } from '../services/SiteService';
import { SocieteService } from '../services/SocieteService';
import { body, validationResult } from 'express-validator';

const router = Router();

// GET /api/site - Récupère tous les sites
router.get('/', async (_req: Request, res: Response) => {
  try {
    const sites = await SiteService.getAll();
    res.json(sites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// GET /api/site/:id - Récupère un site par ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const site = await SiteService.getById(parseInt(req.params.id));
    if (!site) res.status(404).json({ error: "Site non trouvé" });
    res.json(site);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /api/site - Crée un nouveau site
router.post(
  '/',
  [
    body('nom').notEmpty().withMessage('Le nom du site est requis'),
    body('societeId').isNumeric().withMessage('ID société invalide'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array()[0].msg });
      return;
    }

    try {
    const societe = await SocieteService.getById(req.body.societeId);
      if (!societe) {
        res.status(400).json({ error: "Société non trouvée" });
        return;
      }
      const site = await SiteService.create({
        nom: req.body.nom,
        societe: societe
      });
      res.status(201).json(site);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
);

// DELETE /api/site/:id - Supprime un site
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await SiteService.delete(parseInt(req.params.id));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
