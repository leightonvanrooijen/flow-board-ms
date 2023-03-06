FROM node:16.15.0

# node may come with an outdated npm version - ensure we have the latest version
RUN npm install -g npm@8.5.5

RUN apt-get update && \
    apt-get upgrade -y
