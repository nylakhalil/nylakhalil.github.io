FROM node:16-alpine

RUN apk update && \
    apk upgrade

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY src ./src
COPY public ./public
COPY tsconfig.json ./tsconfig.json

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
