/* eslint-disable react/no-unescaped-entities */
export const products = [
  {
    id: 0,
    title: 'Algochurn',
    description: (
      <>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Practice the most popular coding questions asked in a technical
          interview round.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Used by 1000+ registered users preparing for technical interviews.
        </p>
      </>
    ),
    link: 'https://algochurn.com',
    images: [
      '/images/products/algochurn.png',
      '/images/products/algochurn2.png',
    ],
  },
  {
    id: 1,
    title: 'Tailwind Master Kit',
    description: (
      <>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Get beautiful, responsive, professionally developed Tailwind UI
          components and build your website quicker
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Worry less about responsive and beautiful UI, let Tailwind Master Kit
          handle the complexity.
        </p>
      </>
    ),
    link: 'https://tailwindmasterkit.com',
    images: [
      '/images/products/tailwindmasterkit.png',
      '/images/products/tailwindmasterkit3.png',
    ],
  },

  {
    id: 3,
    title: 'Creme Digital',
    description: (
      <>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Commonsense solutions that achieve marketing objectives and reach
          business goals
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Since 2015, Creme Digital's solutions have supported brands from
          virtually every industry
        </p>
      </>
    ),
    link: 'https://cremedigital.com',
    images: [
      '/images/products/cremedigital3.png',
      '/images/products/cremedigital.png',
    ],
  },

  {
    id: 40,
    title: 'Invoker Labs',
    description: (
      <>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Delivering magical Web3 experiences with a wide range of products and
          services.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mt-4 leading-6">
          Flagship products include Nearsend, Nearblocks, nKYC and Route ag.
        </p>
      </>
    ),
    link: 'https://invoker.lol',
    images: ['/images/products/invoker.png', '/images/products/invoker2.png'],
  },
]
