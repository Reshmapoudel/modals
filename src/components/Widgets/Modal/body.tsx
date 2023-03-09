import { ReactElement, useRef } from 'react'
import classNames from 'classnames'
import Loading from '../Loader/loading'
import { AnimatePresence, motion } from 'framer-motion'
import { Close } from '@material-ui/icons'
import { useForm } from 'react-hook-form'

interface ModalBodyProps {
  children?: ReactElement
}

const ModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return (
    <div className="px-4 pt-5 pb-5 bg-white sm:p-6 sm:pb-5">
      <div className="sm:flex-auto">
        <div className="mt-3 sm:mt-0 sm:ml-4 md:ml-0">{children}</div>
      </div>
    </div>
  )
}

export default ModalBody
