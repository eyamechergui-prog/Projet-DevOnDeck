# DevOnDeck : Frontend Web (US-05 et US-06)

## Lancer le projet
```bash
npm install
cp .env.example .env     # adapter VITE_API_URL
npm run dev
```
Page : http://localhost:5173/profile

## Structure
```
src/
├── pages/DeveloperProfilePage.jsx      Page : charge le profil, assemble les sections
├── components/
│   ├── common/FormField.jsx            Champ de formulaire réutilisable
│   ├── common/StatusMessage.jsx        Message succès / erreur
│   └── profile/
│       ├── PersonalInfoForm.jsx        US-05 : infos personnelles et bio
│       ├── LanguageSelector.jsx        US-06 : choix des 5 langages
│       └── LanguageOption.jsx          Un langage cliquable
├── hooks/useProfile.js                 GET du profil au chargement de la page
├── services/api.js                     fetch + JWT + erreurs HTTP
├── services/profileService.js          Routes de l'API du profil
├── utils/validators.js                 Règles de validation
└── constants/languages.js              Liste prédéfinie des langages
```

## ⚠️ Hypothèses à confirmer avec l'équipe backend
Tout se corrige dans `services/profileService.js` (routes), `services/api.js` (token) et `constants/languages.js`.

| Hypothèse | Valeur actuelle |
|---|---|
| Récupérer le profil | `GET /profile/me` |
| Enregistrer US-05 | `PUT /profile/me` (firstName, lastName, title, location, bio) |
| Enregistrer US-06 | `PUT /profile/me/languages` avec `{ languages: [...] }` |
| Token JWT | `localStorage` clé `token`, en-tête `Authorization: Bearer …` |
| Erreurs de validation | `{ message, errors: { champ: "texte" } }` |
| CORS | activé côté Express pour `http://localhost:5173` |

## Tester sans login
Console du navigateur : `localStorage.setItem("token", "<un JWT valide>")` puis recharger.
