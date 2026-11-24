# Backend de test DevOnDeck (US-05 et US-06)

Backend minimal pour tester le frontend. Il remplace le backend de l'équipe
tant qu'il n'est pas disponible : les routes sont celles supposées par le frontend.

## Lancer
```bash
npm install
cp .env.example .env      # puis adapter MONGODB_URI et JWT_SECRET
npm run dev               # API sur http://localhost:5000/api
npm run token             # crée un utilisateur de test et affiche le JWT
```
Coller la ligne `localStorage.setItem(...)` dans la console du navigateur, puis recharger /profile.

## Routes (JWT obligatoire : Authorization: Bearer <token>)
| Méthode | Route | Rôle | Codes |
|---|---|---|---|
| GET | /api/profile/me | Profil de l'utilisateur connecté | 200, 401, 404 |
| PUT | /api/profile/me | US-05 : infos personnelles | 200, 400, 401, 404 |
| PUT | /api/profile/me/languages | US-06 : exactement 5 langages | 200, 400, 401, 404 |

Erreurs : `{ "message": "...", "errors": { "champ": "..." } }`

## Structure
```
server.js                  Démarrage Express + MongoDB + CORS
src/routes/profile.js      Les 3 routes
src/middleware/auth.js     Vérification du JWT
src/models/User.js         Schéma Mongoose
src/constants/languages.js Liste des langages (identique au frontend)
scripts/createTestUser.js  Génère un token de test
```
