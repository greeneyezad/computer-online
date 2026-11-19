const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function LauncherIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="kde-launcher-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4da3ff" />
          <stop offset="1" stopColor="#1a63c0" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="23" height="23" rx="6.5" fill="url(#kde-launcher-mark)" />
      <path
        d="M8.3 5.5v13M8.3 12.6l5.8-7.1M9.9 11.2l5.4 7.4"
        stroke="#ffffff"
        strokeWidth="2.1"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function FilesIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.4 6.2a2 2 0 0 1 2-2h4.1l2 2.3h9.1a2 2 0 0 1 2 2v9.1a2 2 0 0 1-2 2H4.4a2 2 0 0 1-2-2z"
        fill="#2f8fd0"
      />
      <path d="M2.4 9.3h19.2v8.3a2 2 0 0 1-2 2H4.4a2 2 0 0 1-2-2z" fill="#5cc0ef" />
      <path d="M2.4 9.3h19.2v1.1H2.4z" fill="#9ddcf7" opacity="0.75" />
    </svg>
  )
}

export function FolderIcon({ tone = '#5cc0ef' }: { tone?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M2.4 6.6a1.8 1.8 0 0 1 1.8-1.8h4.2l2 2.2h9.4a1.8 1.8 0 0 1 1.8 1.8v8.8a1.8 1.8 0 0 1-1.8 1.8H4.2a1.8 1.8 0 0 1-1.8-1.8z"
        fill={tone}
        opacity="0.85"
      />
      <path d="M2.4 9.4h19.2v8.2a1.8 1.8 0 0 1-1.8 1.8H4.2a1.8 1.8 0 0 1-1.8-1.8z" fill={tone} />
    </svg>
  )
}

export function TerminalIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1.6" y="2.8" width="20.8" height="18.4" rx="3" fill="#15181d" stroke="#5b6472" />
      <path
        d="M5.8 8.6 9.9 12l-4.1 3.4"
        fill="none"
        stroke="#57d38c"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12.3 15.6h5.4" stroke="#dfe5ec" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.48.48 0 0 0-.48.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96a.49.49 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2z"
        fill="#a9b4c2"
      />
    </svg>
  )
}

export function SpecIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 2.6h8.1l5 5v13.8h-13.1z" fill="#eef3f9" />
      <path d="M13.6 2.6l5 5h-5z" fill="#b9c6d4" />
      <path
        d="M8.2 10.6h7.6M8.2 13.4h7.6M8.2 16.2h5.2"
        stroke="#5a6b7d"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={1.5}>
      <path d="M4.6 6.6h14.8M9.6 6.6V4.7h4.8v1.9M6.6 6.6l.9 13h9l.9-13M10 10.2v6M14 10.2v6" />
    </svg>
  )
}

export function WifiIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M3.4 8.8a13 13 0 0 1 17.2 0M6.4 12.2a8.6 8.6 0 0 1 11.2 0M9.4 15.5a4.3 4.3 0 0 1 5.2 0" />
      <circle cx="12" cy="18.6" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function VolumeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9.4h3.2L12 5.2v13.6L7.2 14.6H4z" fill="currentColor" stroke="none" />
      <path d="M15.4 9.2a4 4 0 0 1 0 5.6M18.2 6.8a7.4 7.4 0 0 1 0 10.4" />
    </svg>
  )
}

export function BatteryIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="2.6" y="7.4" width="16.2" height="9.2" rx="2.2" />
      <rect x="4.4" y="9.2" width="10.6" height="5.6" rx="1" fill="currentColor" stroke="none" />
      <path d="M20.6 10.6v2.8" strokeLinecap="round" />
    </svg>
  )
}

export function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={2}>
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  )
}

export function ForwardIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={2}>
      <path d="M9.5 5.5 16 12l-6.5 6.5" />
    </svg>
  )
}

export function UpIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke} strokeWidth={2}>
      <path d="M12 18.5V6M6 11.5 12 5.5l6 6" />
    </svg>
  )
}

export function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="m15.4 15.4 4.2 4.2" />
    </svg>
  )
}

export function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <g fill="currentColor">
        <rect x="3.2" y="3.2" width="7.4" height="7.4" rx="1.8" />
        <rect x="13.4" y="3.2" width="7.4" height="7.4" rx="1.8" />
        <rect x="3.2" y="13.4" width="7.4" height="7.4" rx="1.8" />
        <rect x="13.4" y="13.4" width="7.4" height="7.4" rx="1.8" />
      </g>
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.8l5.9-.9z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LaptopIcon() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="laptop-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14233a" />
          <stop offset="1" stopColor="#0b1017" />
        </linearGradient>
      </defs>
      <rect x="9" y="10" width="46" height="32" rx="3" fill="#2a303a" stroke="#4b5563" strokeWidth="1.4" />
      <rect x="12.5" y="13.5" width="39" height="25" rx="1.5" fill="url(#laptop-screen)" />
      <path d="M12 46h40l4 6.5H8z" fill="#39414c" />
      <circle cx="32" cy="42.5" r="1.5" fill="#8b96a5" />
      <path d="M24 30.5c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="none" stroke="#4da3ff" strokeWidth="2" strokeLinecap="round" />
      <path d="M27.5 30.5a4.5 4.5 0 0 1 9 0" fill="none" stroke="#8ed6f5" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
