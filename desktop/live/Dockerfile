FROM node:22-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive

# QEMU runs the Debian live ISO; noVNC/websockify stream its VNC output to the
# browser. No KVM is available in this sandbox, so QEMU uses TCG.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      qemu-system-x86 \
      novnc \
      websockify \
      curl \
      ca-certificates \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY server.mjs boot.html entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

ENV ISO_URL=https://cdimage.debian.org/debian-cd/current-live/amd64/iso-hybrid/debian-live-13.7.0-amd64-cinnamon.iso
ENV ISO_PATH=/data/debian-live-13.7.0-amd64-cinnamon.iso
ENV NOVNC_ROOT=/usr/share/novnc

EXPOSE 3000
ENTRYPOINT ["/app/entrypoint.sh"]
