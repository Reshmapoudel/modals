import { Fragment, ReactElement, useEffect } from 'react'
import Loading from '../Loader/loading'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm, FormProvider, useFieldArray } from 'react-hook-form'
import classNames from 'classnames'

interface ModalProps {
  isShown?: boolean
  children?: ReactElement | ReactElement[]
  loading: boolean
  className?: string
  submit?: (value) => void
}

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { ease: 'easeInOut' } },
}

const Modal: React.FC<ModalProps> = ({
  children,
  isShown,
  submit,
  className,
  loading,
}) => {
  const methods = useForm({ mode: 'all' })
  const { handleSubmit, reset } = methods
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
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 "
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="items-end justify-center flex-auto min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className={classNames(
                'inline-block w-full my-32 text-left align-bottom transition-all transform bg-white rounded-sm shadow-xl sm:align-middle sm:w-3/6 ',
                className
              )}
            >
              {loading && <Loading></Loading>}
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(submit!)}>
                  <Fragment>{children}</Fragment>
                </form>
              </FormProvider>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
