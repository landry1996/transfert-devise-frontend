
# Documentation du Frontend

## Aperçu
Ce frontend est construit avec ReactJS et fournit une interface utilisateur pour gérer les comptes, consulter les taux de change et transférer de l'argent entre les comptes. Il communique avec le backend via des API RESTful.

## Technologies Utilisées
- **ReactJS** : Bibliothèque JavaScript pour construire l'interface utilisateur.
- **Redux** : Pour la gestion de l'état global.
- **Redux Persist** : Pour persister l'état Redux lors des rechargements de page.
- **Material-UI** : Pour les composants UI et le style.
- **Axios** : Pour effectuer des requêtes HTTP vers le backend.

## Structure du Projet
- **src/store** : Contient la configuration du store Redux et les slices.
- **src/services** : Contient les fonctions de service pour les API.
- **src/pages** : Contient les composants React pour les différentes pages (ex : Login, Register, Accounts, Transfer).
- **src/components** : Contient des composants réutilisables (ex : LogoutButton).

## Fonctionnalités Clés

### Authentification des Utilisateurs
- **Connexion** : Les utilisateurs peuvent se connecter avec leur email et mot de passe. En cas de succès, un token JWT est stocké dans le local storage.
- **Déconnexion** : Les utilisateurs peuvent se déconnecter, ce qui supprime le token JWT et réinitialise l'état Redux.

### Gestion des Comptes
- **Ajouter un Compte** : Les utilisateurs peuvent ajouter de nouveaux comptes avec une devise et un solde spécifiés.
- **Voir les Comptes** : Les utilisateurs peuvent consulter la liste de tous les comptes associés à leur profil.

### Taux de Change
- **Taux de Change** : Les utilisateurs peuvent consulter le taux de change entre deux devises (USD et CAD).

### Transfert d'Argent
- **Transférer de l'Argent** : Les utilisateurs peuvent transférer de l'argent entre deux comptes. Le montant est automatiquement converti si les devises diffèrent.

## Gestion de l'État
- **Redux** : L'application utilise Redux pour la gestion de l'état global. L'état d'authentification de l'utilisateur et les informations des comptes sont stockés dans le store Redux.
- **Redux Persist** : L'état Redux est persistant lors des rechargements de page grâce à `redux-persist`.

## Intégration avec l'API
Le frontend communique avec le backend en utilisant Axios. Les points d'accès clés de l'API incluent :
- **POST /api/user/register** : Enregistrer un nouvel utilisateur.
- **POST /api/user/authenticate** : Authentifier un utilisateur.
- **POST /api/compte** : Ajouter un nouveau compte.
- **GET /api/Exchange-Rate/USD-CAD/{fromCurrency}/{toCurrency}** : Obtenir le taux de change.
- **POST /api/transfert** : Transférer de l'argent entre des comptes.

## Documentation d'Installation et d'Utilisation

### Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/landry1996/transfert-devise-frontend.git
   cd transfert-devise-frontend
   ```
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Construire l'image Docker et exécuter le conteneur Docker du frontend :
   ```bash
   docker build -t transfert-devise-frontend .
   docker-compose -f docker-compose-frontend.yml up
   ```
   Si vous souhaitez exécuter en arrière-plan :
   ```bash
   docker-compose -f docker-compose-frontend.yml up -d
   ```

### Utilisation
- **Inscription** : Créez un compte via `/register`.
- **Connexion** : Connectez-vous via `/login`.
- **Gestion des comptes** : Ajoutez des comptes via `/accounts`.
- **Transfert d'argent** : Effectuez des transferts via `/transfer`.
- **Taux de change** : Consultez les taux de change via `/exchange-rate`.

## Exécution de l'Application
1. Assurez-vous que le backend est en cours d'exécution sur `http://localhost:2077`.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Démarrez le serveur de développement :
   ```bash
   npm start
   ```
4. Accédez à l'application à l'adresse `http://localhost:3000`.

## Sécurité
- **Token JWT** : Le token JWT est stocké dans le local storage et inclus dans les en-têtes de toutes les requêtes authentifiées.
- **Routes Protégées** : Certaines routes (ex : Accounts, Transfer) sont protégées et nécessitent une authentification.

## Gestion des Erreurs
Le frontend inclut une gestion des erreurs pour les requêtes API, affichant des messages appropriés en cas d'erreur (ex : identifiants invalides, solde insuffisant).

## Style
L'application utilise Material-UI pour le style, offrant une interface utilisateur cohérente et réactive.

## Journalisation
Le frontend enregistre les événements importants tels que les requêtes API et les actions de l'utilisateur dans la console pour le débogage.



