import { useMemo, useState } from 'react'
import { apps } from '../data/apps'
import { systemIdentity } from '../data/system'
import { GridIcon, SearchIcon, StarIcon } from '../icons'
import type { AppId } from '../types'
import './LauncherMenu.css'

type Tab = 'favorites' | 'all'

export function LauncherMenu({ onOpenApp }: { onOpenApp: (id: AppId) => void }) {
  const [tab, setTab] = useState<Tab>('favorites')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return apps
    return apps.filter((app) => `${app.name} ${app.description}`.toLowerCase().includes(term))
  }, [query])

  const searching = query.trim().length > 0
  const showingFavorites = tab === 'favorites' && !searching

  return (
    <div className="launcher" role="dialog" aria-label="Application launcher">
      <div className="launcher-search">
        <SearchIcon />
        <input
          autoFocus
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search applications…"
          aria-label="Search applications"
        />
      </div>

      <div className="launcher-body">
        <nav className="launcher-rail">
          <button
            className={`launcher-tab${tab === 'favorites' ? ' is-active' : ''}`}
            onClick={() => setTab('favorites')}
          >
            <StarIcon />
            Favorites
          </button>
          <button
            className={`launcher-tab${tab === 'all' ? ' is-active' : ''}`}
            onClick={() => setTab('all')}
          >
            <GridIcon />
            All Applications
          </button>
        </nav>

        <div className="launcher-content">
          <h2 className="launcher-heading">
            {searching ? 'Search results' : showingFavorites ? 'Favorites' : 'All Applications'}
          </h2>

          {results.length === 0 && (
            <p className="launcher-empty">No applications match “{query.trim()}”.</p>
          )}

          {showingFavorites ? (
            <div className="launcher-grid">
              {results.map((app) => (
                <button key={app.id} className="launcher-tile" onClick={() => onOpenApp(app.id)}>
                  <span className="launcher-tile-icon">{app.icon}</span>
                  <span className="launcher-tile-text">
                    <span className="launcher-tile-name">{app.name}</span>
                    <span className="launcher-tile-desc">{app.description}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="launcher-list">
              {results.map((app) => (
                <button key={app.id} className="launcher-row" onClick={() => onOpenApp(app.id)}>
                  <span className="launcher-row-icon">{app.icon}</span>
                  <span className="launcher-row-text">
                    <span className="launcher-row-name">{app.name}</span>
                    <span className="launcher-row-desc">{app.description}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="launcher-footer">
        <span className="launcher-user">
          <span className="launcher-avatar">P</span>
          precision@{systemIdentity.hostname}
        </span>
        <span>
          {systemIdentity.desktop} · {systemIdentity.os.split(' (')[0]}
        </span>
      </div>
    </div>
  )
}
