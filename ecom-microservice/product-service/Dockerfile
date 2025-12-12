
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Note: This runs on 3002
EXPOSE 3002

CMD ["node", "server.js"]