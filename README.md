# 🔥 HotDeal - Site dénicheur de bons plans

Site de bons plans français permettant de trouver les meilleures promotions sur le web. Construit avec Next.js, TypeScript, Tailwind CSS et Prisma/SQLite.

## Fonctionnalités

- 🛍️ Catalogue d'offres avec recherche, filtres et tri
- 📂 Navigation par catégories (High-Tech, Mode, Maison, Alimentation, Voyages)
- 🏪 Pages marchands (Amazon, Cdiscount, Fnac, Darty, La Redoute)
- ❤️ Favoris persistants (localStorage)
- ⏱️ Minuterie d'expiration des offres
- 🌙 Mode sombre
- 🔐 Backoffice d'administration protégé par mot de passe (interface française)
- 📊 Dashboard admin avec statistiques
- 🗂️ CRUD complet : Catégories, Marchands, Offres
- 💰 Intégration liens d'affiliation avec tracking des clics

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** (dark mode)
- **Prisma** avec SQLite
- **lucide-react** pour les icônes

## Installation

```bash
npm install
```

## Configuration

Copiez `.env.example` en `.env` et ajustez les valeurs :

```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_SITE_NAME="HotDeal - Bons Plans"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ADMIN_PASSWORD="votre_mot_de_passe_secret"
```

> ⚠️ **Important** : définissez `ADMIN_PASSWORD` avant de lancer le serveur. Sans ce paramètre, l'accès à `/admin` affiche un message de configuration.

## Configuration base de données

```bash
# Créer/mettre à jour le schéma
npx prisma migrate dev

# Générer le client Prisma
npx prisma generate

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
| `/admin/categories` | Gestion des catégories |
| `/admin/marchands` | Gestion des marchands |
| `/admin/offres` | Gestion des offres |

## Administration

### Accès

1. Ajoutez `ADMIN_PASSWORD=votre_mot_de_passe` dans `.env`
2. Redémarrez le serveur de développement
3. Accédez à [http://localhost:3000/admin](http://localhost:3000/admin)
4. Saisissez votre mot de passe

### Fonctionnalités admin

- **Tableau de bord** : statistiques globales (offres, catégories, marchands, clics, favoris)
- **Catégories** : créer, modifier, supprimer (avec icône emoji et couleur)
- **Marchands** : créer, modifier, supprimer (avec URL d'affiliation)
- **Offres** : créer, modifier, supprimer (avec lien d'affiliation, prix, image, expiration)

### Déconnexion

Cliquez sur « Déconnexion → » dans la barre de navigation admin, ou accédez directement à `/admin/login`.

## Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `DATABASE_URL` | Chemin vers la base SQLite | ✅ |
| `NEXT_PUBLIC_SITE_NAME` | Nom affiché du site | Non |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site | Non |
| `ADMIN_PASSWORD` | Mot de passe pour accéder à `/admin` | ✅ |

