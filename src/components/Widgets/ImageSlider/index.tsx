import { ImageSliderVariant } from '@/variants/mainLayout'
import { Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Fragment, ReactNode, useEffect, useState } from 'react'

interface Slides {
  url: string
  title?: string
  desc?: string | ReactNode
}
interface SliderProps {
  slides: Slides[]
  showdesc?: boolean
  className?: string
}

const ImageSlider: React.FC<SliderProps> = ({
  slides,
  showdesc,
  className,
}) => {
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [slideEvent, setSlideEvent] = useState(false)
  const [movingDirection, setMovingDirection] = useState('right')

  const resetSlideEvent = () => {
    setTimeout(() => {
      setSlideEvent(false)
    }, 500)
  }

  const getCurrIndex = () => {
    return currIndex
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const travelForth = () => {
    const newidx = currIndex === slides.length - 1 ? 0 : currIndex + 1
    setMovingDirection('right')
    setCurrIndex(newidx)
  }

  const travelBack = () => {
    const newidx = currIndex === 0 ? slides.length - 1 : currIndex - 1
    setCurrIndex(newidx)
  }

  const travelto = (id: number) => {
    setCurrIndex(id)
  }

  useEffect(() => {
    const sliderid = setInterval(travelForth, 6000)

    return () => {
      clearInterval(sliderid)
    }
  }, [travelForth])

  return (
    <Fragment>
      <div className="relative flex flex-row flex-wrap w-full h-full justify-center items-center overflow-hidden ">
        {slides.map((slide, idx) => {
          return (
            <motion.div
              key={idx}
              variants={ImageSliderVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={
                currIndex === idx
                  ? 'w-full h-full overflow-hidden z-0 '
                  : ' overflow-hidden ' + ' absolute '
              }
            >
              {
                // <Transition
                //   key={idx}
                //   appear={false}
                //   unmount={false}
                //   show={currIndex === idx}
                //   enter="transform transition ease-in-out duration-500"
                //   enterFrom={
                //     movingDirection === 'right'
                //       ? 'translate-x-full opacity-0'
                //       : '-translate-x-full opacity-0'
                //   }
                //   enterTo={'translate-x-0 opacity-100'}
                //   leave="transform transition ease-in-out duration-500"
                //   leaveFrom={`translate-x-0 opacity-100`}
                //   leaveTo={
                //     movingDirection === 'right'
                //       ? `-translate-x-full opacity-0`
                //       : `translate-x-full opacity-0`
                //   }
                //   className={
                //     currIndex === idx
                //       ? 'w-full h-full overflow-hidden z-0 '
                //       : ' overflow-hidden ' + ' absolute '
                //   }
                //   as="div"
                // >
              }
              <div
                className={`relative w-full h-full flex flex-row justify-center items-center content-center ${className} bg-center bg-no-repeat `}
              >
                {showdesc ? (
                  <div className="absolute flex flex-col gap-2 justify-center items-center p-8 ">
                    <Image
                      className="py-2 "
                      src={`${slides[getCurrIndex()].url}`}
                      alt={slide.title}
                      height="269"
                      width="448"
                    />
                    <div className="font-semibold text-xl py-1 ">
                      {slide.title}
                    </div>
                    <div className="text-sm px-4">{slide.desc}</div>
                  </div>
                ) : (
                  <Fragment />
                )}
              </div>
            </motion.div>
          )
        })}

        <div className="absolute flex flex-auto justify-center bottom-6 ">
          {slides.map((_, idx) => {
            return (
              <div
                className="mx-1.5 text-base hover:cursor-pointer "
                key={idx}
                onClick={() => {
                  // check if slide is right or left
                  idx >= currIndex
                    ? setMovingDirection('right')
                    : setMovingDirection('left')
                  setCurrIndex(idx)
                }}
              >
                {idx === currIndex ? (
                  <span>●</span>
                ) : (
                  <span className="text-gray-400 ">●</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default ImageSlider
