import { useState } from 'react'

const ModalStatesHook = () => {
  const [showModal, setShowModal] = useState('')
  const [modalLoading, setModalLoading] = useState(false)
  return { showModal, setShowModal, modalLoading, setModalLoading }
}

export default ModalStatesHook
