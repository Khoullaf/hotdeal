import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clean existing data
  await prisma.clickLog.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.offer.deleteMany()
  await prisma.category.deleteMany()
  await prisma.merchant.deleteMany()

  // Create categories
  const highTech = await prisma.category.create({
    data: { name: 'High-Tech', slug: 'high-tech', icon: '💻', color: '#3b82f6' }
  })
  const mode = await prisma.category.create({
    data: { name: 'Mode', slug: 'mode', icon: '👗', color: '#ec4899' }
  })
  const maison = await prisma.category.create({
    data: { name: 'Maison', slug: 'maison', icon: '🏠', color: '#22c55e' }
  })
  const alimentation = await prisma.category.create({
    data: { name: 'Alimentation', slug: 'alimentation', icon: '🍕', color: '#f97316' }
  })
  const voyages = await prisma.category.create({
    data: { name: 'Voyages', slug: 'voyages', icon: '✈️', color: '#8b5cf6' }
  })

  // Create merchants
  const amazon = await prisma.merchant.create({
    data: { name: 'Amazon', slug: 'amazon', website: 'https://amazon.fr', affiliateUrl: 'https://amazon.fr' }
  })
  const cdiscount = await prisma.merchant.create({
    data: { name: 'Cdiscount', slug: 'cdiscount', website: 'https://cdiscount.com', affiliateUrl: 'https://cdiscount.com' }
  })
  const fnac = await prisma.merchant.create({
    data: { name: 'Fnac', slug: 'fnac', website: 'https://fnac.com', affiliateUrl: 'https://fnac.com' }
  })
  const darty = await prisma.merchant.create({
    data: { name: 'Darty', slug: 'darty', website: 'https://darty.com', affiliateUrl: 'https://darty.com' }
  })
  const laRedoute = await prisma.merchant.create({
    data: { name: 'La Redoute', slug: 'la-redoute', website: 'https://laredoute.fr', affiliateUrl: 'https://laredoute.fr' }
  })

  const now = new Date()
  const in2days = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
  const in5days = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
  const in7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  // Create offers
  await prisma.offer.createMany({
    data: [
      {
        title: 'iPhone 15 Pro 256GB',
        description: "L'iPhone 15 Pro avec puce A17 Pro, titane, appareil photo 48MP. Le smartphone Apple le plus puissant jamais conçu.",
        originalPrice: 1329,
        discountPrice: 1099,
        discount: 17,
        affiliateUrl: 'https://amazon.fr',
        categoryId: highTech.id,
        merchantId: amazon.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in5days,
        clicks: 342,
        views: 1820
      },
      {
        title: 'Samsung Galaxy S24 128GB',
        description: 'Le dernier flagship Samsung avec intelligence artificielle intégrée, écran Dynamic AMOLED 2X 120Hz et appareil photo 50MP.',
        originalPrice: 899,
        discountPrice: 699,
        discount: 22,
        affiliateUrl: 'https://cdiscount.com',
        categoryId: highTech.id,
        merchantId: cdiscount.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in7days,
        clicks: 218,
        views: 1350
      },
      {
        title: 'MacBook Air M2 256GB',
        description: "MacBook Air avec puce Apple M2, 8 Go RAM, 256 Go SSD. Ultraléger, silencieux, jusqu'à 18h d'autonomie.",
        originalPrice: 1299,
        discountPrice: 1049,
        discount: 19,
        affiliateUrl: 'https://fnac.com',
        categoryId: highTech.id,
        merchantId: fnac.id,
        isFeatured: true,
        isActive: true,
        expiresAt: null,
        clicks: 289,
        views: 1640
      },
      {
        title: 'Sony WH-1000XM5 Casque Bluetooth',
        description: "Casque sans fil premium avec réduction de bruit active leader du marché, 30h d'autonomie, qualité audio exceptionnelle.",
        originalPrice: 380,
        discountPrice: 249,
        discount: 34,
        affiliateUrl: 'https://amazon.fr',
        categoryId: highTech.id,
        merchantId: amazon.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in2days,
        clicks: 156,
        views: 890
      },
      {
        title: 'AirPods Pro 2ème génération',
        description: "Écouteurs Apple avec réduction de bruit active, Audio Spatial personnalisé, résistance à l'eau IPX4.",
        originalPrice: 279,
        discountPrice: 199,
        discount: 29,
        affiliateUrl: 'https://fnac.com',
        categoryId: highTech.id,
        merchantId: fnac.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in7days,
        clicks: 198,
        views: 1120
      },
      {
        title: 'Samsung 55" QLED 4K Smart TV',
        description: 'Télévision QLED 4K 55 pouces, HDR10+, 100Hz, Smart TV Tizen, Compatible Alexa et Google Assistant.',
        originalPrice: 799,
        discountPrice: 549,
        discount: 31,
        affiliateUrl: 'https://darty.com',
        categoryId: highTech.id,
        merchantId: darty.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in5days,
        clicks: 267,
        views: 1480
      },
      {
        title: 'Nintendo Switch OLED',
        description: 'Console Nintendo Switch avec écran OLED 7 pouces, 64 Go stockage interne, dock TV, Joy-Con blanc.',
        originalPrice: 349,
        discountPrice: 279,
        discount: 20,
        affiliateUrl: 'https://amazon.fr',
        categoryId: highTech.id,
        merchantId: amazon.id,
        isFeatured: false,
        isActive: true,
        expiresAt: null,
        clicks: 134,
        views: 720
      },
      {
        title: 'Veste en cuir femme',
        description: 'Veste perfecto en cuir véritable, coupe ajustée, zips dorés, doublure rayée. Style rock chic indémodable.',
        originalPrice: 199,
        discountPrice: 89,
        discount: 55,
        affiliateUrl: 'https://laredoute.fr',
        categoryId: mode.id,
        merchantId: laRedoute.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in2days,
        clicks: 89,
        views: 560
      },
      {
        title: 'Baskets Nike Air Max 270',
        description: 'Chaussures de sport Nike Air Max 270, amorti Air Max visible, mesh respirant, plusieurs coloris disponibles.',
        originalPrice: 140,
        discountPrice: 79,
        discount: 44,
        affiliateUrl: 'https://amazon.fr',
        categoryId: mode.id,
        merchantId: amazon.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in7days,
        clicks: 112,
        views: 680
      },
      {
        title: "Robe d'été fleurie",
        description: "Robe légère imprimé fleuri, col V, manches courtes, longueur midi. Parfaite pour l'été, matière 100% viscose.",
        originalPrice: 79,
        discountPrice: 29,
        discount: 63,
        affiliateUrl: 'https://laredoute.fr',
        categoryId: mode.id,
        merchantId: laRedoute.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in5days,
        clicks: 67,
        views: 410
      },
      {
        title: 'Sac à main cuir femme',
        description: 'Sac à main en cuir véritable, fermeture zip, bandoulière amovible, nombreux compartiments. Coloris noir ou camel.',
        originalPrice: 159,
        discountPrice: 69,
        discount: 57,
        affiliateUrl: 'https://cdiscount.com',
        categoryId: mode.id,
        merchantId: cdiscount.id,
        isFeatured: false,
        isActive: true,
        expiresAt: null,
        clicks: 45,
        views: 320
      },
      {
        title: 'Robot cuiseur Thermomix TM6',
        description: 'Le robot multifonction Thermomix TM6 avec 22 fonctions, écran tactile, recettes guidées, pèse-aliments intégré.',
        originalPrice: 1359,
        discountPrice: 1199,
        discount: 12,
        affiliateUrl: 'https://darty.com',
        categoryId: maison.id,
        merchantId: darty.id,
        isFeatured: false,
        isActive: true,
        expiresAt: null,
        clicks: 78,
        views: 450
      },
      {
        title: 'Aspirateur Dyson V15 Detect',
        description: 'Aspirateur sans fil Dyson V15 Detect avec laser pour détecter la poussière invisible, autonomie 60 min, filtration HEPA.',
        originalPrice: 699,
        discountPrice: 499,
        discount: 29,
        affiliateUrl: 'https://amazon.fr',
        categoryId: maison.id,
        merchantId: amazon.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in7days,
        clicks: 156,
        views: 890
      },
      {
        title: 'Machine à café Nespresso Vertuo Pop',
        description: 'Cafetière Nespresso Vertuo Pop compacte, 5 tailles de tasses, extraction centrifusion, 27 secondes de chauffe.',
        originalPrice: 199,
        discountPrice: 99,
        discount: 50,
        affiliateUrl: 'https://fnac.com',
        categoryId: maison.id,
        merchantId: fnac.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in2days,
        clicks: 234,
        views: 1340
      },
      {
        title: 'Cafetière Krups Arabica',
        description: 'Cafetière filtre Krups Arabica 1,25L, 10-15 tasses, maintien au chaud, programmable, filtre permanent inclus.',
        originalPrice: 89,
        discountPrice: 49,
        discount: 45,
        affiliateUrl: 'https://cdiscount.com',
        categoryId: maison.id,
        merchantId: cdiscount.id,
        isFeatured: false,
        isActive: true,
        expiresAt: null,
        clicks: 89,
        views: 520
      },
      {
        title: "Pizza Domino's - Livraison offerte",
        description: 'Commandez 2 pizzas et la livraison est offerte ! Large choix de pizzas garnies, pâtes et desserts disponibles en ligne.',
        originalPrice: 30,
        discountPrice: 15,
        discount: 50,
        affiliateUrl: 'https://cdiscount.com',
        categoryId: alimentation.id,
        merchantId: cdiscount.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in2days,
        clicks: 45,
        views: 290
      },
      {
        title: 'HelloFresh Box repas 4 personnes',
        description: 'Box repas HelloFresh pour 4 personnes, 3 repas par semaine, ingrédients frais livrés, recettes faciles en 30 min.',
        originalPrice: 89,
        discountPrice: 39,
        discount: 56,
        affiliateUrl: 'https://amazon.fr',
        categoryId: alimentation.id,
        merchantId: amazon.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in5days,
        clicks: 123,
        views: 780
      },
      {
        title: 'Champagne Moët & Chandon Brut',
        description: 'Bouteille de Champagne Moët & Chandon Imperial Brut 75cl. Notes de poire, pêche blanche et brioche toastée.',
        originalPrice: 45,
        discountPrice: 29,
        discount: 36,
        affiliateUrl: 'https://amazon.fr',
        categoryId: alimentation.id,
        merchantId: amazon.id,
        isFeatured: false,
        isActive: true,
        expiresAt: null,
        clicks: 67,
        views: 430
      },
      {
        title: 'Café Nespresso x50 capsules Original',
        description: 'Pack de 50 capsules Nespresso Original compatibles, mélange Arpeggio intensité 9, arômes corsés et crémeux.',
        originalPrice: 25,
        discountPrice: 15,
        discount: 40,
        affiliateUrl: 'https://fnac.com',
        categoryId: alimentation.id,
        merchantId: fnac.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in7days,
        clicks: 89,
        views: 540
      },
      {
        title: 'Vol Paris-Barcelone aller-retour',
        description: "Billet d'avion Paris CDG - Barcelone El Prat aller-retour, bagage cabine inclus, plusieurs dates disponibles.",
        originalPrice: 189,
        discountPrice: 89,
        discount: 53,
        affiliateUrl: 'https://cdiscount.com',
        categoryId: voyages.id,
        merchantId: cdiscount.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in2days,
        clicks: 312,
        views: 1890
      },
      {
        title: "Hôtel 4* Côte d'Azur Nice",
        description: 'Séjour à Nice en hôtel 4 étoiles avec vue mer, petit-déjeuner inclus, piscine extérieure, spa. Min. 2 nuits.',
        originalPrice: 299,
        discountPrice: 149,
        discount: 50,
        affiliateUrl: 'https://laredoute.fr',
        categoryId: voyages.id,
        merchantId: laRedoute.id,
        isFeatured: false,
        isActive: true,
        expiresAt: in7days,
        clicks: 178,
        views: 1120
      },
      {
        title: 'Séjour tout inclus Maroc 7 nuits',
        description: "Séjour tout inclus à Agadir Maroc, 7 nuits en hôtel 5*, vols depuis Paris inclus, repas et boissons compris.",
        originalPrice: 899,
        discountPrice: 549,
        discount: 39,
        affiliateUrl: 'https://amazon.fr',
        categoryId: voyages.id,
        merchantId: amazon.id,
        isFeatured: true,
        isActive: true,
        expiresAt: in5days,
        clicks: 245,
        views: 1560
      }
    ]
  })

  console.log('✅ Base de données alimentée avec succès!')
  console.log('📦 5 catégories, 5 marchands, 22 offres créées.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
