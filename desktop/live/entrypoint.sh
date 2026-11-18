#!/bin/sh
set -eu

ISO_PATH="${ISO_PATH:-/data/debian-live-13.7.0-amd64-cinnamon.iso}"
ISO_URL="${ISO_URL:-https://cdimage.debian.org/debian-cd/current-live/amd64/iso-hybrid/debian-live-13.7.0-amd64-cinnamon.iso}"
STATUS_FILE=/data/status.json
NOVNC_ROOT="${NOVNC_ROOT:-/usr/share/novnc}"

mkdir -p /data
export NOVNC_ROOT

write_status() {
  printf '%s\n' "$1" > "$STATUS_FILE.tmp"
  mv "$STATUS_FILE.tmp" "$STATUS_FILE"
}

write_status '{"phase":"starting","received":0,"total":0}'

# 1. Status page + noVNC files are served immediately, so the preview shows
#    download/boot progress instead of an empty page.
node /app/server.mjs &
SERVER_PID=$!

# 2. Live ISO, cached in the /data volume across restarts.
if [ ! -s "$ISO_PATH" ]; then
  total=$(curl -sIL "$ISO_URL" | tr -d '\r' | awk 'tolower($1)=="content-length:"{v=$2} END{print v+0}')
  echo "Downloading $ISO_URL (${total:-unknown} bytes)"

  curl -L --fail --retry 3 --retry-delay 3 -o "$ISO_PATH.part" "$ISO_URL" &
  CURL_PID=$!

  while kill -0 "$CURL_PID" 2>/dev/null; do
    received=$(stat -c %s "$ISO_PATH.part" 2>/dev/null || echo 0)
    write_status "{\"phase\":\"downloading\",\"received\":$received,\"total\":${total:-0}}"
    sleep 2
  done

  if ! wait "$CURL_PID"; then
    echo "ISO download failed" >&2
    write_status '{"phase":"error","message":"The Debian live ISO could not be downloaded."}'
    wait "$SERVER_PID"
    exit 1
  fi

  mv "$ISO_PATH.part" "$ISO_PATH"
  echo "ISO ready at $ISO_PATH"
fi

# 3. WebSocket bridge first, then the virtual machine itself.
websockify 127.0.0.1:6080 127.0.0.1:5900 &
WS_PID=$!

write_status '{"phase":"booting","received":0,"total":0}'

qemu-system-x86_64 \
  -accel tcg,thread=multi \
  -machine pc \
  -smp 4 \
  -m 2560 \
  -device VGA,edid=on,xres=1920,yres=1200 \
  -cdrom "$ISO_PATH" \
  -boot d \
  -netdev user,id=net0 \
  -device e1000,netdev=net0 \
  -display none \
  -vnc 127.0.0.1:0 \
  -no-reboot &
QEMU_PID=$!

# 4. Ready once the VNC endpoint answers; the guest boots behind it.
while ! node -e "const s=require('net').connect(5900,'127.0.0.1');s.on('connect',()=>{s.end();process.exit(0)});s.on('error',()=>process.exit(1));setTimeout(()=>process.exit(1),1000)"; do
  if ! kill -0 "$QEMU_PID" 2>/dev/null; then
    write_status '{"phase":"error","message":"The virtual machine stopped unexpectedly."}'
    wait "$SERVER_PID"
    exit 1
  fi
  sleep 2
done

write_status '{"phase":"ready","received":0,"total":0}'
echo "VNC ready; live ISO is booting"

# Keep the container alive with the VM; restart the stack if it exits.
wait "$QEMU_PID"
kill "$WS_PID" "$SERVER_PID" 2>/dev/null || true
exit 1
