import { Stethoscope } from 'lucide-react'
import { FormattedMessage } from 'react-intl'

export function EnterpriseHeader() {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-sage-700 dark:bg-sage-600 text-white rounded-full text-sm font-semibold mb-8 shadow-xl shadow-sage-500/20">
        <Stethoscope className="w-4 h-4" />
        <span>
          <FormattedMessage
            id="enterprise.badge"
            defaultMessage="Health Clinic Marketing Specialists"
          />
        </span>
      </div>

      <h2 className="font-serif text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sage-900 dark:text-cream-50 mb-6 leading-snug max-w-5xl mx-auto">
        <span className="block">
          <FormattedMessage
            id="enterprise.title.process"
            defaultMessage="We handle your marketing"
          />
        </span>
        <span className="block">
          <FormattedMessage
            id="enterprise.title.results"
            defaultMessage="so you can focus on"
          />
        </span>
        <span className="block bg-gradient-to-r from-sage-700 to-sage-500 dark:from-sage-400 dark:to-sage-300 bg-clip-text text-transparent">
          <FormattedMessage
            id="enterprise.title.extraordinary"
            defaultMessage="healing patients."
          />
        </span>
      </h2>

      <p className="text-lg sm:text-xl md:text-2xl text-stone-600 dark:text-stone-400 max-w-4xl mx-auto leading-relaxed px-4">
        <FormattedMessage
          id="enterprise.description"
          defaultMessage="Your expertise is integrative medicine. Ours is filling your schedule with high-quality patients who value holistic care. Let's work together."
        />
      </p>
    </>
  )
}
