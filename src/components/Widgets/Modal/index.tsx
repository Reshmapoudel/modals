// import { ReactElement, useRef } from 'react'
// import classNames from 'classnames'
// import Button from 'components/Widgets/Button'
// import Loading from '../Loader/loading'
// import { AnimatePresence, motion } from 'framer-motion'
// import { Close } from '@material-ui/icons'
// import { useForm } from 'react-hook-form'

// interface ModalProps {
//   isShown?: boolean
//   isSubmit: boolean
//   submit?: (value) => void
//   hide: (status: string) => void
//   children?: ReactElement
//   title?: string
//   cancelButtonText?: string
//   cancelButtonClass?: string
//   submitButtonText?: string
//   submitButtonClass?: string
// }

// const backdrop = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0, transition: { ease: 'easeInOut' } },
// }

// const Modal: React.FC<ModalProps> = ({
//   children,
//   title,
//   submitButtonText,
//   submitButtonClass,
//   isShown,
//   hide,
//   isSubmit,
//   submit,
//   cancelButtonText,
//   cancelButtonClass,
// }) => {
//   return (
//     <AnimatePresence exitBeforeEnter>
//       {isShown && (
//         <motion.div
//           className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 "
//           variants={backdrop}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <div className="items-end justify-center flex-auto min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//             <div className="inline-block max-w-full my-32 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-sm shadow-xl sm:align-middle sm:w-3/6 ">
//               {isSubmit || !isShown ? <Loading></Loading> : null}
//               <div className="pt-2 pb-2 bg-rt-dark sm:p-3 sm:pb-3">
//                 <div className="flex items-start">
//                   <div className="flex-auto mt-2 sm:mt-0 sm:ml-2">
//                     <h3 className="font-medium leading-6 text-white text-md">
//                       {title}
//                     </h3>
//                   </div>
//                   <div className="flex-initial mt-2 sm:mt-0 sm:ml-4">
//                     <Button
//                       className={classNames(` text-white opacity-60 font-bold`)}
//                       loading={!isShown}
//                       value={<Close />}
//                       onClick={() => {
//                         hide('')
//                       }}
//                     ></Button>
//                   </div>
//                 </div>
//               </div>

//               {/* <form onSubmit={handleSubmit(submitForm!)}> */}
//               <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
//                 <div className="sm:flex-auto">
//                   <div className="mt-3 sm:mt-0 sm:ml-4 md:ml-0">{children}</div>
//                 </div>
//               </div>

//               {cancelButtonText || submitButtonText ? (
//                 <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
//                   {submitButtonText ? (
//                     <button
//                       className={classNames(
//                         `px-4 py-2 w-full text-white ${submitButtonClass} sm:ml-3 sm:w-auto sm:text-sm`
//                       )}
//                       type="submit"
//                       value={submitButtonText}
//                     >
//                       Submit
//                     </button>
//                   ) : null}

//                   {cancelButtonText ? (
//                     <Button
//                       className={classNames(
//                         `w-full px-4 py-2 mt-3 text-white ${cancelButtonClass} sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`
//                       )}
//                       loading={!isShown}
//                       value={cancelButtonText}
//                       onClick={() => {
//                         hide('')
//                       }}
//                     ></Button>
//                   ) : null}
//                 </div>
//               ) : null}
//               {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
//               {/* </form> */}
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default Modal

// import { Fragment, ReactElement, useRef } from 'react'
// import classNames from 'classnames'
// import Button from 'components/Widgets/Button'
// import Loading from '../Loader/loading'
// import { AnimatePresence, motion } from 'framer-motion'
// import { Close } from '@material-ui/icons'
// import { useForm, FormProvider } from 'react-hook-form'

// interface ModalProps {
//   isShown?: boolean
//   children?: ReactElement | ReactElement[]
//   submit?: (value) => void
// }

// const backdrop = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
//   exit: { opacity: 0, transition: { ease: 'easeInOut' } },
// }

// const Modal: React.FC<ModalProps> = ({ children, isShown, submit }) => {
//   const methods = useForm()
//   const { handleSubmit } = methods
//   return (
//     <AnimatePresence exitBeforeEnter>
//       {isShown && (
//         <motion.div
//           className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70 "
//           variants={backdrop}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           <div className="items-end justify-center flex-auto min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//             <div className="inline-block max-w-full my-32 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-sm shadow-xl sm:align-middle sm:w-3/6 ">
//               <FormProvider {...methods}>
//                 <form onSubmit={handleSubmit(submit!)}>
//                   <Fragment>{children}</Fragment>
//                 </form>
//               </FormProvider>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

// export default Modal

import Modal from './modal'
import ModalHeader from './header'
import ModalBody from './body'
import ModalFooter from './footer'
import ModalStates from './modalStates'

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalStates }
