# Dell Precision 16s desktop (Debian 13.7)

The preview on host port 3000 is a real Debian 13.7 (trixie) amd64 KDE Plasma
desktop, streamed from a LinuxServer Webtop container and sized to the
Precision's 16" WUXGA panel.

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- `desktop/Dockerfile` — starts from `lscr.io/linuxserver/webtop:debian-kde`,
  installs `htop`/`librsvg2-bin`, then runs `apt-get upgrade` so no package is
  left upgradable. Desktop assets and the machine identity are baked in here.
- `desktop/machine-info` — `/etc/machine-info` (Dell Inc. / Dell Precision 16s).
- `desktop/precision-16s.svg` → rendered to `/usr/share/precision-16s/precision-16s.png`
  at build time and applied as the KDE wallpaper by
  `desktop/precision-wallpaper.desktop` (`~/.config/autostart`).
- `desktop/Precision-16s-Specs.txt` — the spec sheet placed on the desktop.

Session display is locked to 1920×1200 (16:10, 96 DPI) through Selkies
(`SELKIES_MANUAL_RESOLUTION`, `SELKIES_MANUAL_WIDTH`, `SELKIES_MANUAL_HEIGHT`)
instead of the client-sized default. `~/.config` (the `/config` volume) holds
the KDE session; remove the `desktop-config` volume to reset the desktop.

Verify from inside the container:

```bash
cat /etc/debian_version            # 13.7
dpkg --print-architecture          # amd64
DISPLAY=:1 xrandr | head -2        # current 1920 x 1200
apt-get update && apt list --upgradable   # no packages upgradable; Debian + security repos reachable
```
