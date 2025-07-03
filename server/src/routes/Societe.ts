import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { SocieteService } from '../services/SocieteService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const societes = await SocieteService.getAll();
    res.json(societes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get('/:id', async (req, res) => {
  const societe = await SocieteService.getById(+req.params.id);
  if (!societe) res.status(404).json({ error: 'Non trouvé' });
  try {res.json(societe);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post(
  '/',
  [body('nom').notEmpty().withMessage('Le nom est requis')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ error: errors.array()[0].msg });
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
