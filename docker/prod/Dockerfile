FROM node:14.5.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps && npm cache clean --force

COPY . ./

COPY docker/prod/entrypoint.sh /

RUN chmod +x /entrypoint.sh

RUN NODE_ENV=production npm run build

ENTRYPOINT ["/entrypoint.sh"]
