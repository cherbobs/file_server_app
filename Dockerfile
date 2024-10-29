# Dockerfile
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY app/package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY app .

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
