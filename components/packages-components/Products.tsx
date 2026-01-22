import React from 'react'
import { Product } from './Product'
import { products } from '@/constants/products'

export const Products = () => {
  return (
    <div className="relative z-10">
      {products.map((product: any, idx: number) => (
        <Product key={`product-${idx}`} product={product} />
      ))}
    </div>
  )
}
