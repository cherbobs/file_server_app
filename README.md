# File Server Project

# API de Serveur de Fichiers

Une API permettant aux utilisateurs de stocker, gérer et partager des fichiers avec authentification sécurisée.

## Table des Matières
1. [Introduction](#introduction)
2. [Authentification et Sécurité](#authentification-et-sécurité)
   - [JWT](#jwt-json-web-token)
   - [Contrôle d'Accès](#contrôle-daccès)
3. [Endpoints](#endpoints)
   - [Authentification](#authentification)
   - [Gestion des Fichiers](#gestion-des-fichiers)
4. [Exemples de Requêtes](#exemples-de-requêtes)
5. [Bonnes Pratiques de Sécurité](#bonnes-pratiques-de-sécurité)
6. [Installation](#installation)

---

## Introduction

Cette API de serveur de fichiers permet aux utilisateurs de :
- Créer un compte et se connecter pour accéder à un espace de stockage personnel.
- Télécharger, gérer, et partager des fichiers avec d'autres utilisateurs via des liens temporaires.
- Limiter l'utilisation de l'espace de stockage à un quota défini (ex. 2 Go par utilisateur).

L'API utilise des technologies modernes telles que **Node.js**, **MySQL**, et **JWT** pour la sécurité et la gestion d'accès.

## Authentification et Sécurité

### JWT (JSON Web Token)

L'API utilise JWT pour authentifier les utilisateurs. Après une connexion réussie, un token JWT est généré et renvoyé à l'utilisateur, lui permettant d'accéder aux endpoints protégés. Voici les étapes clés :

1. **Inscription** : L'utilisateur crée un compte en fournissant un nom d'utilisateur, un mot de passe et une adresse e-mail. Le mot de passe est sécurisé par un hachage.
2. **Connexion** : Lors de la connexion, l'utilisateur reçoit un token JWT signé avec une clé secrète. Ce token est inclus dans les en-têtes des futures requêtes pour accéder aux endpoints protégés.
3. **Validation du Token** : Chaque requête protégée vérifie la validité du JWT en utilisant la clé secrète stockée dans une variable d'environnement (`JWT_SECRET`). Si le token est valide, l'accès est autorisé ; sinon, une réponse `401 Unauthorized` est renvoyée.

### Contrôle d'Accès

1. **Middleware d'Authentification** : Toutes les routes nécessitant un accès authentifié utilisent un middleware d'authentification. Ce middleware :
   - Vérifie la présence et la validité du token JWT dans l'en-tête `Authorization`.
   - Renvoie une réponse `403 Forbidden` si aucun token n'est fourni, ou `401 Unauthorized` si le token est invalide.

2. **Accès Basé sur les Rôles (optionnel)** : Pour les fonctionnalités futures, des rôles d’utilisateur (par exemple, **admin** et **utilisateur**) peuvent être ajoutés. Le middleware d'autorisation vérifiera alors les permissions en fonction du rôle avant d'accorder l'accès à certains endpoints.

3. **Contrôle des Quotas** : L’espace de stockage de chaque utilisateur est limité (par exemple, 2 Go). Avant chaque upload, l’API vérifie la taille des fichiers et refuse les uploads si le quota est dépassé.

## Endpoints

### Authentification

- **POST /auth/register**  
  Crée un nouveau compte utilisateur.
  - **Paramètres** : `username`, `email`, `password`
  - **Réponse** : Confirmation de création de compte ou message d'erreur.

- **POST /auth/login**  
  Authentifie l'utilisateur et renvoie un token JWT.
  - **Paramètres** : `username`, `password`
  - **Réponse** : `{ "token": "jwt_token" }` si authentification réussie.

### Gestion des Fichiers

- **GET /files**  
  Récupère la liste des fichiers de l'utilisateur.
  - **Sécurité** : JWT requis.

- **POST /files/upload**  
  Upload un fichier.
  - **Paramètres** : `file`
  - **Sécurité** : JWT requis et vérification du quota utilisateur.

- **DELETE /files/:fileId**  
  Supprime un fichier de l'utilisateur.
  - **Sécurité** : JWT requis.

- **GET /files/share/:fileId**  
  Génère un lien temporaire pour partager un fichier.
  - **Sécurité** : JWT requis.

## Exemples de Requêtes

### Exemple de Requête d’Inscription

```http
POST /auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

## Prérequis
- Docker
- Docker Compose

## Installation et Lancement

1. Cloner le dépôt et se rendre dans le dossier du projet :
   ```bash
   git clone <url> && cd file-server-project 
   ```

2. ``` bash
   npm install 
   ```

3. Installer les dépendances
 ``` bash
  npm install express
   npm install jsonwebtoken
   npm install bcryptjs
   npm install mysql2
   npm install dotenv
   npm install multer
   ```

4. Lancer l'application avec Docker
 ```bash 
 docker-compose up --build 
 ```
