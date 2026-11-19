import { SpecIcon } from '../icons'
import './DesktopIcons.css'

export function DesktopIcons({ onOpenSpec }: { onOpenSpec: () => void }) {
  return (
    <div className="desktop-icons">
      <button
        className="desktop-icon"
        onClick={onOpenSpec}
        title="Open Precision-16s-Specs.txt"
      >
        <span className="desktop-icon-art">
          <SpecIcon />
        </span>
        <span className="desktop-icon-label">Precision-16s-Specs.txt</span>
      </button>
    </div>
  )
}
