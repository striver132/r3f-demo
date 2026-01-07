import { useEffect, useRef } from 'react'
import { Vector2 } from 'three'

export function useMouseParallax(strength = 0.3) {
  const target = useRef(new Vector2(0, 0))
  const current = useRef(new Vector2(0, 0))

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      target.current.set(x * strength, y * strength)
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [strength])

  const update = (lerp = 0.1) => {
    current.current.lerp(target.current, lerp)
    return current.current
  }

  return update
}