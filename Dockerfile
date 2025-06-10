# Utiliser une image de base officielle de Node.js
FROM node:23-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application Next.js
RUN npm run build

# Utiliser une image plus légère pour exécuter l'application
FROM node:23-alpine

WORKDIR /app

# Copier les fichiers nécessaires pour exécuter l'application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Exposer le port sur lequel l'application va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db pull && npm run import-data && node .next/standalone/server.js"]
