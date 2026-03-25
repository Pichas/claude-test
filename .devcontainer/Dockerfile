FROM debian:trixie

RUN apt update && apt dist-upgrade -y
RUN apt install -y wget git npm bash-completion nano vim locales libasound2

RUN update-locale "LANG=en_US.UTF-8" && locale-gen --purge "en_US.UTF-8" && dpkg-reconfigure --frontend noninteractive locales


ADD https://github.com/AndyMik90/Auto-Claude/releases/download/v2.7.6/Auto-Claude-2.7.6-linux-amd64.deb ac.deb
RUN apt install -y ac.deb && rm ac.deb
# use `auto-claude-ui --no-sandbox`  to run the UI 