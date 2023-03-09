import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

const JobSiteCardSkeleton: React.FC = () => {
  return (
    <Fragment>
      {[...Array(12)].map((x, i) => {
        return (
          <div
            key={x}
            className="border border-gray-200 rounded-md overflow-hidden"
          >
            <div className="-mt-1">
              <Skeleton width={'100%'} height={204} />
            </div>
            <div className="pt-2 pb-4 pl-4 pr-4">
              <Skeleton width={'80%'} />
              <div className="mt-1"></div>
              <Skeleton width={'30%'} />
            </div>
          </div>
        )
      })}
    </Fragment>
  )
}

export default JobSiteCardSkeleton
