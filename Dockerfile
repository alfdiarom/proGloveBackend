# build stage
FROM node:14.17.3

WORKDIR /src

COPY . ${WORKDIR}

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "-u", "v2_start" ]
