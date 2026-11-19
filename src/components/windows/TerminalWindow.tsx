import { useEffect, useRef, useState, type FormEvent } from 'react'
import specsText from '../../../desktop/Precision-16s-Specs.txt?raw'
import './windows.css'

const prompt = 'precision@precision-16s'

const fastfetch = [
  '        .---.        precision@precision-16s',
  '       /     \\       ------------------------',
  '      | () () |      OS: Debian GNU/Linux 13.7 (trixie) amd64',
  '       \\  ^  /       Host: Dell Precision 16s',
  '        |||||        Kernel: 6.12.38-amd64',
  '        |||||        Desktop: KDE Plasma',
  '                     CPU: Intel Core Ultra 5 336H (12) @ 4.6 GHz',
  '                     NPU: Intel AI Boost — 47 TOPS',
  '                     Memory: 32 GB LPCAMM2',
  '                     Disk: 512 GB NVMe SSD',
  '                     Display: 16" WUXGA (1920x1200)',
]

const help = [
  'Available commands:',
  '  fastfetch                     system information',
  '  ls                            list files in this directory',
  '  cat Precision-16s-Specs.txt   print the specification sheet',
  '  uname -a                      kernel details',
  '  whoami, pwd                   session details',
  '  clear                         clear the terminal',
]

type LineKind = 'output' | 'command' | 'dim'

interface Line {
  kind: LineKind
  text: string
}

const initialLines: Line[] = [
  { kind: 'dim', text: 'Last login: Wed Nov 18 19:02:14 2026 on pts/0' },
  { kind: 'command', text: 'fastfetch' },
  ...fastfetch.map((text): Line => ({ kind: 'output', text })),
]

function runCommand(command: string): Line[] | 'clear' {
  const trimmed = command.trim()
  if (!trimmed) return []

  switch (trimmed) {
    case 'help':
      return help.map((text) => ({ kind: 'output', text }))
    case 'fastfetch':
    case 'neofetch':
      return fastfetch.map((text) => ({ kind: 'output', text }))
    case 'ls':
      return [{ kind: 'output', text: 'Precision-16s-Specs.txt' }]
    case 'cat Precision-16s-Specs.txt':
      return specsText.split('\n').map((text) => ({ kind: 'output', text }))
    case 'uname -a':
      return [
        {
          kind: 'output',
          text: 'Linux precision-16s 6.12.38-amd64 #1 SMP Debian 6.12.38-1 (2026-09-20) x86_64 GNU/Linux',
        },
      ]
    case 'whoami':
      return [{ kind: 'output', text: 'precision' }]
    case 'pwd':
      return [{ kind: 'output', text: '/home/precision' }]
    case 'clear':
      return 'clear'
    default:
      return [{ kind: 'output', text: `bash: ${trimmed}: command not found` }]
  }
}

export function TerminalWindow() {
  const [lines, setLines] = useState<Line[]>(initialLines)
  const [value, setValue] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const element = scrollRef.current
    if (element) element.scrollTop = element.scrollHeight
  }, [lines])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = runCommand(value)

    if (result === 'clear') {
      setLines([])
    } else if (result.length > 0) {
      setLines((previous) => [
        ...previous,
        { kind: 'command', text: value.trim() },
        ...result,
      ])
    }

    setValue('')
  }

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term-scroll" ref={scrollRef}>
        {lines.map((line, index) => (
          <div key={index} className={`term-line${line.kind === 'dim' ? ' is-dim' : ''}`}>
            {line.kind === 'command' ? (
              <>
                <span className="term-user">{prompt}</span>
                <span className="term-path">:~$</span> {line.text}
              </>
            ) : (
              line.text
            )}
          </div>
        ))}

        <form className="term-form" onSubmit={submit}>
          <span className="term-user">{prompt}</span>
          <span className="term-path">:~$</span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            aria-label="Terminal input"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
        </form>
      </div>
    </div>
  )
}
