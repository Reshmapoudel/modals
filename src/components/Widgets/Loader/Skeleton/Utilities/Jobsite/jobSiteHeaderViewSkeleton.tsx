import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

const JobSiteHeaderViewSkeleton: React.FC = () => {
  return (
    <Fragment>
      <div className="bg-white p-4">
        <div className=" w-56">
          <Skeleton width={'100%'} height={28} />
          <Skeleton width={'80%'} height={20} />
        </div>
        <div className="flex gap-4 w-full  items-center h-52 pt-4 pb-1">
          <div className="flex-none overflow-hidden w-3/12 h-full ">
            <Skeleton width={'100%'} height={262} />
          </div>
          <div className="grow overflow-hidden h-full w-full">
            <Skeleton width={'100%'} height={262} />
          </div>
          <div className="flex-none overflow-hidden w-2/12  h-full">
            <Skeleton width={'100%'} height={262} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default JobSiteHeaderViewSkeleton
