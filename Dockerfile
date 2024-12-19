FROM node:14.17.0-alpine3.13

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" , "run dev" ]