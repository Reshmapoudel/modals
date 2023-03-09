import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { quickPreviewVarient, subMenuAnimate } from '@/variants/dropDown'
import { subMenuTypes } from '@/types'
import classNames from 'classnames'

interface QuickPreviewProps {
  targetId: string
  options: subMenuTypes[]
  onClickHandel: (type: string, modal_name: string, action_type: string) => void
}

const QuickPreview = ({
  targetId,
  options,
  onClickHandel,
}: QuickPreviewProps) => {
  const [contextData, setContextData] = useState({
    visible: false,
    posX: 0,
    posY: 0,
  })
  const contextRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const contextMenuEventHandler = (event) => {
      const targetElement = document.getElementById(targetId)
      if (targetElement && targetElement.contains(event.target)) {
        // event.preventDefault()
        setContextData({
          visible: true,
          posX: event.clientX,
          posY: event.clientY,
        })
      } else if (
        contextRef.current &&
        !contextRef.current.contains(event.target)
      ) {
        setContextData({ ...contextData, visible: false })
      }
    }

    const offClickHandler = (event) => {
      if (contextRef.current && !contextRef.current.contains(event.target)) {
        setContextData({ ...contextData, visible: false })
      }
    }

    document.addEventListener('click', contextMenuEventHandler)
    document.addEventListener('click', offClickHandler)
    return () => {
      document.removeEventListener('click', contextMenuEventHandler)
      document.removeEventListener('click', offClickHandler)
    }
  }, [contextData, targetId])

  useLayoutEffect(() => {
    if (
      contextData.posX + contextRef?.current!.offsetWidth >
      window.innerWidth
    ) {
      setContextData({
        ...contextData,
        posX: contextData.posX - contextRef?.current!.offsetWidth,
      })
    }
    if (
      contextData.posY + contextRef?.current!.offsetHeight >
      window.innerHeight
    ) {
      setContextData({
        ...contextData,
        posY: contextData.posY - contextRef?.current!.offsetHeight,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      initial="exit"
      animate={contextData.visible ? 'enter' : 'exit'}
      variants={quickPreviewVarient}
      ref={contextRef}
      className="z-20"
      style={{
        position: 'absolute',
        display: `${contextData.visible ? 'block' : 'none'}`,
        left: '50%',
        top: '50%',
        boxShadow: '-1px 2px 7px 0px #888888',
        background: '#ffffff',
        borderRadius: '6px',
        width: 200,
      }}
    >
      <motion.div className={`py-1`}>
        <p>
          Just a simple dropdown menu that I am using in my project. I wanted to
          share it with you all because a lot of dropdown examples I searched
          for had some small issues.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default QuickPreview
