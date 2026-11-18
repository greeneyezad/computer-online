# Dell Precision 16s desktop (Debian 13.7)

This folder holds the reference assets for the Dell Precision 16s KDE Plasma
session: the wallpaper, the spec sheet and the machine identity. The preview on
host port 3000 is now the React recreation in `src/`; the Webtop container
described below is kept as the source of those assets and is no longer the
preview entry point.

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
