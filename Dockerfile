FROM node:24-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev \
    && npm cache clean --force

COPY --chown=node:node index.js ./

USER node

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/health | grep -q '^OK$' || exit 1

CMD ["node", "index.js"]
