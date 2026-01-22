import { MacbookScroll } from '@/components/macbook'

interface MacbookSectionProps {
  imageSrc?: string
  showGradient?: boolean
}

export const MacbookSection = ({
  imageSrc = '/images/qaslaptop.png',
  showGradient = true,
}: MacbookSectionProps) => {
  return (
    <div className="max-w-7xl mx-auto">
      <MacbookScroll src={imageSrc} showGradient={showGradient} />
    </div>
  )
}
