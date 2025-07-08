import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { ProduitService } from '../services/ProduitService';

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



export default router;
