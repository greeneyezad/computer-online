import fs from 'node:fs'
import http from 'node:http'
import net from 'node:net'
import path from 'node:path'

const PORT = Number(process.env.PORT ?? 3000)
const NOVNC_ROOT = process.env.NOVNC_ROOT ?? '/usr/share/novnc'
const STATUS_FILE = '/data/status.json'
const BOOT_PAGE = '/app/boot.html'
const WEBSOCKIFY_PORT = 6080

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function readStatus() {
  try {
    return JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'))
  } catch {
    return { phase: 'starting' }
  }
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      res.end('Not found')
      return
    }
    res.writeHead(200, {
      'content-type': MIME[path.extname(filePath)] ?? 'application/octet-stream',
      'cache-control': 'no-cache',
    })
    res.end(data)
  })
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')

  if (url.pathname === '/status') {
    res.writeHead(200, {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    })
    res.end(JSON.stringify(readStatus()))
    return
  }

  const status = readStatus()

  if (url.pathname === '/' || url.pathname === '/index.html') {
    if (status.phase !== 'ready') {
      res.writeHead(200, {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
      })
      res.end(fs.readFileSync(BOOT_PAGE))
      return
    }
    res.writeHead(302, {
      location: '/vnc.html?autoconnect=true&resize=scale&reconnect=true&reconnect_delay=2000',
    })
    res.end()
    return
  }

  const relative = path.normalize(decodeURIComponent(url.pathname)).replace(/^\/+/, '')
  if (relative.startsWith('..')) {
    res.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Forbidden')
    return
  }
  serveFile(res, path.join(NOVNC_ROOT, relative))
})

// noVNC connects to ws://<page host>/websockify; bridge that to the local
// websockify process, which speaks VNC to QEMU.
server.on('upgrade', (req, socket, head) => {
  if (readStatus().phase !== 'ready') {
    socket.destroy()
    return
  }

  const upstream = net.connect(WEBSOCKIFY_PORT, '127.0.0.1')
  upstream.on('connect', () => {
    const headers = []
    for (let i = 0; i < req.rawHeaders.length; i += 2) {
      headers.push(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]}`)
    }
    upstream.write(`GET ${req.url} HTTP/1.1\r\n${headers.join('\r\n')}\r\n\r\n`)
    if (head.length > 0) upstream.write(head)
    socket.pipe(upstream)
    upstream.pipe(socket)
  })
  upstream.on('error', () => socket.destroy())
  socket.on('error', () => upstream.destroy())
})

server.listen(PORT, '0.0.0.0', () => {
  console.log(`live desktop server on http://0.0.0.0:${PORT}`)
})
