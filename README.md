# 🔥 HotDeal - Site dénicheur de bons plans

Site de bons plans français permettant de trouver les meilleures promotions sur le web. Construit avec Next.js 15, TypeScript, Tailwind CSS et Prisma/SQLite.

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

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode)
- **Prisma** avec SQLite
- **lucide-react** pour les icônes

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
