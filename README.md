# Legendary Cave Front

Plateforme de mise en réseau pour les anciens étudiants - Trouvez vos camarades, explorez leurs spécialités et facilitez vos collaborations professionnelles.

## Description du Projet

**Legendary Cave Front** est une application React dédiée au réseautage des anciens étudiants (promotion 2027) avec les fonctionnalités suivantes :

- Annuaire d'Alumni - Recenser les camarades de promotion avec profils détaillés
- Localisation - Savoir où travaillent vos camarades actuellement
- Spécialités - Voir les domaines d'expertise de chacun (IA, Web, Cybersécurité, Data Science, DevOps, etc.)
- Mise en Contact - Faciliter la recherche de collaboration et d'emploi
- Galerie Photos - Archiver les souvenirs de la promotion
- Formulaire de Contact - Rester en touch avec l'équipe
- Interface Moderne - Design épuré avec Tailwind CSS

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone <repository-url>
cd legendary-cave-front
```

2. Installer les dépendances :
```bash
npm install
```

## Scripts Disponibles

### `npm start`

Lance l'application en mode développement.
Ouvre [http://localhost:3000](http://localhost:3000) dans le navigateur.

La page se recharge automatiquement lors des modifications.

### `npm run dev`

Alternative pour démarrer l'application en mode développement.

### `npm test`

Lance les tests en mode interactif.

### `npm run build`

Crée une version optimisée pour la production dans le dossier `build`.

## Structure du Projet

```
src/
├── components/      # Composants réutilisables
│   ├── Header.js
│   └── Footer.js
├── pages/           # Pages principales
│   ├── home.js
│   ├── about.js
│   ├── contact.js
│   └── galerie.js
├── routes/          # Configuration des routes
│   └── routes.js
├── services/        # Services (API, etc.)
│   └── apiService.js
├── styles/          # Styles CSS
│   └── index.css
├── assets/          # Images et ressources
├── App.js
└── index.js
```

## Technologies Utilisées

- **React** - Framework JavaScript
- **React Router** - Gestion de la navigation
- **Tailwind CSS** - Framework CSS
- **PostCSS** - Transformations CSS

## Configuration

### Tailwind CSS

Configuration disponible dans `tailwind.config.js`

### PostCSS

Configuration disponible dans `postcss.config.js`

## Déploiement

Pour déployer l'application :

1. Construire la version production :
```bash
npm run build
```

2. Deployer le dossier `build` sur votre serveur/plateforme d'hébergement

## Contribution

Les contributions sont bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## Licence

Ce projet est licencié sous la Licence MIT.
git add
