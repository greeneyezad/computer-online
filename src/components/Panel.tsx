import { useEffect, useState } from 'react'
import { appById, pinnedApps } from '../data/apps'
import { systemIdentity } from '../data/system'
import { BatteryIcon, LauncherIcon, VolumeIcon, WifiIcon } from '../icons'
import type { AppId } from '../types'
import './Panel.css'

interface Props {
  launcherOpen: boolean
  openApps: AppId[]
  onToggleLauncher: () => void
  onOpenApp: (id: AppId) => void
}

function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return now
}

export function Panel({ launcherOpen, openApps, onToggleLauncher, onOpenApp }: Props) {
  const now = useClock()
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short' })

  return (
    <footer className="panel">
      <button
        className={`panel-btn launcher-btn${launcherOpen ? ' is-active' : ''}`}
        onClick={onToggleLauncher}
        aria-label="Application launcher"
        aria-expanded={launcherOpen}
      >
        <LauncherIcon />
      </button>

      <span className="panel-sep" />

      {pinnedApps.map((id) => {
        const app = appById(id)
        return (
          <button
            key={id}
            className={`panel-btn${openApps.includes(id) ? ' is-open' : ''}`}
            onClick={() => onOpenApp(id)}
            title={app.name}
            aria-label={app.name}
          >
            {app.icon}
          </button>
        )
      })}

      <span className="panel-spacer" />

      <div className="tray" aria-label="System tray">
        <span className="tray-item" title="Wi-Fi 7 connected">
          <WifiIcon />
        </span>
        <span className="tray-item" title="Volume 74%">
          <VolumeIcon />
        </span>
        <span className="tray-item" title="Battery 86%">
          <BatteryIcon />
        </span>
      </div>

      <div className="clock" aria-label={`${date}, ${time}`}>
        <span className="clock-time">{time}</span>
        <span className="clock-date">{date}</span>
      </div>

      <span className="panel-show-desktop" title={systemIdentity.hostname} />
    </footer>
  )
}
