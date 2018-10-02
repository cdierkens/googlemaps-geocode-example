FROM mhart/alpine-node:8 as build

WORKDIR /usr/src

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM mhart/alpine-node:base-8

WORKDIR /usr/src

ENV NODE_ENV="production"
ENV PATH="./node_modules/.bin:$PATH"

COPY --from=build /usr/src .

EXPOSE 3000

CMD ["node", "index.js"]