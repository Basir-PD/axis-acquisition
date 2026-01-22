import dynamic from 'next/dynamic'

const DynamicGoogleMap = dynamic(() => import('./GoogleMap'), {
  loading: () => (
    <div className="relative w-full opacity-80 h-[600px] rounded-lg overflow-hidden md:my-10 bg-gray-100 dark:bg-neutral-800 animate-pulse" />
  ),
  ssr: false,
})

export default DynamicGoogleMap
