export const cardContainerVarients = {
  hidden: {
    opacity: 0,
    x: 1000,
  },
  visiable: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
}

export const cardContainerChildVarient = {
  hidden: {
    opacity: 0,
  },
  visiable: {
    opacity: 1,
  },
}
