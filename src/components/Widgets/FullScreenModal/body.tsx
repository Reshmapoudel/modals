import React, { Fragment, ReactElement } from 'react'

interface ModalBodyProps {
  children?: ReactElement
}

const FullScreenModalBody: React.FC<ModalBodyProps> = ({ children }) => {
  return <div className="h-screen overflow-hidden shadow-2xl">{children}</div>
}
export default FullScreenModalBody
