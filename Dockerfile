# Étape 1 : Build de l'application avec Node.js
FROM node:20 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration (package.json, package-lock.json)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application
RUN npm run build

# Étape 2 : Utilisation de Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers de build de React vers le répertoire de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx en mode foreground
CMD ["nginx", "-g", "daemon off;"]
