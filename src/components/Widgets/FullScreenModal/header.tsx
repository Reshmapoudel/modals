import { ReactElement } from 'react'
import classNames from 'classnames'
import { Close } from '@material-ui/icons'
import Button from '@/components/Widgets/Button'

interface ModalHeaderProps {
  hide: (status: string) => void
  title: string
  colorCode?: string
}

const FullScreenModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  hide,
  colorCode,
}) => {
  return (
    <div
      style={{
        background: colorCode === undefined ? '#f6a42b' : colorCode,
      }}
      className={classNames(`flex px-4 py-4 text-white`)}
    >
      <div className="flex-auto mt-2 sm:mt-0 sm:ml-4">
        <h3 className="">{title}</h3>
      </div>
      <div className="flex-initial mt-2 sm:mt-0 sm:ml-4">
        <Button
          className={classNames(`opacity-60 font-bold`)}
          loading={false}
          value={<Close />}
          onClick={() => hide('')}
        ></Button>
      </div>
    </div>
  )
}

export default FullScreenModalHeader
