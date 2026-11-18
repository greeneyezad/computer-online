export type AppId = 'files' | 'terminal' | 'settings' | 'spec'

export interface WindowRect {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowState extends WindowRect {
  id: AppId
  title: string
  z: number
}
