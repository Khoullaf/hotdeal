import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité | HotDeal',
  description: 'Politique de confidentialité et protection des données personnelles du site HotDeal.',
}

export default function ConfidentialitePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hotdeal.fr'
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'HotDeal'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Politique de confidentialité
      </h1>

      <div className="prose dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
        <p>
          La présente politique de confidentialité décrit la manière dont {siteName} ({siteUrl}) collecte,
          utilise et protège vos données personnelles, conformément au Règlement Général sur la Protection
          des Données (RGPD) et à la loi Informatique et Libertés.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            1. Données collectées
          </h2>
          <p>Nous collectons les données suivantes :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées,
              durée de la visite (via les journaux serveur et les outils d&apos;analyse).
            </li>
            <li>
              <strong>Données de session</strong> : un identifiant de session anonyme stocké dans votre
              navigateur (localStorage) pour le suivi des clics et des favoris.
            </li>
            <li>
              <strong>Favoris</strong> : la liste des offres mises en favoris est stockée localement dans
              votre navigateur (localStorage). Ces données ne sont pas transmises à nos serveurs.
            </li>
          </ul>
          <p className="mt-2">
            Nous ne collectons pas de données d&apos;identification personnelle (nom, e-mail, adresse)
            sauf en cas de prise de contact volontaire via notre formulaire.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2. Finalités du traitement
          </h2>
          <p>Les données collectées sont utilisées pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Assurer le bon fonctionnement du site</li>
            <li>Analyser l&apos;audience et améliorer l&apos;expérience utilisateur</li>
            <li>Suivre les clics sur les liens d&apos;affiliation (à des fins statistiques)</li>
            <li>Afficher des publicités personnalisées via Google AdSense</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Cookies</h2>
          <p>Ce site utilise des cookies pour :</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Cookies fonctionnels</strong> : nécessaires au bon fonctionnement du site
              (préférences de thème, session).
            </li>
            <li>
              <strong>Cookies publicitaires (Google AdSense)</strong> : Google utilise des cookies pour
              afficher des annonces personnalisées en fonction de vos centres d&apos;intérêt. Ces cookies
              peuvent être désactivés dans les{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 underline"
              >
                paramètres des annonces Google
              </a>
              .
            </li>
          </ul>
          <p className="mt-2">
            Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines
            fonctionnalités du site pourraient ne plus fonctionner correctement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            4. Partage des données
          </h2>
          <p>
            Nous ne vendons pas vos données personnelles à des tiers. Vos données peuvent être partagées
            avec :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Google</strong> (AdSense, Analytics) pour les services de publicité et d&apos;analyse.
            </li>
            <li>
              <strong>Marchands partenaires</strong> (Amazon, Cdiscount, etc.) uniquement via les liens
              d&apos;affiliation lorsque vous cliquez sur une offre.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            5. Conservation des données
          </h2>
          <p>
            Les journaux de clics et données de navigation sont conservés pendant une durée maximale de
            13 mois, conformément aux recommandations de la CNIL.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            6. Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Droit d&apos;accès</li>
            <li>Droit de rectification</li>
            <li>Droit à l&apos;effacement (&quot;droit à l&apos;oubli&quot;)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité des données</li>
            <li>Droit d&apos;opposition</li>
          </ul>
          <p className="mt-2">
            Pour exercer ces droits, contactez-nous via notre{' '}
            <a href="/contact" className="text-orange-500 hover:text-orange-600 underline">
              page de contact
            </a>
            .
          </p>
          <p className="mt-2">
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation
            auprès de la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              CNIL
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            7. Modifications de cette politique
          </h2>
          <p>
            Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
            Les modifications entrent en vigueur dès leur publication sur cette page.
          </p>
        </section>

        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
