FROM node:lts-bullseye

RUN apt-get update && apt-get install -y --no-install-recommends \
    nano \
    screen \
    htop \
    bash

USER root

RUN npm -g install pnpm
# Entrypoint
COPY ./services/node /docker-files/
ENTRYPOINT ["/docker-files/docker-entrypoint.sh"]

RUN chmod +x /docker-files/docker-entrypoint.sh

USER node

WORKDIR /home/node/app

CMD ["node", "./build/app.mjs"]
