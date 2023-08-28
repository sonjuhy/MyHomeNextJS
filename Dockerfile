FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -y

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

COPY --from=builder /usr/src/app/public ./public

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

EXPOSE 3000

CMD [ "npm", "run", "start"]