const easing = [0.6, -0.05, 0.01, 0.99]

export const sliderLeftVarient = {
  hidden: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
  visible: {
    opacity: 1,
    x: -500,
    transition: { duration: 0.8 },
  },
}

export const sliderRightVarient = {
  hidden: {
    opacity: 1,
    x: -500,
    display: 'hidden',
    transition: { duration: 0.8 },
  },
  visible: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: { duration: 0.8 },
  },
}

export const buttonWaveVariants = {
  hidden: {
    boxShadow: '0 0 0 0 rgb(0, 63, 103)',
  },
  visible: {
    boxShadow: '0 0 0 15px rgba(0, 0, 0, 0)',
    transition: {
      duration: 2,
      delay: 0.2,
      repeat: Infinity,
    },
  },
  exit: {
    opacity: '0 0 0 0 rgb(0, 0, 0, 0)',
  },
}

export const secondLayerbuttonWaveVariants = {
  hidden: {
    boxShadow: '0 0 0 0 rgb(0, 63, 103)',
  },
  visible: {
    boxShadow: '0 0 0 15px rgba(0, 0, 0, 0)',
    transition: {
      duration: 2,
      delay: 0.8,
      repeat: Infinity,
    },
  },
  exit: {
    opacity: '0 0 0 0 rgb(0, 0, 0, 0)',
  },
}

export const addElementVarient = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', mass: 0.2, damping: 9 },
  },
}

export const sliderRightBarVarient = {
  hidden: {
    opacity: 1,
    x: 500,
    display: 'hidden',
    transition: { duration: 0.8 },
  },
  visible: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: { duration: 0.8 },
  },
}

export const sliderBottomBarVarient = {
  hidden: {
    opacity: 1,
    y: 1500,
    display: 'hidden',
    transition: { duration: 0.8 },
  },
  visible: {
    opacity: 1,
    y: 0,
    display: 'block',
    transition: { duration: 0.8 },
  },
  exit: {
    opacity: 1,
    y: 1500,
    display: 'hidden',
    transition: { duration: 0.8 },
  },
}

export const elementFocusButtonVarient = {
  hidden: {
    opacity: 0,
    y: '30px',
    display: 'hidden',
    transition: { duration: 0.3, ease: easing },
  },
  visible: {
    y: 0,
    opacity: 1,
    display: 'block',
    // boxShadow: 'none',
    transition: { duration: 0.3, ease: easing },
  },
}

export const elementYesNoFocusButtonVarient = {
  hidden: {
    opacity: 0,
    y: '100px',
    display: 'hidden',
    transition: { duration: 0.3, ease: easing },
  },
  visible: {
    y: 0,
    opacity: 1,
    display: 'block',
    transition: { duration: 0.3, ease: easing },
  },
}

export const variants = {
  card: {
    // zIndex: 1000000,
    // whileHover: {
    //   scale: 1.03,
    // },
    whileTap: {
      scale: 1.015,
      // rotate: 1,
    },
  },
}

// export const hoverVisiable = {
//   hidden: {
//     opacity: 0,
//     display: 'hidden',
//   },
//   visible: {
//     opacity: 1,
//     whileHover: {
//       scale: 1,
//       display: 'block',
//     },
//   },
// }

export const hoverVisiableChild = {
  hidden: { opacity: 0.0 },
  show: { opacity: 1 },
}

export const hoverVisiableParent = {
  hidden: { x: 0 },
  show: { x: 0 },
}

// export const textMotion = {
//   rest: {
//     opacity: 0,
//     display: 'hidden',
//     transition: {
//       duration: 0.4,
//       type: 'tween',
//       ease: 'easeIn',
//     },
//   },
//   hover: {
//     opacity: 1,
//     display: 'block',
//     transition: {
//       duration: 0.4,
//       type: 'tween',
//       ease: 'easeOut',
//     },
//   },
// }

// export const slashMotion = {
//   rest: {
//     opacity: 1,
//     display: 'hidden',
//     ease: 'easeOut',
//     duration: 2,
//     type: 'tween',
//   },
//   hover: {
//     opacity: 1,
//     transition: {
//       duration: 0.4,
//       type: 'tween',
//       ease: 'easeIn',
//     },
//   },
// }
