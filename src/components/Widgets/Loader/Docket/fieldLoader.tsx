import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Fragment } from 'react'

const DocketFieldSkeletonLoader: React.FC = () => {
  return (
    <Fragment>
      {/* <SkeletonTheme color="#fff" highlightColor="#6c6c6c"> */}
      {[...Array(10)].map((x, i) => {
        return <Skeleton key={i} height={100} className="rounded-lg" />
      })}
      {/* </SkeletonTheme> */}
    </Fragment>
  )
}

export default DocketFieldSkeletonLoader
