FROM node:20

WORKDIR /application

COPY package*.json  ./

RUN npm install

COPY . .

RUN  npm run

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "start:migrate:prod" ]