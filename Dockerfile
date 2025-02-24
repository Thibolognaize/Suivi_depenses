# Image de base
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat

# Étape de dépendances
FROM base AS deps
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Installer les dépendances selon le gestionnaire de packages
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Étape de construction
FROM base AS builder
WORKDIR /app

# Copier les dépendances et le code source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Installer les dépendances de développement et générer Prisma Client
# RUN npm install -D ts-node typescript \
#     && npx prisma generate

# Construire l'application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Image de production
FROM base AS runner
WORKDIR /app

# Configuration de l'environnement
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configurer les permissions
RUN mkdir -p .next  # Utilisez mkdir -p pour éviter les erreurs si le répertoire existe déjà
RUN chown nextjs:nodejs .next

# Changer d'utilisateur
USER nextjs

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["node", "server.js"]
