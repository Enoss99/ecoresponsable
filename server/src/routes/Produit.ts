import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ProduitService } from '../services/ProduitService';
import { EvaluationService } from '../services/EvaluationService';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const produits = await ProduitService.getAll();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});



router.post(
  '/',
  [
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('siteId').isNumeric().withMessage('siteId requis'),
  ],
  async  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array()[0].msg });
    }

    try {
      const produit = await ProduitService.create(req.body);
      res.status(201).json(produit);
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
);

router.get('/with-scores', async (_req, res) => {
  try {
    const produits = await ProduitService.getAll(); 
    const rows = await Promise.all(
      produits.map(async (p) => {
        const lastEval = await EvaluationService.getLastFinishedByProduit(p.id);
        if (!lastEval) {
          return { produit: p, score: null };
        }
        const score = await EvaluationService.computeScore(lastEval.id);
        return { produit: p, score }; 
      })
    );
    res.json(rows);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Erreur serveur' });
  }
});



export default router;
