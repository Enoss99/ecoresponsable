import { Router, Request, Response } from 'express';
import pool from '../db';
import { Utilisateur } from '../entity/Utilisateur';
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

interface NewUser {
  name: string;
  prenom: string;
  email: string;
  password: string;
}

// POST /api/users - crée un nouvel utilisateur
router.post('/', async (req, res) => {
  const { nom, prenom, email, password, isadmin, societe } = req.body;
  if (!nom || !prenom || !email || !password) {
    res.status(400).json({ error: 'Tous les champs sont requis' });
  }
  try {
    const user = await UtilisateurService.create({ nom, prenom, email, password, isadmin, societe });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
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

