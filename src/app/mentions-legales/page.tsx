import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales | HotDeal',
  description: 'Mentions légales du site HotDeal - bons plans et promotions.',
}

export default function MentionsLegalesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotdeal.fr'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'HotDeal'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mentions légales</h1>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Éditeur du site</h2>
          <p>
            Le site <strong>{siteName}</strong> ({siteUrl}) est édité à titre personnel.
          </p>
          <p className="mt-2">
            Pour toute question, vous pouvez nous contacter via la page{' '}
            <a href="/contact" className="text-orange-500 hover:text-orange-600 underline">Contact</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Hébergement</h2>
          <p>
            Ce site est hébergé par un prestataire d&apos;hébergement professionnel. Les coordonnées de
            l&apos;hébergeur sont disponibles sur demande.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos, icônes) est la propriété de{' '}
            {siteName} ou est utilisé avec l&apos;autorisation de leurs détenteurs respectifs. Toute
            reproduction, même partielle, est strictement interdite sans autorisation préalable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Liens d&apos;affiliation</h2>
          <p>
            Certains liens présents sur ce site sont des <strong>liens d&apos;affiliation</strong>. Cela
            signifie que si vous effectuez un achat via ces liens, nous pouvons percevoir une commission,
            sans frais supplémentaires pour vous.
          </p>
          <p className="mt-2">
            Cette rémunération nous permet de maintenir le site gratuitement et de continuer à vous
            proposer des bons plans. Les offres sélectionnées et présentées restent objectives et
            indépendantes.
          </p>
          <p className="mt-2">
            Les marchands partenaires incluent notamment Amazon, Cdiscount, Fnac, Darty et La Redoute,
            ainsi que d&apos;autres enseignes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">5. Publicité</h2>
          <p>
            Ce site utilise Google AdSense pour afficher des publicités. Google peut utiliser des cookies
            pour personnaliser les annonces en fonction de vos visites sur ce site et d&apos;autres sites.
            Vous pouvez désactiver la personnalisation des annonces dans les{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              paramètres des annonces Google
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">6. Limitation de responsabilité</h2>
          <p>
            Les informations publiées sur ce site (prix, disponibilité des offres, conditions promotionnelles)
            sont fournies à titre indicatif et peuvent évoluer à tout moment. Nous ne pouvons être tenus
            responsables d&apos;éventuelles erreurs ou omissions.
          </p>
          <p className="mt-2">
            Les prix et la disponibilité des produits sont définis par les marchands partenaires et peuvent
            varier sans préavis.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">7. Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront
            seuls compétents.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
