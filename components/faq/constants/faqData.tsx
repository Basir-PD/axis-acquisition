import {
  Calendar,
  Clock,
  CreditCard,
  FlaskConical,
  HeartPulse,
  Leaf,
  Shield,
  Stethoscope,
} from 'lucide-react'
import type { FAQData } from '../types'

export const useFaqData = (): FAQData[] => {
  return [
    {
      id: 'what-is-integrative',
      question:
        'What is integrative medicine and how is it different from conventional medicine?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            Integrative medicine combines the best of conventional Western
            medicine with evidence-based complementary therapies to treat the
            whole person — body, mind, and spirit.
          </p>
          <p className="mb-6">
            Unlike conventional medicine which often focuses on managing
            symptoms, we dig deeper to find and address the root causes of your
            health concerns. We use advanced diagnostic testing, nutrition,
            lifestyle modifications, and natural therapies alongside
            conventional treatments when appropriate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                Conventional Approach
              </h6>
              <ul className="text-sm space-y-1 text-stone-600 dark:text-stone-400">
                <li>• Symptom-focused treatment</li>
                <li>• Primarily pharmaceutical</li>
                <li>• Standardized protocols</li>
                <li>• Shorter appointments</li>
              </ul>
            </div>
            <div className="p-4 bg-sage-100 dark:bg-sage-800/50 rounded-lg border border-sage-300 dark:border-sage-600">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                Our Integrative Approach
              </h6>
              <ul className="text-sm space-y-1 text-stone-600 dark:text-stone-400">
                <li>• Root cause analysis</li>
                <li>• Multiple healing modalities</li>
                <li>• Personalized treatment plans</li>
                <li>• 60-90 minute consultations</li>
              </ul>
            </div>
          </div>
        </>
      ),
      icon: <Stethoscope className="w-5 h-5" />,
    },
    {
      id: 'conditions-treated',
      question: 'What conditions do you treat?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            We specialize in complex, chronic conditions that often don&apos;t
            respond well to conventional treatment alone. Our integrative
            approach is particularly effective for:
          </p>
          <div className="p-6 bg-sage-50 dark:bg-sage-800/30 rounded-xl border border-sage-200 dark:border-sage-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Chronic Fatigue & Low Energy',
                'Hormonal Imbalances',
                'Thyroid Disorders',
                'Digestive Issues (IBS, SIBO, etc.)',
                'Autoimmune Conditions',
                'Anxiety & Depression',
                'Weight Management',
                'Chronic Pain & Inflammation',
                'Sleep Disorders',
                'Metabolic Syndrome',
                'Adrenal Dysfunction',
                'Brain Fog & Memory Issues',
              ].map((condition, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                  <span className="text-stone-700 dark:text-stone-300">
                    {condition}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 font-medium">
            Don&apos;t see your condition listed? Schedule a free discovery call
            — we likely can help or refer you to the right specialist.
          </p>
        </>
      ),
      icon: <HeartPulse className="w-5 h-5" />,
    },
    {
      id: 'first-visit',
      question: 'What should I expect at my first visit?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            Your first visit is a comprehensive 90-minute consultation designed
            to understand your complete health picture. Here&apos;s what you can
            expect:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                Before Your Visit
              </h6>
              <p className="text-stone-600 dark:text-stone-400">
                You&apos;ll complete detailed intake forms covering your medical
                history, lifestyle, diet, sleep patterns, and health goals.
                Bring any recent lab work or medical records.
              </p>
            </div>
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                During Your Visit
              </h6>
              <p className="text-stone-600 dark:text-stone-400">
                We&apos;ll conduct a thorough health history review, discuss
                your symptoms and concerns, perform relevant physical
                assessments, and may order specialized functional lab testing.
              </p>
            </div>
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                After Your Visit
              </h6>
              <p className="text-stone-600 dark:text-stone-400">
                You&apos;ll receive a personalized treatment plan with specific
                recommendations, access to our patient portal, and a follow-up
                appointment to review any lab results.
              </p>
            </div>
          </div>
        </>
      ),
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: 'how-long-results',
      question: 'How long until I see results?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            Every patient is unique, but most people begin noticing improvements
            within the first 4-6 weeks of following their treatment plan.
          </p>
          <p className="mb-6">
            Some conditions that have developed over many years may take longer
            to fully resolve. We focus on sustainable, lasting results rather
            than quick fixes that don&apos;t address underlying issues.
          </p>
          <div className="p-6 bg-gradient-to-r from-sage-50 to-sage-100 dark:from-sage-800/30 dark:to-sage-800/50 rounded-lg border border-sage-200 dark:border-sage-700">
            <h6 className="font-bold text-lg text-sage-700 dark:text-sage-300 mb-4">
              Typical Timeline
            </h6>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sage-600 dark:text-sage-400 w-24">
                  Weeks 1-2:
                </span>
                <span className="text-stone-600 dark:text-stone-400">
                  Initial improvements in energy and sleep
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sage-600 dark:text-sage-400 w-24">
                  Weeks 4-6:
                </span>
                <span className="text-stone-600 dark:text-stone-400">
                  Noticeable symptom reduction
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sage-600 dark:text-sage-400 w-24">
                  Months 2-3:
                </span>
                <span className="text-stone-600 dark:text-stone-400">
                  Significant health improvements
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sage-600 dark:text-sage-400 w-24">
                  Months 3-6:
                </span>
                <span className="text-stone-600 dark:text-stone-400">
                  Sustained wellness and optimization
                </span>
              </div>
            </div>
          </div>
        </>
      ),
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: 'insurance-payment',
      question: 'Do you accept insurance? How does payment work?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            We operate as an out-of-network provider, which allows us to spend
            more time with each patient and offer services that insurance
            typically doesn&apos;t cover.
          </p>
          <p className="mb-6">
            Many patients find that their insurance will reimburse a portion of
            their visit costs. We provide superbills (detailed receipts) that
            you can submit to your insurance for potential reimbursement.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                Payment Options
              </h6>
              <ul className="text-sm space-y-1 text-stone-600 dark:text-stone-400">
                <li>• Credit/Debit Cards</li>
                <li>• HSA/FSA Accounts</li>
                <li>• Payment Plans Available</li>
                <li>• CareCredit Financing</li>
              </ul>
            </div>
            <div className="p-4 bg-sage-50 dark:bg-sage-800/30 rounded-lg border border-sage-200 dark:border-sage-700">
              <h6 className="font-semibold mb-2 text-sage-700 dark:text-sage-300">
                Insurance Support
              </h6>
              <ul className="text-sm space-y-1 text-stone-600 dark:text-stone-400">
                <li>• Superbills Provided</li>
                <li>• Reimbursement Assistance</li>
                <li>• Benefits Verification</li>
                <li>• Dedicated Billing Team</li>
              </ul>
            </div>
          </div>
          <p className="mt-6 p-4 bg-sage-600 dark:bg-sage-700 text-white rounded-lg font-medium">
            Your first discovery call is always FREE — no payment or insurance
            needed to get started.
          </p>
        </>
      ),
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 'lab-testing',
      question: 'What kind of lab testing do you offer?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            We utilize advanced functional medicine testing that goes far beyond
            standard lab panels. These tests help us identify the root causes of
            your symptoms at a cellular and biochemical level.
          </p>
          <div className="p-6 bg-sage-50 dark:bg-sage-800/30 rounded-xl border border-sage-200 dark:border-sage-700">
            <h6 className="font-semibold mb-4 text-sage-700 dark:text-sage-300">
              Our Advanced Testing Includes:
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Comprehensive Hormone Panels',
                'Thyroid Complete (with antibodies)',
                'Gut Microbiome Analysis',
                'Food Sensitivity Testing',
                'Organic Acids Testing',
                'Genetic Health Analysis',
                'Heavy Metal & Toxin Panels',
                'Nutrient Deficiency Panels',
                'Inflammation Markers',
                'Adrenal Function Testing',
              ].map((test, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-sage-500" />
                  <span className="text-stone-700 dark:text-stone-300">
                    {test}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 font-medium">
            Testing recommendations are personalized based on your symptoms,
            history, and health goals. We only order tests that will
            meaningfully impact your treatment plan.
          </p>
        </>
      ),
      icon: <FlaskConical className="w-5 h-5" />,
    },
    {
      id: 'natural-treatments',
      question:
        'Are natural treatments safe? Will they interact with my medications?',
      answer: (
        <>
          <p className="mb-4 font-medium">
            Yes, when prescribed by trained practitioners, natural therapies are
            both safe and effective. Our physicians are extensively trained in
            herb-drug and nutrient-drug interactions.
          </p>
          <p className="mb-6">
            We always review your complete medication list before recommending
            any natural therapies. Our goal is to complement your existing care,
            not replace necessary medications without proper medical
            supervision.
          </p>
          <div className="p-6 bg-sage-50 dark:bg-sage-800/30 rounded-xl border border-sage-200 dark:border-sage-700">
            <h6 className="font-semibold mb-3 text-sage-700 dark:text-sage-300">
              Our Safety Protocols:
            </h6>
            <ul className="space-y-2 text-stone-600 dark:text-stone-300">
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                <span>
                  Complete medication review before any supplement
                  recommendations
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                <span>Evidence-based dosing protocols</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                <span>Pharmaceutical-grade supplements only</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-sage-500 mt-0.5 flex-shrink-0" />
                <span>Coordination with your other healthcare providers</span>
              </li>
            </ul>
          </div>
        </>
      ),
      icon: <Leaf className="w-5 h-5" />,
    },
    {
      id: 'guarantee',
      question: "What if integrative medicine doesn't work for me?",
      answer: (
        <>
          <p className="mb-4 font-medium">
            We stand behind our care with a 30-day satisfaction guarantee on our
            Comprehensive Wellness and Total Transformation packages.
          </p>
          <p className="mb-6">
            If you&apos;re not seeing progress or don&apos;t feel our approach
            is right for you within the first 30 days, we&apos;ll work with you
            to adjust your treatment plan or provide a full refund of your
            initial investment.
          </p>
          <div className="p-6 bg-gradient-to-r from-sage-100 to-sage-200 dark:from-sage-800/50 dark:to-sage-700/50 rounded-lg border border-sage-300 dark:border-sage-600 text-center">
            <Shield className="w-12 h-12 text-sage-600 dark:text-sage-400 mx-auto mb-3" />
            <h6 className="font-bold text-xl text-sage-800 dark:text-sage-200 mb-2">
              30-Day Satisfaction Guarantee
            </h6>
            <p className="text-stone-600 dark:text-stone-300">
              Your health transformation is our priority. We&apos;re committed
              to your success.
            </p>
          </div>
          <p className="mt-6 font-medium">
            Schedule a free discovery call to discuss whether our approach is
            right for your specific health concerns — with zero risk or
            obligation.
          </p>
        </>
      ),
      icon: <Shield className="w-5 h-5" />,
    },
  ]
}
