FROM node:lts-alpine

WORKDIR /app

# Copy all package.json files first
COPY package*.json ./
COPY client/package*.json client/
COPY server/package*.json server/

# Install dependencies for root, client, and server
# RUN npm install

RUN npm run install-client --prefix client --only=production
RUN npm run install-server --prefix server --only=production

# Copy source files after installing dependencies
COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000
