// src/routes/Evaluation.ts
import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { EvaluationService } from '../services/EvaluationService';

const router = Router();

// Créer une évaluation
router.post(
  '/',
  [
    body('produit').isNumeric().withMessage('produit requis'),
    body('rubrique').isNumeric().withMessage('rubrique requise'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) res.status(400).json({ error: errors.array()[0].msg });

    try {
      const evaluation = await EvaluationService.create({
        produit: Number(req.body.produit),
        rubrique: Number(req.body.rubrique),
      });
      res.status(201).json(evaluation);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || 'Erreur serveur' });
    }
  }
);

// Récupérer une évaluation par ID
router.get('/:id', async (req, res) => {
  try {
    const evaluation = await EvaluationService.getById(Number(req.params.id));
    if (!evaluation) 
      res.status(404).json({ error: 'Évaluation non trouvée' });
    res.json(evaluation);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

// Récupérer les réponses liées à une évaluation
router.get('/:id/reponses', async (req, res) => {
  try {
    const data = await EvaluationService.getEvaluationReponses(Number(req.params.id));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

// Sauvegarder une réponse
router.post('/reponse/:id', async (req, res) => {
  try {
    const { reponse } = req.body;
    const result = await EvaluationService.saveReponse(Number(req.params.id), reponse);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

// Terminer l’évaluation + renvoyer le score (aligné avec ta computeScore)
router.post('/:id/finish', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) res.status(400).json({ error: 'ID invalide' });

    const result = await EvaluationService.finishEvaluation(id);
    if (!result.evaluation) res.status(404).json({ error: 'Évaluation non trouvée' });

    // result = { evaluation, score: { questionsCount, total, max, avgOn4, grade, percent, breakdown[] } }
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

// Récupérer les EQR d'une évaluation (pour afficher le formulaire)
router.get('/:id/reponses', async (req, res) => {
  try {
    const data = await EvaluationService.getEvaluationReponses(Number(req.params.id));
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

// Enregistrer une réponse (index du choix)
router.post('/reponse/:eqrId', async (req, res) => {
  try {
    const { reponse } = req.body; // index choisi
    const saved = await EvaluationService.saveReponse(Number(req.params.eqrId), reponse);
    res.json(saved);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

export default router;
