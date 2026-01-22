import { Question } from '../AIAutomationTypeForm/questions'
import universalQuestions from '@/data/universal-services-questions.json'

export function useTranslatedQuestions(): Question[] {
  // Transform the JSON questions into the Question type with dynamic translations
  return universalQuestions.questions.map((q: any) => {
    const baseQuestion: Question = {
      id: q.id,
      type: q.type,
      question: q.question,
      isRequired: q.isRequired ?? false,
    }

    // Add optional fields if they exist
    if (q.placeholder) {
      baseQuestion.placeholder = q.placeholder
    }

    if (q.description) {
      baseQuestion.description = q.description
    }

    if (q.options) {
      baseQuestion.options = q.options
    }

    if (q.validation) {
      baseQuestion.validation = q.validation
    }

    if (q.hasOther !== undefined) {
      baseQuestion.hasOther = q.hasOther
    }

    if (q.highlight) {
      baseQuestion.highlight = q.highlight
    }

    if (q.submitButton) {
      baseQuestion.submitButton = q.submitButton
    }

    return baseQuestion
  })
}
