FROM node:18-slim as base

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

## Install Dependencies
FROM base AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force


## Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

ARG PAYLOAD_URL
ENV PAYLOAD_URL=${PAYLOAD_URL}

ARG FRONTEND_URL
ENV FRONTEND_URL=${FRONTEND_URL}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build && chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "start"]
