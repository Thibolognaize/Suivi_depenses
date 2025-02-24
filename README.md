🐳 Pense-bête Docker, Git et Gestion de Projet

### 1. Reconstruction de l'image Docker

#### Commandes :
```bash
# Arrêter les conteneurs existants
docker-compose down

# Reconstruire l'image sans cache
docker-compose build --no-cache

# Redémarrer les conteneurs
docker-compose up -d
```

#### Pourquoi reconstruire sans cache ?
- Forcer le téléchargement des dernières dépendances
- S'assurer que toutes les étapes sont réexécutées
- Éviter les problèmes de cache potentiels

### 2. Workflow Git et GitHub

#### Étapes de mise à jour du projet

1. **Avant de commencer**
```bash
# Vérifier la branche courante
git status

# Mettre à jour la branche principale
git checkout main
git pull origin main
```

2. **Créer une nouvelle branche de développement**
```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

3. **Développer et tester localement**
- Faire vos modifications
- Tester avec Docker
- Vérifier que tout fonctionne

4. **Commit et push**
```bash
# Ajouter les fichiers modifiés
git add .

# Commiter avec un message clair
git commit -m "Description précise des modifications"

# Pousser la branche sur GitHub
git push -u origin feature/ma-nouvelle-fonctionnalite
```

5. **Créer une Pull Request sur GitHub**
- Comparer avec la branche `main`
- Ajouter une description détaillée
- Demander une revue si nécessaire

### 3. Configuration `.gitignore`

#### À GARDER :
```gitignore
# Dépendances
node_modules/
.pnp/
.pnp.js

# Fichiers de build
/build
/.next/
/out/

# Environnement
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE et éditeurs
.idea/
.vscode/
*.swp
*.swo

# Système
.DS_Store
Thumbs.db

# Prisma
/prisma/migrations/
```

#### À NE PAS GARDER :
- Fichiers de configuration personnelle
- Secrets
- Données locales de test
- Fichiers générés dynamiquement

### 4. Bonnes pratiques GitHub

#### Gestion de projet
- Utiliser les **issues** pour tracker les tâches
- Créer des **projets** pour organiser le développement
- Utiliser des **milestones** pour les versions

#### Protection de la branche `main`
- Activer les règles de protection
- Nécessiter des revues de code
- Vérifier les tests avant fusion

### 5. Documentation

#### Fichiers à ajouter à la racine
- `README.md` : Description du projet
- `CONTRIBUTING.md` : Guide pour les contributeurs
- `LICENSE` : Licence du projet

### 6. Sécurité

#### Variables d'environnement
- Utiliser GitHub Secrets pour les variables sensibles
- Ne JAMAIS commiter de clés privées

### Commandes utiles Git

```bash
# Vérifier l'état
git status

# Voir les différences
git diff

# Historique des commits
git log

# Revenir à un commit précédent
git reset --hard <commit-hash>
```

### Conseils supplémentaires

- Faites des commits petits et fréquents
- Écrivez des messages de commit clairs et descriptifs
- Utilisez des branches pour chaque fonctionnalité
- Revoyez votre code avant de commiter
- Testez toujours localement avant de pousser

🚀 Bon développement !