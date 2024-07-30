import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const elMainContainer = document.querySelector('.main-container')
      if (elMainContainer) {
        setScrollY(elMainContainer.scrollTop)
      }
    };

    const elMainContainer = document.querySelector('.main-container')
    if (elMainContainer) {
      elMainContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (elMainContainer) {
        elMainContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return scrollY
}

