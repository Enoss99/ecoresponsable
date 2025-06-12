import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /api/Utilisateur - liste tous les utilisateurs
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, nom, email FROM Utilisateur');
    res.json(result.rows);
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


router.get('/new', async (req: Request<any>, res: Response<any>) => {
});

// POST /api/users - crée un nouvel utilisateur
router.post('/', async (req: Request, res: Response) => {
  const { nom, prenom, email, password } = req.body;

  if (!nom || !prenom || !email || !password) {
    res.status(400).json({ error: 'Tous les champs sont requis' });
    return;
  }

  try {
    const result = await pool.query(
      'INSERT INTO Utilisateur (nom, prenom, email, password) VALUES ($1, $2, $3, $4) RETURNING id, nom, prenom, email',
      [nom, prenom, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;

// PATCH /api/Utilisateur/:id - met à jour un utilisateur
// /disable un utilisateur
router.patch('/:id/disable', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE Utilisateur SET isactive = FALSE WHERE id = $1 RETURNING id, nom, email, isactive',
      [userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// /enable un utilisateur
router.patch('/:id/enable', async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const result = await pool.query(
      'UPDATE Utilisateur SET isactive = TRUE WHERE id = $1 RETURNING id, nom, email, isactive',
      [userId]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

