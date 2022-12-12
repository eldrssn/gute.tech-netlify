FROM node:16.14.0-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps && npm cache clean --force

COPY . ./

COPY /app/node_modules ./node_modules

COPY docker/prod/entrypoint.sh /

RUN chmod +x /entrypoint.sh

RUN NODE_ENV=production npm run build

COPY /app/public ./public

COPY /app/.next/standalone ./
COPY /app/.next/static ./.next/static

ENTRYPOINT ["/entrypoint.sh"]

CMD ["node", "server.js"]