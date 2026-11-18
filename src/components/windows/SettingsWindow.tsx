import { LaptopIcon } from '../../icons'
import { sessionSpecs, systemIdentity, systemSpecs } from '../../data/system'
import './windows.css'

const categories = [
  'Appearance',
  'Workspace',
  'Workspace Behavior',
  'Window Management',
  'Shortcuts',
  'Startup and Shutdown',
  'User Feedback',
  'About this System',
]

export function SettingsWindow() {
  return (
    <div className="settings">
      <nav className="settings-nav" aria-label="System Settings categories">
        <p className="settings-nav-title">System Settings</p>
        {categories.map((category) => (
          <div
            key={category}
            className={`settings-nav-item${category === 'About this System' ? ' is-active' : ''}`}
            aria-current={category === 'About this System' ? 'page' : undefined}
          >
            {category}
          </div>
        ))}
      </nav>

      <div className="settings-content">
        <div className="about-head">
          <span className="about-device">
            <LaptopIcon />
          </span>
          <div>
            <h2 className="about-title">{systemIdentity.model}</h2>
            <p className="about-sub">
              {systemIdentity.os} · {systemIdentity.arch} · {systemIdentity.desktop}
            </p>
          </div>
        </div>

        <div className="about-grid">
          {systemSpecs.map((spec) => (
            <div className="about-field" key={spec.label}>
              <p className="about-field-label">{spec.label}</p>
              <p className="about-field-value">{spec.value}</p>
              {spec.detail && <p className="about-field-detail">{spec.detail}</p>}
            </div>
          ))}
        </div>

        <div className="about-foot">
          {sessionSpecs.map((spec) => (
            <span key={spec.label}>
              {spec.label}: {spec.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
