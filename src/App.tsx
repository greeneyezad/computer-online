import { useCallback, useEffect, useRef, useState } from 'react'
import wallpaper from './assets/precision-16s.svg'
import { DesktopIcons } from './components/DesktopIcons'
import { LauncherMenu } from './components/LauncherMenu'
import { Panel } from './components/Panel'
import { Window } from './components/Window'
import { FilesWindow } from './components/windows/FilesWindow'
import { SettingsWindow } from './components/windows/SettingsWindow'
import { SpecWindow } from './components/windows/SpecWindow'
import { TerminalWindow } from './components/windows/TerminalWindow'
import { STAGE_HEIGHT, STAGE_WIDTH } from './constants'
import { appById } from './data/apps'
import { WINDOW_DEFAULTS } from './data/windows'
import type { AppId, WindowState } from './types'
import './App.css'

function fitScale() {
  return Math.min(window.innerWidth / STAGE_WIDTH, window.innerHeight / STAGE_HEIGHT)
}

export default function App() {
  const [scale, setScale] = useState(fitScale)
  const [windows, setWindows] = useState<WindowState[]>([])
  const [launcherOpen, setLauncherOpen] = useState(false)
  const zCounter = useRef(10)

  useEffect(() => {
    const update = () => setScale(fitScale())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    if (!launcherOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLauncherOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [launcherOpen])

  const focusWindow = useCallback((id: AppId) => {
    const z = (zCounter.current += 1)
    setWindows((previous) =>
      previous.map((win) => (win.id === id ? { ...win, z } : win)),
    )
  }, [])

  const openApp = useCallback((id: AppId) => {
    setLauncherOpen(false)
    const z = (zCounter.current += 1)

    setWindows((previous) => {
      if (previous.some((win) => win.id === id)) {
        return previous.map((win) => (win.id === id ? { ...win, z } : win))
      }

      const base = WINDOW_DEFAULTS[id]
      const offset = (previous.length % 4) * 26
      return [
        ...previous,
        {
          id,
          title: base.title,
          width: base.width,
          height: base.height,
          x: Math.min(base.x + offset, STAGE_WIDTH - base.width - 24),
          y: Math.min(base.y + offset, STAGE_HEIGHT - base.height - 96),
          z,
        },
      ]
    })
  }, [])

  const closeWindow = useCallback((id: AppId) => {
    setWindows((previous) => previous.filter((win) => win.id !== id))
  }, [])

  const moveWindow = useCallback((id: AppId, x: number, y: number) => {
    setWindows((previous) =>
      previous.map((win) => (win.id === id ? { ...win, x, y } : win)),
    )
  }, [])

  const focusedId = windows.reduce<WindowState | null>(
    (top, win) => (!top || win.z > top.z ? win : top),
    null,
  )?.id

  function renderContent(id: AppId) {
    switch (id) {
      case 'files':
        return <FilesWindow onOpenSpec={() => openApp('spec')} />
      case 'terminal':
        return <TerminalWindow />
      case 'settings':
        return <SettingsWindow />
      case 'spec':
        return <SpecWindow />
    }
  }

  return (
    <div className="desktop-shell">
      <div
        className="desktop-stage"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `translate(-50%, -50%) scale(${scale})`,
          backgroundImage: `url(${wallpaper})`,
        }}
      >
        <DesktopIcons onOpenSpec={() => openApp('spec')} />

        {windows.map((win) => (
          <Window
            key={win.id}
            win={win}
            focused={win.id === focusedId}
            scale={scale}
            icon={appById(win.id).icon}
            onFocus={focusWindow}
            onClose={closeWindow}
            onMove={moveWindow}
          >
            {renderContent(win.id)}
          </Window>
        ))}

        {launcherOpen && (
          <div className="launcher-scrim" onClick={() => setLauncherOpen(false)} />
        )}
        {launcherOpen && <LauncherMenu onOpenApp={openApp} />}

        <Panel
          launcherOpen={launcherOpen}
          openApps={windows.map((win) => win.id)}
          onToggleLauncher={() => setLauncherOpen((open) => !open)}
          onOpenApp={openApp}
        />
      </div>
    </div>
  )
}
