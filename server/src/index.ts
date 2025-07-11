import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db';
import usersRoutes from './routes/users';
import societeRoutes from './routes/Societe';
import siteRoutes from './routes/Site';
import produitRoutes from './routes/Produit';
import rubriqueRoutes from './routes/Rubrique';
import evaluationRoutes from './routes/Evaluation';
import questionRoutes from './routes/Question';

import 'reflect-metadata';
import { AppDataSource } from './data-source';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/users', usersRoutes);


AppDataSource.initialize()
  .then(() => {
    console.log('Base de données connectée');
    app.listen(4000, () => {
      console.log('Serveur lancé sur http://localhost:4000');
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion TypeORM :', err);
  });

app.use('/api/users', usersRoutes);
app.use('/api/societe', societeRoutes);
app.use('/api/site', siteRoutes);
app.use('/api/produit', produitRoutes);
app.use('/api/rubrique', rubriqueRoutes);
app.use('/api/evaluation', evaluationRoutes);
app.use('/api/question', questionRoutes); 


app.get('/api/ping', (_req, res) => {
  res.json({ message: 'pong' });
});

app.get('/api/users', async (_req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json({message2: result.rows});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur de base de données' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
