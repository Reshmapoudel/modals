import { Fragment, ReactNode, useRef, MutableRefObject } from 'react'
import classNames from 'classnames'
import { SvgIconComponent } from '@material-ui/icons'
import { SvgIconTypeMap } from '@material-ui/core'

interface ButtonProps {
  className?: string
  loading?: boolean
  value: string | ReactNode
  refButton?: MutableRefObject<HTMLButtonElement | null>
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  className,
  loading,
  value,
  onClick,
  type,
  refButton,
}) => {
  return (
    <Fragment>
      <button
        ref={refButton}
        contentEditable={false}
        type={type}
        onClick={onClick}
        className={classNames(`${className} cursor-pointer`)}
        disabled={loading}
      >
        {value}
        {/* {loading ? 'Loading...' : value} */}
      </button>
    </Fragment>
  )
}

export default Button
