import React from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

interface SubmitButtonProps {
  isSubmitting: boolean
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isSubmitting }) => {
  return (
    <div className="pt-4">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 text-lg font-semibold bg-sage-600 hover:bg-sage-700 dark:bg-sage-600 dark:hover:bg-sage-500 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-0 shadow-lg shadow-sage-500/20 hover:shadow-xl hover:shadow-sage-500/30 group"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
            Sending...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>Book Your Free Strategy Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </Button>
    </div>
  )
}
