# Image de base
FROM node:23.10.0 AS base

# Étape de dépendances
FROM base AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm ci

# Étape de construction
FROM base AS builder
WORKDIR /app

# Copier les dépendances et le code source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Construire l'application
RUN npm run build

# Image de production
FROM node:23.10.0 AS runner
WORKDIR /app

# Configuration de l'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurer les permissions
RUN mkdir -p .next && chown nextjs:nodejs .next

# Changer d'utilisateur
USER nextjs

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
