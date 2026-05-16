FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts \
 && npm ci --ignore-scripts

COPY . .
RUN npm run build

# Wrangler stores D1 data in ~/.wrangler — mount a volume here for persistence
ENV HOME=/data
RUN mkdir -p /data

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["npx", "wrangler", "pages", "dev", "dist", \
     "--port", "3000", "--ip", "0.0.0.0"]
