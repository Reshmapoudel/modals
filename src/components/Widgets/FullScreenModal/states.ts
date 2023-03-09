import { useState } from 'react'

const FullScreenModalStatesHook = () => {
  const [showFullScreenModal, setShowFullScreenModal] = useState('')
  const [fullScreenModalLoading, setfullScreenModalLoading] = useState(false)
  return {
    showFullScreenModal,
    setShowFullScreenModal,
    fullScreenModalLoading,
    setfullScreenModalLoading,
  }
}

export default FullScreenModalStatesHook
