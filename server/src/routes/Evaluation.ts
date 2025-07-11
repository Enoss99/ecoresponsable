import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { EvaluationService } from '../services/EvaluationService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const evaluations = await EvaluationService.getAll();
    res.json(evaluations);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post(
  '/',
  [body('produit').isInt().withMessage('ID produit invalide')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ error: errors.array()[0].msg });

    try {
      const evaluation = await EvaluationService.create(req.body);
      res.status(201).json(evaluation);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur serveur' });
    }
  }
);

export default router;
