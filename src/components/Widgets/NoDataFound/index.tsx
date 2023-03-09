import RtNoData from '@/public/images/no_data_found.svg'
import styles from 'components/Widgets/NoDataFound/index.module.css'
import classNames from 'classnames'
interface dataNotFound {
  text?: string
}
const NoDataFoundComponent: React.FC<dataNotFound> = ({ text }) => {
  return (
    <div
      className={classNames(
        ` flex-auto   mt-2 h-83
         ${styles['wrapper']}`
      )}
    >
      <div className="w-full mt-10 align-bottom h-96">
        {' '}
        <RtNoData className="justify-center mx-auto " />
        <p className="py-2 text-lg font-medium text-center text-gray-600 align-text-bottom">
          {text ? text : 'No Data Found !'}
        </p>
      </div>
    </div>
  )
}

export default NoDataFoundComponent
