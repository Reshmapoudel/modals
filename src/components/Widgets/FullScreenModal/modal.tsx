import { RootState } from '@/redux/store'
import { sliderBottomBarVarient } from '@/variants/designTemplate'
import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loader/loading'

interface ModalProps {
  isShown?: boolean
  children?: ReactElement | ReactElement[]
  loading: boolean
}

const FullScreenModal: React.FC<ModalProps> = ({
  children,
  isShown,
  loading,
}) => {
  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isShown])
  return (
    <AnimatePresence exitBeforeEnter>
      {isShown && (
        <motion.div
          className={classNames(
            `fixed left-0  bottom-0 top-0 right-0   text-lg font-light bg-white w-full   z-50  shadow-2xl   `
          )}
          variants={sliderBottomBarVarient}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {loading && <Loading></Loading>}
          <Fragment>{children}</Fragment>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FullScreenModal
