FROM debian:trixie

RUN apt update && apt install -y wget git npm bash-completion nano vim locales libasound2

ADD https://github.com/AndyMik90/Auto-Claude/releases/download/v2.7.6/Auto-Claude-2.7.6-linux-amd64.deb ac.deb
RUN apt install -y ./ac.deb && rm ./ac.deb && npm install -g @anthropic-ai/claude-code

# install github cli
RUN mkdir -p -m 755 /etc/apt/keyrings \
    && out=$(mktemp) && wget -nv -O$out https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    && cat $out |  tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
    &&  chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    &&  mkdir -p -m 755 /etc/apt/sources.list.d \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" |  tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    &&  apt update \
    &&  apt install gh -y

COPY .bashrc /root/.bashrc
RUN sed -i '/^#.* en_US.* /s/^#//' /etc/locale.gen && locale-gen

# 1. run `gh auth login`
# 2. run `auto-claude-ui --no-sandbox`  to run the UI


