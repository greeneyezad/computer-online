import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { STAGE_HEIGHT, STAGE_WIDTH } from '../constants'
import type { AppId, WindowState } from '../types'
import './Window.css'

const MIN_VISIBLE = 200

interface Props {
  win: WindowState
  focused: boolean
  scale: number
  icon: ReactNode
  onFocus: (id: AppId) => void
  onClose: (id: AppId) => void
  onMove: (id: AppId, x: number, y: number) => void
  children: ReactNode
}

interface DragState {
  pointerId: number
  startX: number
  startY: number
  originX: number
  originY: number
}

export function Window({ win, focused, scale, icon, onFocus, onClose, onMove, children }: Props) {
  const drag = useRef<DragState | null>(null)
  const [dragging, setDragging] = useState(false)

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return
    onFocus(win.id)
    drag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: win.x,
      originY: win.y,
    }
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // Pointer capture can fail when the pointer is already released; dragging
      // still works from the move events while the cursor stays on the titlebar.
    }
    setDragging(true)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const current = drag.current
    if (!current || current.pointerId !== event.pointerId) return

    const x = current.originX + (event.clientX - current.startX) / scale
    const y = current.originY + (event.clientY - current.startY) / scale

    onMove(
      win.id,
      Math.min(Math.max(x, MIN_VISIBLE - win.width), STAGE_WIDTH - MIN_VISIBLE),
      Math.min(Math.max(y, 0), STAGE_HEIGHT - 120),
    )
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag.current?.pointerId !== event.pointerId) return
    drag.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      className={`kwin${focused ? ' is-focused' : ''}${dragging ? ' is-dragging' : ''}`}
      style={{ left: win.x, top: win.y, width: win.width, height: win.height, zIndex: win.z }}
      onPointerDown={() => onFocus(win.id)}
      aria-label={win.title}
    >
      <header
        className="kwin-titlebar"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={() => onFocus(win.id)}
      >
        <span className="kwin-icon">{icon}</span>
        <span className="kwin-title">{win.title}</span>
        <button
          className="kwin-close"
          aria-label={`Close ${win.title}`}
          onClick={() => onClose(win.id)}
          onPointerDown={(event) => event.stopPropagation()}
        >
          ×
        </button>
      </header>
      <div className="kwin-body">{children}</div>
    </section>
  )
}
