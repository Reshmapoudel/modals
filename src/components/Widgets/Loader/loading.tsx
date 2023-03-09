import { CircularProgress } from '@material-ui/core'
import { Fragment } from 'react'

interface LoadingProps {
  text?: string
}

const Loading: React.FC<LoadingProps> = ({}) => {
  return (
    <Fragment>
      <div className="fixed z-50 w-full h-full text-center bg-gray-800 opacity-50">
        <div className="fixed top-0 left-0 ">
          {/* <img src={image} className="fp-loader" alt="loading" /> */}
        </div>
      </div>
      <CircularProgress
        style={{
          zIndex: 25,
          color: '#bd0303',
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      />
    </Fragment>
  )
}

export default Loading
