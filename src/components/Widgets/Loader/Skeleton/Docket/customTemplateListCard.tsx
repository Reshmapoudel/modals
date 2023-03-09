import Skeleton from 'react-loading-skeleton'
import { Fragment } from 'react'

const CustomTemplateListCard: React.FC = () => {
  return (
    <Fragment>
      {[...Array(9)].map((x, i) => {
        return (
          <div className="border rounded-md overflow-hidden" key={x}>
            <div className="flex">
              <div className="w-42 h-42 flex-none bg-white pt-4 pl-4 pb-4 pr-4">
                <Skeleton width={'100%'} height={'100%'} />
              </div>

              <div className="grow  pt-4 pr-4">
                <div className="mb-1">
                  <Skeleton width={'100%'} />
                </div>
                <div className="rounded-sm">
                  <Skeleton width={'30%'} />
                </div>
                <div>
                  <Skeleton width={'50%'} />
                </div>
              </div>
            </div>
            <div className="flex flex-row text-center items-center content-center border-t mt-2 mb-1">
              <div className="w-1/3 pl-4">
                <Skeleton width={'100%'} height={28} />
              </div>
              <div className="w-1/3 pl-2 pr-2">
                <Skeleton width={'100%'} height={28} />
              </div>
              <div className="w-1/3 pr-4">
                <Skeleton width={'100%'} height={28} />
              </div>
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}
export default CustomTemplateListCard
