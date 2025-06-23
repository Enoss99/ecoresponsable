import { Router, Request, Response } from 'express';

import { body, validationResult } from 'express-validator';
import { UtilisateurService } from '../services/UtilisateurService';

const router = Router();

// GET /api/users - récupère tous les utilisateurs
router.get('/', async (req: Request, res: Response) => {
  try {
    const user = await UtilisateurService.getAll();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// GET /api/users/id - liste tous les utilisateurs
router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await UtilisateurService.getById(userId);
    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/users - crée un nouvel utilisateur
router.post('/',
  [
    body('nom').notEmpty().withMessage('Le nom est requis'),
    body('prenom').notEmpty().withMessage('Le prénom est requis'),
    body('email').isEmail().withMessage('Email invalide'),
    body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
    //body('societe').notEmpty().withMessage('La société est requise'),
    body('isadmin').optional().isBoolean().withMessage('isadmin doit être un booléen'),
  ],  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ error: errors.array()[0].msg });
    }
  try {
    const user = await UtilisateurService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur1' });
  }
});

export default router;

// PATCH /api/Utilisateur/:id - met à jour un utilisateur
// /disable un utilisateur
router.post('/:id/disable', async (req, res) => {
  try {
    const user = await UtilisateurService.disable(Number(req.params.id));
    if (!user){
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// /enable un utilisateur
router.post('/:id/enable', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await UtilisateurService.enable(Number(req.params.id));
    if (!user) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

