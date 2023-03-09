import Skeleton from 'react-loading-skeleton'
import { Fragment } from 'react'

interface HeaderProps {
  name: string | React.ReactNode
  field: string
  sortable: boolean
  width: string
}

interface HeaderArrayProps {
  headers: Array<HeaderProps>
}

const SkeletonDataTable: React.FC<HeaderArrayProps> = ({ headers }) => {
  return (
    <Fragment>
      {[...Array(10)].map((x, i) => {
        return (
          <tr key={i}>
            {headers.map((item, j) => {
              return item.field == 'id' ? (
                <td key={j}>
                  <div className="text-sm text-gray-500">
                    <Skeleton width={100} />
                  </div>
                </td>
              ) : item.field == 'action' ? (
                <td className=" w-11" key={j}>
                  <Skeleton height={32} width={45} />{' '}
                  <Skeleton height={32} width={106} />
                  {/* <br /> */}
                  {/* <Skeleton height={25} width={70} />{' '}
                  <Skeleton height={25} width={45} />
                  <br />
                  <Skeleton height={25} width={75} /> */}
                </td>
              ) : item.field == 'info' ? (
                <td key={j}>
                  <div className="text-sm text-gray-500">
                    <Skeleton width={70} />
                  </div>
                  <p>
                    <Skeleton width={200} />
                  </p>
                  <p>
                    <Skeleton width={150} />
                  </p>

                  <div className="mt-3 text-sm text-gray-500" key={j}>
                    <Skeleton width={90} />
                  </div>
                  <p>
                    <Skeleton width={150} />
                  </p>
                  <p>
                    <Skeleton width={100} />
                  </p>
                </td>
              ) : item.field == 'qr_code' ? (
                <td key={j}>
                  <div className="text-sm text-gray-500">
                    <Skeleton width={70} height={70} />
                  </div>
                </td>
              ) : item.field == 'status' ? (
                <td key={j}>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold ">
                      <Skeleton
                        width={100}
                        height={30}
                        style={{ borderRadius: 100 }}
                      />
                    </span>
                    <span className="text-xs ">
                      <Skeleton
                        width={150}
                        height={30}
                        style={{ borderRadius: 100 }}
                      />
                    </span>
                  </div>
                </td>
              ) : item.field == 'normal_status' ? (
                <td key={j}>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold ">
                      <Skeleton
                        width={100}
                        height={30}
                        style={{ borderRadius: 100 }}
                      />
                    </span>
                  </div>
                </td>
              ) : item.field == 'yes_no' ? (
                <td key={j}>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold ">
                      <Skeleton width={40} height={20} />
                    </span>
                  </div>
                </td>
              ) : item.field == 'name' ? (
                <td key={j}>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold ">
                      <Skeleton width={80} height={20} />
                    </span>
                  </div>
                </td>
              ) : item.field == 'date' ? (
                <td key={j}>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold ">
                      <Skeleton width={60} height={20} />
                    </span>
                  </div>
                </td>
              ) : item.field == 'checkbox' ? (
                <td key={j}>
                  <div className="text-sm text-gray-500">
                    <Skeleton width={20} height={20} />
                  </div>
                </td>
              ) : (
                <td key={j}>
                  <div className="text-sm text-gray-500">
                    <Skeleton width={180} />
                  </div>
                </td>
              )
            })}
          </tr>
        )
      })}
    </Fragment>
  )
}

export default SkeletonDataTable
