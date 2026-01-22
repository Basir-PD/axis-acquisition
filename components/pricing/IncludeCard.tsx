import { Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function IncludeCard() {
  const features = {
    column1: [
      'Mobile responsive design',
      'Google Analytics integration',
      'CRM integration',
    ],
    column2: [
      'Fast loading code',
      'Video and sound embeds',
      'CMS integration ready',
    ],
    column3: ['Search engine friendly', 'Contact form'],
  }

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 ">
        <div className="space-y-4">
          {features.column1.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-5 w-5 dark:text-gray-300 text-gray-700 mt-0.5 flex-shrink-0" />
              <span className="text-base dark:text-gray-300 text-gray-700">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {features.column2.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-5 w-5 dark:text-gray-300 text-gray-700 mt-0.5 flex-shrink-0" />
              <span className="text-base dark:text-gray-300 text-gray-700">
                {feature}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {features.column3.map((feature, index) => (
            <div key={index} className="flex items-start space-x-2">
              <Check className="h-5 w-5 dark:text-gray-300 text-gray-700 mt-0.5 flex-shrink-0" />
              <span className="text-base dark:text-gray-300 text-gray-700">
                {feature}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
