import { ReactElement } from 'react'
import classNames from 'classnames'
import { Close } from '@material-ui/icons'
import Button from '@/components/Widgets/Button'
import { useDispatch } from 'react-redux'

interface ModalHeaderProps {
  hide: (status: string) => void
  title: string
  logo?: string | ReactElement
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ logo, title, hide }) => {
  return (
    <div className="pt-2 pb-2 bg-rt-dark sm:p-3 sm:pb-3">
      <div className="flex items-center justify-center mx-2 mt-2 sm:mt-0">
        <div className="flex-auto ">
          <h3
            className="font-medium leading-6 text-white text-md"
            data-testid="modalHeadingH3"
          >
            {logo ? logo : null} {title}
          </h3>
        </div>
        <div className="flex-initial ">
          <Button
            className={classNames(` text-white opacity-60 font-bold`)}
            loading={false}
            type="button"
            value={<Close />}
            onClick={() => hide('')}
          ></Button>
        </div>
      </div>
    </div>
  )
}

export default ModalHeader
