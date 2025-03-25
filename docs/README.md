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

### Mise à jour 25/03/25

1. **Configuration de l'environnement Azure AD** :

   - enregistrement de l'application dns le portail Azure AD pour obtenir l'ID d'application (Client ID), le secret client (Client Secret), et l'ID du locataire (Tenant ID).
   - configuration des URLs de redirection nécessaires pour que mon application puisse gérer les réponses d'authentification.
2. **Installation et configuration de NextAuth.js** :

   - Installation de NextAuth.js dans mon projet pour gérer l'authentification.
   - Création du fichier `authOptions.ts` pour configurer les options d'authentification, y compris le fournisseur Azure AD et les callbacks pour gérer les tokens JWT et les sessions.
3. **Mise en place de la page de connexion** :

   - Création du composant de connexion qui utilise `signIn` de NextAuth.js pour initier le processus d'authentification avec Microsoft.
   - Ajout d'une logique pour rediriger automatiquement l'utilisateur vers la page principale après une connexion réussie.
4. **Protection des routes avec `ProtectedRoute`** :

   - Création d'un composant pour protéger les routes, en vérifiant l'état de la session et en redirigeant les utilisateurs non authentifiés vers la page de connexion.
   - Utilisation du hook `useSession` de NextAuth.js pour vérifier l'état de la session dans le composant `ProtectedRoute`.
5. **Intégration du `SessionProvider`** :

   - Création d'un wrapper de session pour fournir le contexte de session à toute l'application, en utilisant `SessionProvider` de NextAuth.js.
6. **Gestion des variables d'environnement** :

   - Config des variables d'environnement nécessaires dans le fichier `.env.local` pour stocker les identifiants Azure AD et les secrets de manière sécurisée.
7. **Débogage et vérification** :

   - Ajout des logs pour vérifier l'état de la session et diagnostiquer les problèmes de redirection.
   - Vérification que toutes les configurations étaient correctes et que l'application fonctionnait comme prévu après la connexion.
