FROM node:18
WORKDIR /app
# Dependencies install panna
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
