import dynamic from 'next/dynamic'

const DynamicTypeForm = dynamic(() => import('./index'), {
  loading: () => null,
  ssr: false,
})

export default DynamicTypeForm
