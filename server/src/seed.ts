
import 'reflect-metadata';
import { AppDataSource } from './data-source';
import { Societe } from './entity/Societe';
import { Utilisateur } from './entity/Utilisateur';
import { Site } from './entity/Site';
import { Produit } from './entity/Produit';
import { Rubrique } from './entity/Rubrique';
import { Question } from './entity/Question';

async function seed() {
  await AppDataSource.initialize();

  // Créer une société
  const societe = AppDataSource.getRepository(Societe).create({ nom: "Green Corp" });
  await AppDataSource.getRepository(Societe).save(societe);

  // Créer un utilisateur
  const user = AppDataSource.getRepository(Utilisateur).create({
    nom: "Alice",
    prenom: "Dupont",
    isadmin: true,
    email: "alice@greencorp.com",
    societe: societe,
  });
  await AppDataSource.getRepository(Utilisateur).save(user);

  // Créer un site
  const site = AppDataSource.getRepository(Site).create({
    nom: "Site Paris",
    societe: societe,
  });
  await AppDataSource.getRepository(Site).save(site);

  // Créer des produits
  const produit1 = AppDataSource.getRepository(Produit).create({
    nom: "Produit A",
    site: site,
  });
  const produit2 = AppDataSource.getRepository(Produit).create({
    nom: "Produit B",
    site: site,
  });
  await AppDataSource.getRepository(Produit).save([produit1, produit2]);

  // Créer une rubrique et des questions
  const rubrique = AppDataSource.getRepository(Rubrique).create({
    titre: "Énergie",
    questions: [],
  });
  await AppDataSource.getRepository(Rubrique).save(rubrique);

  const q1 = AppDataSource.getRepository(Question).create({
    texte: "Le site utilise-t-il de l'énergie renouvelable ?",
    rubrique: rubrique,
  });
  const q2 = AppDataSource.getRepository(Question).create({
    texte: "Le site mesure-t-il sa consommation ?",
    rubrique: rubrique,
  });
  await AppDataSource.getRepository(Question).save([q1, q2]);

  console.log('Seed terminé avec succès ✔️');
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
