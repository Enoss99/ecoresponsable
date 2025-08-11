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
                  {
        texte: "Quel est votre positionnement concernant l'écoresponsabilité ?",
        choixReponse: [
          { texte: 'Pas d\'approche spécifique', valeur: 1 },
          { texte: 'Je fabrique de tout mais fais la promotion des produits responsables pour inciter mes clients à changer de cap', valeur: 2 },
          { texte: 'Je fabrique en majorité des produits responsables (hors demandes spécifiques client)', valeur: 3 },
          { texte: 'Je ne fabrique que des produits responsables', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Bilan Carbone',
    questions: [
      {
        texte: "Taux d'impression",
        choixReponse: [
          { texte: 'Fond uni uniquement.', valeur: 1 },
          { texte: 'Selon demande client.', valeur: 2 },
          { texte: 'Fond caviardé entre 50% et 80% d\'encrage uniquement.', valeur: 3 },
          { texte: 'Fond caviardé de moins de 50% d\'encrage uniquement.', valeur: 4 }
        ]
      },
      {
        texte: "Quel est le type d’encre utilisé ?",
        choixReponse: [
          { texte: 'Encre à solvant ou encre grasse', valeur: 1 },
          { texte: 'Encre imprim\'vert', valeur: 2 },
          { texte: 'Encre à eau', valeur: 4 }
        ]
      },
            {
        texte: "Fabriquez vous des enveloppes à fenêtre ?",
        choixReponse: [
          { texte: 'Oui', valeur: 1 },
          { texte: 'Non', valeur: 4 }
        ]
      },
            {
        texte: "Quel est le matériau utilisé pour la fenêtre de l’enveloppe ?",
        choixReponse: [
          { texte: 'Fenêtre plastique', valeur: 1 },
          { texte: 'Selon demande client', valeur: 2 },
          { texte: 'Fenêtre en papier cristal', valeur: 4 }
        ]
      },
                  {
        texte: "Si vous avez déjà réalisé une démarche d’Analyse du Cycle de Vie (ACV), quel en était le périmètre ?",
        choixReponse: [
          { texte: 'Pas d\'ACV sur le produit concerné', valeur: 1 },
          { texte: 'Analyse faite sur la production', valeur: 2 },
          { texte: 'Analyse représente plus de 80% des impacts', valeur: 3 },
          { texte: 'Analyse faite sur l\'ensemble du cycle de vie (100% des impacts couverts)', valeur: 4 }
        ]
      },
                  {
        texte: "Si vous avez déjà réalisé un bilan carbone, quel(s) étai(en)t le(s) scope(s) concerné(s) ?\
Scope 1 : émissions GES directes liées à l’énergie\
Scope 2 : émissions GES indirectes liées à l’énergie\
Scope 3 : émissions GES indirectes liées à l’activité de votre structure",
        choixReponse: [
          { texte: 'Pas de bilan carbone', valeur: 1 },
          { texte: 'Scope 1', valeur: 2 },
          { texte: 'Scope 1 et 2', valeur: 3 },
          { texte: 'Scope 1, 2 et 3', valeur: 4 }
        ]
      },
                  {
        texte: "Quel a été votre résultat en kg CO2 / tonne de papier",
        choixReponse: [
          { texte: 'Pas de bilan carbone', valeur: 1 },
          { texte: 'Plus de 500 eq kgCO2/tonne de papier', valeur: 2 },
          { texte: 'Entre 300 et 500 eq kgCO2/tonne de papier', valeur: 3 },
          { texte: '<300 eq kgCO2/tonne de papier', valeur: 4 }
        ]
      },
                  {
        texte: "Quel est le type de papier utilisé dans ce produit ?", //est en rouge dans l'exel. peut être à delete
        choixReponse: [
          { texte: 'Papier teinté dans la masse', valeur: 1 },
          { texte: 'Papier non couché sans bois', valeur: 2 },
          { texte: 'Papier couché avec bois', valeur: 3 },
          { texte: 'Papier avec bois', valeur: 4 }
        ]
      },
                  {
        texte: "Quel est le taux d’encrage du produit ?",
        choixReponse: [
          { texte: '151% à 300%', valeur: 1 },
          { texte: '50% à 150%', valeur: 2 },
          { texte: '30% à 50%', valeur: 3 },
          { texte: '<30%', valeur: 4 }
        ]
      },
                  {
        texte: "Quel a été votre résultat en kg CO2 / 1 000 €?",
        choixReponse: [
          { texte: '< 70kgCO2 / 1 000 €', valeur: 1 },
          { texte: 'Entre 70 et 120kgCO2 / 1 000 €', valeur: 2 },
          { texte: 'Entre 120 à 150 kgCO2 / 1 000 €  ', valeur: 3 },
          { texte: 'Pas de bilan carbone', valeur: 4 }
        ]
      },
                  {
        texte: "Quel a été votre résultat eng eqCO2  /km ?",
        choixReponse: [
          { texte: 'Inférieur à 100g eqCO2/km', valeur: 1 },
          { texte: 'Entre 101et 150g eqCO2/km', valeur: 2 },
          { texte: 'Entre 151 et 200g eqCO2/km', valeur: 3 },
          { texte: 'Supérieur à 200g eqCO2/km', valeur: 4 }
        ]
      },
                  {
        texte: "Quel a été votre résultat en kg CO2 / Go",
        choixReponse: [
          { texte: 'Pas de bilan carbone', valeur: 1 },
          { texte: 'Entre 120 à 150 kgCO2 / 1 000 €  ', valeur: 2 },
          { texte: 'Entre 70 et 120kgCO2 / 1 000 €', valeur: 3 },
          { texte: '< 70kgCO2 / 1 000 €', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Gestion forestière',
    questions: [
      {
        texte: "Quelle est la part de fibres recyclées dans le produit évalué ?",
        choixReponse: [
          { texte: '< 50% fibres recyclées', valeur: 1 },
          { texte: '50 à 80% fibres recyclées', valeur: 2 },
          { texte: '80 à 99% fibres recyclées', valeur: 3 },
          { texte: '100% fibres recyclées', valeur: 4 }
        ]
      },
      {
        texte: "Quel pourcentage d'essences de bois ont un certificat d'origine ou une maîtrise de la traçabilité (par exemple : FSC/PEFC) ? ",
        choixReponse: [
          { texte: 'Aucune traçabilité de la matière première', valeur: 1 },
          { texte: '50 à 69% de bois tracé dans sa production', valeur: 2 },
          { texte: '70 à 99% de bois tracé dans sa production', valeur: 3 },
          { texte: '100% de bois tracé dans son mix de production', valeur: 4 }
        ]
      },
            {
        texte: "Le bois provient de forêt(s) gérée(s) :",
        choixReponse: [
          { texte: 'Forêts monocultures', valeur: 1 },
          { texte: '< 50% forêts diversifiées', valeur: 2 },
          { texte: '> 50% forêts diversifiées', valeur: 3 },
          { texte: '100% forêts diversifiées', valeur: 4 }
        ]
      },
            {
        texte: "Votre papier provient d’usine(s) :",
        choixReponse: [
          { texte: 'Monde entier', valeur: 1 },
          { texte: 'Europe, pays non frontalier(s)', valeur: 2 },
          { texte: 'Europe, pays frontalier(s)', valeur: 3 },
          { texte: 'Nationale(s)', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Energie',
    questions: [
                  {
        texte: "Quel est votre mix énergétique sur le lieu de production ?",
        choixReponse: [
          { texte: 'Utilisation uniquement d\'énergie fossile', valeur: 1 },
          { texte: 'Utilisation d\'électricité et de ressources fossiles', valeur: 2 },
          { texte: 'Présence d\'énergies renouvelables dans le mix énergétique', valeur: 3 },
          { texte: 'Aucune énergie fossile dans le mix énergétique', valeur: 4 }
        ]
      },
            {
        texte: "Quelle est le mode de production de votre électricité et sa part dans le mix électrique total ?  ",
        choixReponse: [
          { texte: 'Les énergies renouvelables représentent moins de 10% du mix électrique', valeur: 1 },
          { texte: 'Les énergies renouvelables représentent entre de 10% et 30% du mix électrique', valeur: 2 },
          { texte: 'Les énergies renouvelables représentent entre 30% et 59% du mix électrique', valeur: 3 },
          { texte: 'Les énergies renouvelables représentent plus de 60% du mix électrique', valeur: 4 }
        ]
      },
            {
        texte: "Quelle est votre consommation annuelle totale en énergie (en kWh/1000 enveloppes) ?",
        choixReponse: [
          { texte: 'Consommation > 6 kwh/1000 enveloppes', valeur: 1 },
          { texte: 'Consommation entre 4 et 6 kwh/1000 enveloppes', valeur: 2 },
          { texte: 'Consommation entre 3,0 et 3,9 kwh/1000 enveloppes', valeur: 3 },
          { texte: 'Consommation < 3 kwh/1000 enveloppes', valeur: 4 }
        ]
      },
            {
        texte: "Quelle est votre consommation annuelle totale en énergie (en kWh/tonne de papier) ?",
        choixReponse: [
          { texte: 'Consommation > 700 kwh/tonne de papier', valeur: 1 },
          { texte: 'Consommation 500 et 700 kwh/tonne de papier', valeur: 2 },
          { texte: 'Consommation entre 350 et 500 kwh/tonne de papier', valeur: 3 },
          { texte: 'Consommation < 350kwh/tonne de papier', valeur: 4 }
        ]
      },
            {
        texte: "Quel est votre indicateur d'efficacité énergétique (P.U.E) ?",
        choixReponse: [
          { texte: '> 2', valeur: 1 },
          { texte: 'Entre 1,5 et 2', valeur: 2 },
          { texte: 'Entre 1,25 et 1,5', valeur: 3 },
          { texte: '< 1,25', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Gestion de l\'eau',
    questions: [
                              {
        texte: "Où captez-vous votre eau ?",
        choixReponse: [
          { texte: 'Captation en milieu à risque', valeur: 1 },
          { texte: 'Captation dans de l\'eau de ville', valeur: 2 },
          { texte: 'Captation en point d\'eau (rivière, mer, …)', valeur: 3 },
          { texte: 'Récupération des eaux de pluie en plus des autres sources', valeur: 4 }
        ]
      },
            {
        texte: "Comment sont traitées vos eaux industrielles usées ?",
        choixReponse: [
          { texte: 'Les eaux industrielles usées sont traitées sur site ou à l\'exterieur  sans maitrise de la méthode employée', valeur: 1 },
          { texte: 'Les eaux industrielles usées sont traitées sur site ou à l\'exterieur par voie biologique  sans maitrise de la méthode employée', valeur: 2 },
          { texte: 'Les eaux industrielles usées sont traitées sur site ou a l\'exterieur', valeur: 3 },
          { texte: 'Les eaux industrielles usées sont traitées sur site ou à l\'exterieur par voie biologique', valeur: 4 }
        ]
      },
            {
        texte: "Comment sont rejetées vos eaux industrielles usées ? ",
        choixReponse: [
          { texte: 'L\'eau est rejetée dans le réseau de la ville', valeur: 1 },
          { texte: 'L\'eau est rejetée dans son milieu de captation dans les mêmes conditions (température, pH, …)', valeur: 2 },
          { texte: 'Au moins 70% de l\'eau captée est utilisée dans le process', valeur: 3 },
          { texte: 'Pas de rejet, l\'ensemble de l\'eau est consommée dans le process', valeur: 4 }
        ]
      },
            {
        texte: "Quelle est votre consommation annuelle totale en eau (en m3/tonne de papier) ?",
        choixReponse: [
          { texte: '> 30 m3 / tonne de papier', valeur: 1 },
          { texte: 'De 20,1 à 30 m3 / tonne de papier', valeur: 2 },
          { texte: 'De 15 à 20 m3 / tonne de papier', valeur: 3 },
          { texte: '< 15 m3 / tonne de papier ', valeur: 4 }
        ]
      },
            {
        texte: "Où en êtes vous avec le W.U.E (Water Usage Effectiveness) ?",
        choixReponse: [
          { texte: 'L\'entreprise n\'a rien mis en place et ne maitrise pas le sujet', valeur: 1 },
          { texte: 'L\'entreprise est sensibilisé à cette méthode de calcul', valeur: 2 },
          { texte: 'Les données nécessaires aux calculs sont en train d\'être récoltées ', valeur: 3 },
          { texte: 'Les calculs ont été réalisés et un plan de réduction de consommation en eau a été établi', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Biodiversité',
    questions: [
            {
        texte: "Quel est le pourcentage de surface végétalisée sur le lieu de production évalué ?",
        choixReponse: [
          { texte: '< 30%', valeur: 1 },
          { texte: 'Entre 30% à 59', valeur: 2 },
          { texte: 'Entre 60% et 79%', valeur: 3 },
          { texte: 'Entre 80% et 100%', valeur: 4 }
        ]
      },
            {
        texte: "Quel est votre CBS (Coefficient de Biotope par Surface) ?",
        choixReponse: [
          { texte: '< à 0,3', valeur: 1 },
          { texte: 'Entre 0,3 et 0,59', valeur: 2 },
          { texte: 'Entre 0,6 et 0,8', valeur: 3 },
          { texte: '> à 0,8', valeur: 4 }
        ]
      },
            {
        texte: "Avez-vous mis en place sur votre site une ou plusieurs de ces mesures ?",
        choixReponse: [
          { texte: 'Un inventaire ou une trame sont en cours  ou ont été réalisés ces dernières années.', valeur: 1 },
          { texte: 'Un inventaire faune flore est réalisé chaque année.', valeur: 2 },
          { texte: '"Inventaire faune flore annuel et suivi d\'un plan d\'action pour réintroduire du vivant sur site.\
Au moins une trame est existante et suivie."', valeur: 3 },
          { texte: '"Inventaire faune flore annuel et suivi d\'un plan d\'action pour réintroduire du vivant sur site.\
Au moins une trame est existante et suivie.\
Mise en place du science base target for nature."', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Conditionnement',
    questions: [
                        {
        texte: "Utilisez-vous le principe de la consigne pour le conditionnement du produit évalué ?",
        choixReponse: [
          { texte: 'Non', valeur: 1 },
          { texte: 'Oui', valeur: 4 }
        ]
      },
            {
        texte: "Quel est le taux de remplissage moyen des camions ? (en % du volume)",
        choixReponse: [
          { texte: 'Moins de 40%', valeur: 1 },
          { texte: 'Entre 40% et 59%', valeur: 2 },
          { texte: 'Entre 60% et 80%', valeur: 3 },
          { texte: '> 80%', valeur: 4 }
        ]
      },
            {
        texte: "Quel est le poids de matières à usage unique (film plastique, cornières, etc.) total pour une expédition de camion complet ?",
        choixReponse: [
          { texte: 'Supérieur à 11kg', valeur: 1 },
          { texte: 'Entre 5,01kg et 11kg', valeur: 2 },
          { texte: 'Entre 0,01kg et 5kg', valeur: 3 },
          { texte: '0 kg', valeur: 4 }
        ]
      },
            {
        texte: "Quels matériaux sont utilisés pour conditionner vos produits ? ",
        choixReponse: [
          { texte: '100% plastique', valeur: 1 },
          { texte: 'Mix papier / plastique avec plastique majoritaire', valeur: 2 },
          { texte: 'Mix papier / plastique avec papier majoritaire', valeur: 3 },
          { texte: '100% papier', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Gestion des déchets',
    questions: [
                        {
        texte: "Quel est votre taux de gâche ? (en %)",
        choixReponse: [
          { texte: '> 12%', valeur: 1 },
          { texte: 'Entre 9 et 12%', valeur: 2 },
          { texte: 'Entre 6 et 8,9%', valeur: 3 },
          { texte: '< 6%', valeur: 4 }
        ]
      },
            {
        texte: "Quelle est la répartition des déchets recyclés, valorisé, incinérés, enfouis ? (en %)",
        choixReponse: [
          { texte: '< 70% déchets triés et valorisés', valeur: 1 },
          { texte: '70 à 90% déchets triés et valorisés', valeur: 2 },
          { texte: '> 90% déchets triés et recyclés', valeur: 3 },
          { texte: '100% déchets triés et recyclés dont une partie sur site.', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Transport appro',
    questions: [
                        {
        texte: "Quelle est votre zone d'approvisionnement ?",
        choixReponse: [
          { texte: 'Monde', valeur: 1 },
          { texte: 'Europe', valeur: 2 },
          { texte: 'France (hexagone)', valeur: 3 },
          { texte: 'Loins de 100 km', valeur: 4 }
        ]
      },
            {
        texte: "Quels modes de transports utilisez vous et dans quelle proportion  en tonne / km ?",
        choixReponse: [
          { texte: 'Avion', valeur: 1 },
          { texte: 'Camion', valeur: 2 },
          { texte: 'Bateau', valeur: 3 },
          { texte: 'Train', valeur: 4 }
        ]
      },
            {
        texte: "Camion",
        choixReponse: [
          { texte: '100% énergie fossile', valeur: 1 },
          { texte: 'Incorporation de biocarburant supérieur au 7% réglementaire', valeur: 2 },
          { texte: 'Hybride (50% d\'énergie fossile maximum)', valeur: 3 },
          { texte: '80% d\'énergie renouvelable', valeur: 4 },
	  { texte: 'Autre', valeur: 0 }
        ]
      },
            {
        texte: "Bateau",
        choixReponse: [
          { texte: 'Fuel lourd', valeur: 2 },
          { texte: 'Gaz', valeur: 3 },
	  { texte: 'Autre', valeur: 0 }
        ]
      },
            {
        texte: "Train",
        choixReponse: [
          { texte: 'Diesel', valeur: 3 },
          { texte: 'Electrique', valeur: 4 },
	        { texte: 'Autre', valeur: 0 }
        ]
      },
    ]
  },
{
    rubrique: 'Engagement Green IT',
    questions: [
            {
        texte: "Quel est votre niveau de Sécurité informatique ?",
        choixReponse: [
          { texte: 'Aucune surveillance spécifique', valeur: 1 },
          { texte: 'Bonnes pratiques écrites (norme casier judiciaire extrait 3 , sécurité informatique, RGPD dans chaque contrat, interdiction photographie', valeur: 2 },
          { texte: 'La sécurité informatique est régulièrement testée via des tests d\'intrusion.', valeur: 3 },
          { texte: 'Elle est certifié ISO27001', valeur: 4 }
        ]
      },
            {
        texte: "Etes-vous certifiés ?",
        choixReponse: [
          { texte: 'Energie Star', valeur: 1 },
          { texte: 'Nordic Swan, Blue Angel et TCO', valeur: 2 },
          { texte: 'Label Green IT', valeur: 3 },
          { texte: 'EPEAT', valeur: 4 }
        ]
      },
            {
        texte: "Etes-vous Numérique Reponsable",
        choixReponse: [
          { texte: 'Aucune démarche entreprise', valeur: 1 },
          { texte: 'En cours de labllisation V2 ou V1', valeur: 2 },
          { texte: 'Labelisé V1', valeur: 3 },
          { texte: 'Labelisé V2', valeur: 4 }
        ]
      },
            {
        texte: "Comment gérez-vous la maintenance ?",
        choixReponse: [
          { texte: 'Maintenance logicielle et un entretien régulier des équipements', valeur: 2 },
          { texte: 'Présence d\'une équipe de maintenance avec un budget et un référent GreenIT', valeur: 4 }
        ]
      },
            {
        texte: "Comment prenez-vous en compte l'énergie associée à l'IT ?",
        choixReponse: [
          { texte: 'Formation et/ou sensibilisation des collaborateurs aux gestes du Green IT', valeur: 2 },
          { texte: 'Mise en place d’une politique d’économie d’énergie du système d’exploitation', valeur: 4 }
        ]
      },
            {
        texte: "Comment gérez-vous vos achats responsables de matériel lié à l'IT ?",
        choixReponse: [
          { texte: 'Connaissance de l’espace de stockage de données à disposition', valeur: 1 },
          { texte: 'Achat de matériels écolabellisés', valeur: 3 },
          { texte: 'Déclinaison de la stratégie Green IT en plan d’actions', valeur: 4 }
        ]
      },
            {
        texte: "Comment gérez-vous la réutilisation et optimisation de l'utilisation de l'IT ?",
        choixReponse: [
          { texte: 'Connaissance de la proportion de serveurs physiques et de serveurs virtuels', valeur: 1 },
          { texte: 'Mutualisation des équipements physiques', valeur: 2 },
          { texte: 'Mesure des impacts environnementaux des services numériques développés par l’entreprise', valeur: 3 },
          { texte: 'Mise en œuvre des bonnes pratiques de l’European Code of Conduct', valeur: 4 }
        ]
      },
            {
        texte: "Comment prenez-vous en compte l'impact global de l'IT ?",
        choixReponse: [
          { texte: 'Connaissance de la quantité de DEEE produits par an', valeur: 1 },
          { texte: 'Désinstallation des infrastructures inutiles', valeur: 2 },
          { texte: 'Mesure de la consommation du parc de postes de travail', valeur: 3 },
          { texte: 'Mise en place de critères DD et/ou RSE dans les appels d’offres', valeur: 4 }
        ]
      },
            {
        texte: "Comment prenez-vous en compte les déchets et impacts socio-environnementaux de l'IT ?",
        choixReponse: [
          { texte: 'Connaissance de la réglementation sur les DEEE', valeur: 1 },
          { texte: 'Paramétrage par défaut des équipements pour éviter le gaspillage', valeur: 2 },
          { texte: 'Traçabilité des éléments matériels (CMDB)', valeur: 3 },
          { texte: 'Prestataires ou fournisseurs issus du secteur de l’insertion et/ou du secteur protégé', valeur: 4 }
        ]
      },
    ]
  },
{
    rubrique: 'Conso. de ressources matérièles',
    questions: [
            {
        texte: "Avez-vous une politique d'achat et de maintenance qui intègre la réparabilité des produits ?",
        choixReponse: [
          { texte: 'Non', valeur: 1 },
          { texte: 'Oui, sur certains équipements secondaires', valeur: 2 },
          { texte: 'Oui, uniquement sur le matériel de production', valeur: 3 },
          { texte: 'Oui, sur l\'ensemble de notre de matériels (production et secondaire)', valeur: 4 }
        ]
      },
            {
        texte: "Durée de vie des appareils électroniques ?",
        choixReponse: [
          { texte: '2 ans >', valeur: 1 },
          { texte: '2 à 3 ans', valeur: 2 },
          { texte: '3 à 4 ans', valeur: 3 },
          { texte: '> 4 ans', valeur: 4 }
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
