import classNames from 'classnames'
import Button from '@/components/Widgets/Button'
import { useFormContext } from 'react-hook-form'

interface ModalFooterProps {
  hide: (status: string) => void
  cancelButtonText?: string
  cancelButtonClass?: string
  submitButtonText?: string
  submitButtonClass?: string
}

const ModalFooter: React.FC<ModalFooterProps> = ({
  cancelButtonText,
  cancelButtonClass,
  hide,
  submitButtonText,
  submitButtonClass,
}) => {
  const {
    formState: { isValid, isValidating },
  } = useFormContext()

  return (
    <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
      <Button
        type="submit"
        className={classNames(
          `px-4 py-2 w-full text-white ${submitButtonClass} sm:ml-3 sm:w-auto sm:text-sm`
        )}
        loading={!isValid}
        value={submitButtonText}
      ></Button>
      <Button
        className={classNames(
          `w-full px-4 py-2 mt-3 text-white ${cancelButtonClass} sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm`
        )}
        type="button"
        loading={false}
        value={cancelButtonText}
        onClick={() => hide('')}
      ></Button>
    </div>
  )
}

export default ModalFooter
