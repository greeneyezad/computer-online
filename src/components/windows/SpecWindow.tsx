import specsText from '../../../desktop/Precision-16s-Specs.txt?raw'
import { SpecIcon } from '../../icons'
import './windows.css'

export function SpecWindow() {
  const lineCount = specsText.replace(/\n$/, '').split('\n').length

  return (
    <div className="spec">
      <div className="spec-tabbar">
        <span className="spec-tab">
          <SpecIcon />
          Precision-16s-Specs.txt
        </span>
      </div>
      <pre className="spec-text">{specsText}</pre>
      <div className="spec-status">
        <span>Plain text · UTF-8</span>
        <span>{lineCount} lines · 620 B</span>
      </div>
    </div>
  )
}
