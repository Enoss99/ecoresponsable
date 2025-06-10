import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); // Pour lire DATABASE_URL depuis .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
