export function BackgroundEffects() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200 dark:bg-sage-800/30 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage-300 dark:bg-sage-700/30 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-sage-100 dark:bg-sage-800/20 rounded-full blur-3xl opacity-20" />
    </div>
  )
}
