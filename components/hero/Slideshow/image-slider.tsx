import React from 'react'
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import Autoplay from 'embla-carousel-autoplay'

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from '../../animations/EmblaCarouselArrowButtons'
import {
  DotButton,
  useDotButton,
} from '../../animations/EmblaCarouselDotButton'
import shimmer from './Shimmer'

type PropType = {
  slides: string[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [userHasInteracted, setUserHasInteracted] = React.useState(false)
  const autoplay = React.useMemo(
    () => Autoplay({ delay: 7000, stopOnInteraction: false }),
    [],
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      ...options,
      loop: true,
    },
    [ClassNames(), autoplay],
  )

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const handleUserInteraction = React.useCallback(() => {
    if (!userHasInteracted) {
      setUserHasInteracted(true)
      autoplay.stop()
    }
  }, [userHasInteracted, autoplay])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, handleUserInteraction)

  return (
    <div className="embla relative w-full h-full ro">
      <div className="embla__viewport absolute inset-0" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((imageUrl, index) => (
            <div
              className="embla__slide embla__class-names w-[90%]  h-[100%] relative"
              key={index}
            >
              <Image
                className="embla__slide__img rounded-xl object-cover object-top"
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                quality={75}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls absolute inset-0 flex items-center justify-between pointer-events-none">
        <div className="embla__buttons w-full flex justify-between px-4 pointer-events-auto">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>

      <div className="embla__dots absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => {
              onDotButtonClick(index)
              handleUserInteraction()
            }}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : '',
            )}
          />
        ))}
      </div>
    </div>
  )
}

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default EmblaCarousel
