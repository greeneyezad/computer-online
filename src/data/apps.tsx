import type { ReactNode } from 'react'
import { FilesIcon, SettingsIcon, SpecIcon, TerminalIcon } from '../icons'
import type { AppId } from '../types'

export interface AppInfo {
  id: AppId
  name: string
  description: string
  icon: ReactNode
}

export const apps: AppInfo[] = [
  { id: 'files', name: 'Dolphin', description: 'File manager', icon: <FilesIcon /> },
  { id: 'terminal', name: 'Konsole', description: 'Terminal emulator', icon: <TerminalIcon /> },
  {
    id: 'settings',
    name: 'System Settings',
    description: 'About this system',
    icon: <SettingsIcon />,
  },
  {
    id: 'spec',
    name: 'Precision 16s Specs',
    description: 'Specification sheet',
    icon: <SpecIcon />,
  },
]

export const pinnedApps: AppId[] = ['files', 'terminal', 'settings', 'spec']

export function appById(id: AppId): AppInfo {
  return apps.find((app) => app.id === id) ?? apps[0]
}
