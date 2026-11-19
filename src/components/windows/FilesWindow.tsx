import { useState } from 'react'
import {
  BackIcon,
  FolderIcon,
  ForwardIcon,
  SearchIcon,
  SpecIcon,
  TrashIcon,
  UpIcon,
} from '../../icons'
import './windows.css'

const places = [
  { label: 'Home', icon: <FolderIcon tone="#8fb8e0" /> },
  { label: 'Desktop', icon: <FolderIcon tone="#5cc0ef" />, active: true },
  { label: 'Documents', icon: <FolderIcon tone="#8fb8e0" /> },
  { label: 'Downloads', icon: <FolderIcon tone="#8fb8e0" /> },
  { label: 'Trash', icon: <TrashIcon /> },
]

const files = [
  { name: 'Precision-16s-Specs.txt', size: '620 B', modified: '18 Nov 2026, 09:41' },
]

export function FilesWindow({ onOpenSpec }: { onOpenSpec: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const term = query.trim().toLowerCase()
  const visible = files.filter((file) => file.name.toLowerCase().includes(term))

  return (
    <div className="files">
      <div className="files-toolbar">
        <button className="icon-btn" disabled aria-label="Back">
          <BackIcon />
        </button>
        <button className="icon-btn" disabled aria-label="Forward">
          <ForwardIcon />
        </button>
        <button className="icon-btn" disabled aria-label="Up">
          <UpIcon />
        </button>

        <div className="files-path">
          <span>Home</span>
          <span className="files-path-sep">›</span>
          <span>precision</span>
          <span className="files-path-sep">›</span>
          <span className="files-path-current">Desktop</span>
        </div>

        <label className="files-search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter files"
            aria-label="Filter files"
          />
        </label>
      </div>

      <div className="files-main">
        <nav className="files-sidebar" aria-label="Places">
          <p className="files-sidebar-title">Places</p>
          {places.map((place) => (
            <div
              key={place.label}
              className={`files-place${place.active ? ' is-active' : ''}`}
              aria-current={place.active ? 'page' : undefined}
            >
              <span className="files-place-icon">{place.icon}</span>
              {place.label}
            </div>
          ))}
        </nav>

        <div className="files-list">
          <div className="files-head">
            <span>Name</span>
            <span>Size</span>
            <span>Modified</span>
          </div>

          <div className="files-rows">
            {visible.map((file) => (
              <button
                key={file.name}
                className={`files-row${selected === file.name ? ' is-selected' : ''}`}
                onClick={() => setSelected(file.name)}
                onDoubleClick={onOpenSpec}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') onOpenSpec()
                }}
                title="Double-click to open in Kate"
              >
                <span className="files-name">
                  <SpecIcon />
                  <span>{file.name}</span>
                </span>
                <span className="files-size">{file.size}</span>
                <span className="files-date">{file.modified}</span>
              </button>
            ))}

            {visible.length === 0 && <p className="files-empty">No items match this filter.</p>}
          </div>

          <div className="files-status">
            <span>{visible.length} item</span>
            <span>Free space: 412.6 GiB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
