FROM node:20.11.1-slim as base

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

ARG PAYLOAD_URL
ENV PAYLOAD_URL=${PAYLOAD_URL}
ENV NEXT_PUBLIC_PAYLOAD_URL=${PAYLOAD_URL}

ARG FRONTEND_URL
ENV FRONTEND_URL=${FRONTEND_URL}
ENV NEXT_PUBLIC_FRONTEND_URL=${FRONTEND_URL}

ARG TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=${TURNSTILE_SITE_KEY}

ARG NEXT_PUBLIC_MATOMO_SITE_ID
ENV NEXT_PUBLIC_MATOMO_SITE_ID=${NEXT_PUBLIC_MATOMO_SITE_ID}

ARG NEXT_PUBLIC_MATOMO_ENDPOINT
ENV NEXT_PUBLIC_MATOMO_ENDPOINT=${NEXT_PUBLIC_MATOMO_ENDPOINT}

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build && mkdir -p /app/.next/cache

EXPOSE 3000
ENV PORT 3000

VOLUME ["/app/.next/cache"]
CMD ["npm", "run", "start"]
