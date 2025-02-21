########################################################################################################################
######################################################### BASE #########################################################
########################################################################################################################

FROM node:18-alpine AS ip_frontend_base

# Install dependencies only when needed
FROM ip_frontend_base AS ip_frontend_deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY frontend/package.json frontend/yarn.lock* frontend/package-lock.json* frontend/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f package.json ]; then npm install; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

########################################################################################################################
######################################################### DEV ##########################################################
########################################################################################################################

FROM ip_frontend_base AS ip_frontend_dev

WORKDIR /app
COPY --from=ip_frontend_deps /app/node_modules ./node_modules
COPY ./frontend .


########################################################################################################################
####################################################### BUILDER ########################################################
########################################################################################################################

# Rebuild the source code only when needed
FROM ip_frontend_base AS ip_frontend_builder

WORKDIR /app
COPY --from=ip_frontend_deps /app/node_modules ./node_modules
COPY ./frontend .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build


########################################################################################################################
###################################################### PRODUCTION ######################################################
########################################################################################################################

# Production image, copy all the files and run next
FROM ip_frontend_base AS ip_frontend_prod

ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs


CMD ["node", "server.js"]
