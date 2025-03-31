# Utiliser une image de base officielle de Node.js
FROM node:23-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer les dépendances de développement et générer Prisma Client
RUN npm install -D ts-node typescript

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application Next.js
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db pull && npm run import-data && npm start"]
