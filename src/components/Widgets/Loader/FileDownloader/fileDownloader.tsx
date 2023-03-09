import classNames from 'classnames'
import { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'

interface FileLoaderProps {
  className?: string
  items: number
}

const FileLoader: React.FC<FileLoaderProps> = ({ items }) => {
  return (
    <Fragment>
      {Array(items)
        .fill(0)
        .map((item, index) => {
          return (
            <div
              key={index}
              className={
                'flex flex-col items-center justify-center cursor-pointer gap-3'
              }
              style={{ width: 100 }}
            >
              <div className="relative ">
                <Skeleton height={90} width={80} />
                <Skeleton
                  width={96}
                  className={classNames(
                    `absolute rounded-sm shadow-md  w-26 h-7 top-1/2 -left-2`
                  )}
                />
              </div>
              <Skeleton height={20} width={80} />
            </div>
          )
        })}
    </Fragment>
  )
}

export default FileLoader
