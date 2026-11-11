import type { PointerEvent, ReactNode } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

/** Decorative perspective only; mouse input never gates access to content. */
export default function Tilt({ children, className = '', enabled = true }: { children: ReactNode; className?: string; enabled?: boolean }) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 140, damping: 23 })
  const rotateY = useSpring(y, { stiffness: 140, damping: 23 })
  const active = enabled && !reduced

  function move(event: PointerEvent<HTMLDivElement>) {
    if (!active || event.pointerType !== 'mouse') return
    const bounds = event.currentTarget.getBoundingClientRect()
    x.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -9)
    y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 11)
  }
  function reset() { x.set(0); y.set(0) }

  return <div className={`tilt-shell ${className}`} onPointerMove={move} onPointerLeave={reset}>
    <m.div className="tilt-surface" style={active ? { rotateX, rotateY } : undefined}>{children}</m.div>
  </div>
}
