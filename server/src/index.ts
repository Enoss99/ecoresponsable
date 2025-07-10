import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db";
import usersRoutes from "./routes/users";
import societeRouter from "./routes/Societe";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import path from "path";
import loginRouter from "./routes/login";
import { errorHandler } from "./middlewares/error-handler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static("client"));

AppDataSource.initialize()
  .then(() => {
    console.log("Base de données connectée");
    app.listen(4000, () => {
      console.log("Serveur lancé sur http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Erreur de connexion TypeORM :", err);
  });

app.use("/api/users", usersRoutes);
app.use("/api/societe", societeRouter);

app.get("/api/ping", (_req, res) => {
  res.json({ message: "pong" });
});

app.use(loginRouter);

// All other GET requests not handled before will return React's index.html
app.get(/(.*)/, (_req, res) => {
  res.sendFile(path.resolve(__dirname, "../client", "index.html"));
});

// middleware pour gérer les erreurs
// tout ce qui est non catché passera ici
// pratique !
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
