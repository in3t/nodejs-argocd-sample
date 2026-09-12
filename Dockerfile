FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY app.js ./

ENV NODE_ENV=production
ENV PORT=8080

USER node
EXPOSE 8080

CMD ["npm", "start"]