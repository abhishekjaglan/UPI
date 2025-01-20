FROM node:20-alpine

WORKDIR /app

COPY package* .
COPY ./prisma .

RUN npm install typescript -g
RUN npm install
RUN npx prisma generate

COPY . .

RUN tsc -b

EXPOSE 3004
CMD [ "node", "./dist" ]