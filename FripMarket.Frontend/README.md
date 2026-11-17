# FripMarket

Application React 18 avec Vite, React Router 6 et CSS personnalisé. Les produits utilisent les données locales de `src/data/mockProducts.js` par défaut.

## Démarrage

```bash
npm install
Copy-Item .env.example .env
npm run dev
```

Le client utilise `VITE_API_URL` (par défaut `https://localhost:5001/api`). Pour utiliser le catalogue du backend au lieu des données locales, définir `VITE_USE_MOCKS=false`.

## Contrat API attendu

Toutes les routes ci-dessous sont relatives à `VITE_API_URL`. Les requêtes authentifiées envoient automatiquement `Authorization: Bearer <JWT>`.

| Méthode | Route | Entrée principale | Réponse attendue |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password, rememberMe }` | `{ token, user? }` ou `{ accessToken, user? }` |
| POST | `/auth/register` | `{ firstName, lastName, email, phone, password, wantsToSell }` | `{ token?, user?, message? }` |
| POST | `/auth/forgot-password` | `{ email }` | Réponse générique ne révélant pas l'existence du compte |
| POST | `/auth/reset-password` | `{ token, email, password }` | Confirmation de réinitialisation |
| GET | `/products` | paramètres de filtre facultatifs | Liste d'articles compatible avec le modèle produit de l'application |
| GET | `/products/{id}` | — | Article ou `404` |
| POST | `/orders/checkout` | `{ productIds, paymentMethod }` | Commande confirmée |

Le JWT devrait fournir un claim `role`, `roles` ou le claim de rôle ASP.NET Core. Les rôles `Seller` et `Admin` protègent leurs espaces respectifs.
