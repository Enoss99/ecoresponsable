import { AppDataSource } from '../src/data-source';
import { Rubrique } from '../src/entity/Rubrique';
import { Question } from '../src/entity/Question';

const questionsData = [
  {
    rubrique: 'Renseignements généraux',
    questions: [
      {
        texte: "Pour le lieu de production évalué, avez-vous un ou plusieurs de ces certificat ou labels ?",
        choixReponse: [
          { texte: 'Usine en cours de certification.', valeur: 1 },
          { texte: 'Usine Certifiée 14001.', valeur: 2 },
          { texte: 'Usine Certifiée 14001, 50001.', valeur: 3 },
          { texte: 'Usine Certifiée 14001, 50001 et un référentiel RSE (Bcorp, Lucie, autre...).', valeur: 4 }
        ]
      },
      {
        texte: "Pour le produit évalué, avez-vous un ou les certificats suivant ?",
        choixReponse: [
          { texte: 'Une certification est en cours', valeur: 1 },
          { texte: 'FSC, PEFC', valeur: 2 },
          { texte: 'FSC, PEFC et NF environnement', valeur: 3 },
          { texte: 'FSC, PEFC, NF environnement et Ecolabel', valeur: 4 }
        ]
      },
            {
        texte: "Quel est votre taux d'emploiement de personnes en situation de handicap ?",
        choixReponse: [
          { texte: '<6% et contribution', valeur: 1 },
          { texte: 'de 6% (minimum légal) à 15%', valeur: 2 },
          { texte: 'de 15% à 54%', valeur: 3 },
          { texte: 'plus de 55% (entreprises adaptés)', valeur: 4 }
        ]
      },
            {
        texte: "Quel est votre index sur l'égalité professionnelle entre les femmes et les hommes (/100) ?",
        choixReponse: [
          { texte: '<75%', valeur: 1 },
          { texte: 'Entre 75% et 85%', valeur: 2 },
          { texte: 'Entre 85% et 95%', valeur: 3 },
          { texte: '> 95%', valeur: 4 }
        ]
      },
    ]
  },
];

async function seedQuestions() {
  await AppDataSource.initialize();

  for (const bloc of questionsData) {
    let rubrique = await AppDataSource.getRepository(Rubrique).findOneBy({ titre: bloc.rubrique });

    if (!rubrique) {
      rubrique = AppDataSource.getRepository(Rubrique).create({ titre: bloc.rubrique });
      await AppDataSource.getRepository(Rubrique).save(rubrique);
    }

    for (const q of bloc.questions) {
      const question = AppDataSource.getRepository(Question).create({
        texte: q.texte,
        choixreponse: q.choixReponse,
        rubrique,
      });

      await AppDataSource.getRepository(Question).save(question);
    }
  }

  console.log('✅ Questions seed insérées avec succès');
  process.exit(0);
}

seedQuestions().catch(console.error);
