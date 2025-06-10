import { Router, Request, Response } from 'express';
import pool from '../db';

const router = Router();

// GET /api/users - liste tous les utilisateurs
router.get('/', async (_req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, created_at FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

interface NewUser {
  name: string;
  email: string;
  password: string;
}


router.get('/new', async (req: Request<any>, res: Response<any>) => {
});

//POST /api/users - crée un nouvel utilisateur
router.post('/', async (req: Request, res: Response) => {
  const { name, email, password }: NewUser = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Tous les champs sont requis' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
      [name, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;
