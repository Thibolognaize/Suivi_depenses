
# Projet Next.js avec Authentification Microsoft Entra ID

## Prérequis

- Node.js et npm installés sur votre machine.
- Un compte Azure avec accès à Azure Active Directory.
- Une base de données configurée (par exemple, Mysql).

## Étapes de mise en place

### 1. Installer les dépendances

Clonez le dépôt et installez les dépendances nécessaires :

```bash
git clone <votre-repo>
cd <votre-projet>
npm install
```

### 1.5 Enregistrer l'application dans Microsoft Entra ID

1. **Accédez au portail Azure** : Connectez-vous au [portail Azure](https://portal.azure.com/).
2. **Enregistrez une nouvelle application** :
   - Allez dans "Azure Active Directory" > "App registrations" > "New registration".
   - Donnez un nom à votre application et configurez l'URL de redirection (par exemple, `http://localhost:3000/api/auth/callback/azure-ad`).
3. **Notez les informations suivantes** :
   - **Client ID** : Identifiant de l'application.
   - **Tenant ID** : Identifiant du locataire.
   - **Client Secret** : Générez un secret client dans "Certificates & secrets".

### 2. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet et renseignez les informations suivantes :

```env
AZURE_AD_CLIENT_ID=votre-client-id
AZURE_AD_CLIENT_SECRET=votre-client-secret
AZURE_AD_TENANT_ID=votre-tenant-id
AUTH_SECRET=votre-secret-auth
DATABASE_URL=votre-url-de-connexion-bdd
```

### 3. Mettre en place le schéma Prisma pour la base de données

1. **Installer Prisma** :

   ```bash
   npm install @prisma/client
   npm install prisma --save-dev
   ```
2. **Initialiser Prisma** :

   ```bash
   npx prisma init
   ```
3. **Configurer le schéma Prisma** :

   Éditez le fichier `prisma/schema.prisma` pour définir votre modèle de données. Exemple :

   ```prisma
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id    Int     @id @default(autoincrement())
     name  String
     email String  @unique
   }
   ```
4. **Migrer la base de données** :

   ```bash
   npx prisma migrate dev --name init
   ```

### 3.5 Insérer un jeu de données (optionnel)

Si vous avez besoin d'insérer des données initiales, utilisez le script définit (import-data) ou un outil comme `prisma db seed` :

```bash
npm import-data
npx prisma db seed
```

### 4. Lancer le projet en mode développement

Démarrez le serveur de développement Next.js :

```bash
npm run dev
```
