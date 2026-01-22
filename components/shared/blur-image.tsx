'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React, { useState } from 'react'

interface IBlurImage {
  height?: number
  width?: number
  src?: string
  className?: string
  alt?: string
  fill?: boolean
  [x: string]: any
}

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  fill,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true)
  return (
    <Image
      className={clsx(
        'transition duration-300 transform',
        isLoading ? ' scale-105' : ' scale-100',
        className,
      )}
      onLoad={() => setLoading(false)}
      src={src || ''}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      alt={alt ? alt : 'Avatar'}
      {...rest}
    />
  )
}
