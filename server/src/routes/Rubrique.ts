import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RubriqueService } from '../services/RubriqueService';
import { QuestionService } from '../services/QuestionService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const data = await RubriqueService.getAll();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post(
  '/',
  [body('titre').notEmpty().withMessage('Le titre est requis')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) 
        res.status(400).json({ error: errors.array()[0].msg });
    try {
      const rubrique = await RubriqueService.create(req.body);
      res.status(201).json(rubrique);
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

// GET /api/rubrique/:id/question — récupère les questions d'une rubrique
router.get('/:id/question', async (req, res) => {
  const rubriqueId = parseInt(req.params.id);

  if (isNaN(rubriqueId)) {
    res.status(400).json({ error: 'ID invalide' });
  }

  try {
    const questions = await QuestionService.getByRubriqueId(rubriqueId);
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
