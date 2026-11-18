export interface SystemSpec {
  label: string
  value: string
  detail?: string
}

export const systemIdentity = {
  model: 'Dell Precision 16s',
  hostname: 'precision-16s',
  os: 'Debian GNU/Linux 13.7 (trixie)',
  arch: 'amd64',
  desktop: 'KDE Plasma',
  kernel: '6.12.38-amd64',
  session: '1920 × 1200 · 16:10 · 96 DPI',
}

export const systemSpecs: SystemSpec[] = [
  {
    label: 'Processor',
    value: 'Intel Core Ultra 5 336H',
    detail: '12 cores · up to 4.6 GHz · Intel AI Boost NPU, 47 TOPS',
  },
  { label: 'Memory', value: '32 GB LPCAMM2' },
  { label: 'Graphics', value: 'Intel integrated graphics' },
  { label: 'Storage', value: '512 GB NVMe SSD' },
  { label: 'Wireless', value: 'Wi-Fi 7 (802.11be)' },
  {
    label: 'Display',
    value: '16" WUXGA',
    detail: '1920 × 1200 (16:10)',
  },
]

export const sessionSpecs: SystemSpec[] = [
  { label: 'Operating system', value: systemIdentity.os, detail: systemIdentity.arch },
  { label: 'Desktop', value: systemIdentity.desktop },
  { label: 'Session display', value: systemIdentity.session },
  { label: 'Kernel', value: systemIdentity.kernel },
]
