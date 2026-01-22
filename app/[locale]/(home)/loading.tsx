export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-primary-600 dark:border-primary-400 rounded-full animate-spin border-t-transparent absolute inset-0"></div>
      </div>
    </div>
  )
}
