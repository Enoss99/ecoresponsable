import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { QuestionService } from '../services/QuestionService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const questions = await QuestionService.getAll();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post(
  '/',
  [
    body('texte').notEmpty().withMessage('Texte requis'),
    body('rubrique').isInt().withMessage('ID rubrique requis'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        res.status(400).json({ error: errors.array()[0].msg });

    try {
      const question = await QuestionService.create(req.body);
      res.status(201).json(question);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Erreur serveur' });
    }
  }
);

export default router;
