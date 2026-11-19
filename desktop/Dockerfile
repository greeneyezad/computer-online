FROM lscr.io/linuxserver/webtop:debian-kde

ENV DEBIAN_FRONTEND=noninteractive

# --- Debian 13.7 (trixie) amd64, fully upgraded -----------------------------
# Install the few desktop tools this machine ships with, then take the latest
# trixie point release so nothing is left upgradable.
RUN apt-get update \
 && apt-get -y install --no-install-recommends \
      htop \
      librsvg2-bin \
 && apt-get -y -o Dpkg::Options::="--force-confold" upgrade \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# --- Machine identity: Dell Precision 16s -----------------------------------
COPY machine-info /etc/machine-info
COPY precision-16s.svg /usr/share/precision-16s/precision-16s.svg
RUN rsvg-convert -w 1920 -h 1200 \
      /usr/share/precision-16s/precision-16s.svg \
      -o /usr/share/precision-16s/precision-16s.png

# Spec sheet on the desktop and a matching wallpaper for the KDE session.
COPY Precision-16s-Specs.txt /config/Desktop/Precision-16s-Specs.txt
COPY precision-wallpaper.desktop /config/.config/autostart/00-precision-wallpaper.desktop
RUN chown -R abc:abc /config/Desktop /config/.config/autostart
