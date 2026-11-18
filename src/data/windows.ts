import type { AppId } from '../types'

interface WindowDefaults {
  title: string
  width: number
  height: number
  x: number
  y: number
}

export const WINDOW_DEFAULTS: Record<AppId, WindowDefaults> = {
  files: { title: 'Dolphin — Desktop', width: 900, height: 560, x: 300, y: 150 },
  terminal: {
    title: 'precision@precision-16s: ~ — Konsole',
    width: 780,
    height: 460,
    x: 820,
    y: 600,
  },
  settings: { title: 'System Settings', width: 880, height: 620, x: 520, y: 120 },
  spec: { title: 'Precision-16s-Specs.txt — Kate', width: 720, height: 540, x: 400, y: 200 },
}
