import "reflect-metadata";
import { DataSource } from "typeorm";
import { Societe } from "./entity/Societe";
import { Utilisateur } from "./entity/Utilisateur";
import { Site } from "./entity/Site";
import { Produit } from "./entity/Produit";
import { Rubrique } from "./entity/Rubrique";
import { Question } from "./entity/Question";
import { Evaluation } from "./entity/Evaluation";
import { Reponse } from "./entity/Reponse";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5222,
  username: "chapuis",
  password: "root",
  database: "mydb",
  synchronize: true,
  logging: false,
  entities: [
    Societe,
    Utilisateur,
    Site,
    Produit,
    Rubrique,
    Question,
    Evaluation,
    Reponse,
  ],
  migrations: [],
  subscribers: [],
});
