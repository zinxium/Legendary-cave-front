# 🎯 Legendary Cave - Backend API

Backend API pour la galerie de promotion développé avec NestJS et MySQL.

## 📋 Prérequis

- Node.js (v16+)
- npm ou yarn
- MySQL 8.0+ ou Docker
- Redis (optionnel, pour le cache)

## 🚀 Installation rapide

```bash
# Cloner et installer
git clone <repository-url>
cd legendary-cave-backend
npm install

# Configuration
cp .env.example .env
# Modifier les variables dans .env

# Base de données (avec Docker)
docker-compose up -d mysql

# Démarrage
npm run start:dev
```

## 📁 Structure du projet

```
src/
├── auth/           # Authentification JWT
├── students/       # Gestion des étudiants
├── photos/         # Gestion des photos
├── domains/        # Domaines d'expertise
├── contact/        # Messages de contact
├── upload/         # Upload de fichiers
├── database/       # Configuration DB & migrations
└── common/         # Utilitaires partagés
```

## 🛠️ Scripts disponibles

```bash
npm run start:dev      # Développement avec hot-reload
npm run start:prod     # Production
npm run build          # Build du projet
npm run test           # Tests unitaires
npm run test:e2e       # Tests end-to-end
npm run db:migrate     # Exécuter les migrations
npm run db:seed        # Peupler la base de données
npm run db:reset       # Reset complet de la DB
```

## 📚 API Endpoints

### Étudiants
- `GET /api/students` - Liste des étudiants
- `GET /api/students/:id` - Détail d'un étudiant
- `POST /api/students` - Créer un étudiant
- `PUT /api/students/:id` - Modifier un étudiant
- `DELETE /api/students/:id` - Supprimer un étudiant

### Photos
- `GET /api/photos` - Liste des photos
- `POST /api/photos/upload` - Upload de photos
- `DELETE /api/photos/:id` - Supprimer une photo

### Contact
- `POST /api/contact` - Envoyer un message
- `GET /api/contact` - Liste des messages (admin)

### Domaines
- `GET /api/domains` - Liste des domaines

## 🔒 Authentification

L'API utilise JWT pour l'authentification. Incluez le token dans le header :
```
Authorization: Bearer <token>
```

## 🐳 Docker

```bash
# Démarrer MySQL et Redis
docker-compose up -d

# Arrêter les services
docker-compose down
```

## 📝 Variables d'environnement

Voir `.env.example` pour la liste complète des variables.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Projet étudiant - Promotion 2024 - Legendary Cave
