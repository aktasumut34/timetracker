FROM node:20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start"]