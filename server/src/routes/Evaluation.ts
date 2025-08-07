// src/routes/Evaluation.ts
import { Router } from 'express';
import { EvaluationService } from '../services/EvaluationService';

const router = Router();

// Créer une évaluation
router.post('/', async (req, res) => {
  try {
    const evaluation = await EvaluationService.create(req.body);
    res.status(201).json(evaluation);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

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

// Terminer une évaluation
router.post('/:id/terminate', async (req, res) => {
  try {
    const evaluation = await EvaluationService.terminateEvaluation(Number(req.params.id));
    res.json(evaluation);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});

export default router;
