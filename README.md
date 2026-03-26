# 🔥 HotDeal - Site dénicheur de bons plans

Site de bons plans français permettant de trouver les meilleures promotions sur le web. Construit avec Next.js 14, TypeScript, Tailwind CSS et Prisma/SQLite.

## Fonctionnalités

- 🛍️ Catalogue d'offres avec recherche, filtres et tri
- 📂 Navigation par catégories (High-Tech, Mode, Maison, Alimentation, Voyages)
- 🏪 Pages marchands (Amazon, Cdiscount, Fnac, Darty, La Redoute)
- ❤️ Favoris persistants (localStorage)
- ⏱️ Minuterie d'expiration des offres
- 🌙 Mode sombre
- 📊 Dashboard d'administration
- 💰 Intégration liens d'affiliation avec tracking des clics

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode)
- **Prisma** avec SQLite
- **lucide-react** pour les icônes
- **Playwright** pour les tests E2E

## Installation

```bash
npm install
```

## Configuration base de données

```bash
# Créer/mettre à jour le schéma
npx prisma db push

# Alimenter la base avec les données de démonstration (22 offres)
npm run seed
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans le navigateur.

## Tests E2E

Le projet utilise [Playwright](https://playwright.dev/) pour les tests end-to-end. Les tests couvrent les pages principales du site, la navigation et les API.

### Prérequis

Installer les navigateurs Playwright (à faire une seule fois) :

```bash
npx playwright install chromium
```

### Lancer les tests

```bash
# Lancer tous les tests (build + démarrage du serveur automatique)
npm test

# Lancer les tests sur un serveur déjà démarré (plus rapide en développement)
npm run dev   # dans un terminal séparé
npx playwright test

# Lancer uniquement un fichier de tests
npx playwright test tests/e2e/homepage.spec.ts

# Afficher le rapport interactif après l'exécution
npx playwright show-report
```

### Couverture des tests

| Fichier | Description |
|---------|-------------|
| `tests/e2e/homepage.spec.ts` | Page d'accueil : hero, navigation, sections offres et catégories |
| `tests/e2e/offres.spec.ts` | Catalogue des offres : recherche, tri, filtres, détail d'une offre |
| `tests/e2e/categories.spec.ts` | Pages catégories : liste et navigation par catégorie |
| `tests/e2e/marchands.spec.ts` | Pages marchands : liste et navigation par marchand |
| `tests/e2e/navigation.spec.ts` | Navigation globale, mode sombre, contact, favoris |
| `tests/e2e/api.spec.ts` | API REST : offres, catégories, marchands, favoris |

## Build de production

```bash
npm run build
npm start
```

## Pages disponibles

| Page | Description |
|------|-------------|
| `/` | Accueil avec offres vedettes et catégories |
| `/offres` | Liste complète avec filtres |
| `/offres/[id]` | Détail d'une offre |
| `/categories` | Toutes les catégories |
| `/categories/[slug]` | Offres par catégorie |
| `/marchands` | Tous les marchands |
| `/marchands/[slug]` | Offres par marchand |
| `/favoris` | Mes offres favorites |
| `/admin` | Tableau de bord admin |

## Variables d'environnement

Fichier `.env` :

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_NAME="HotDeal - Bons Plans"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

