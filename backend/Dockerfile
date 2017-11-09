FROM node:7.7.1

ENV NODE_PATH /usr/src/lib/node_modules/
ENV PATH ${NODE_PATH}/.bin:${PATH}

RUN mkdir -p /usr/src/server; mkdir -p /usr/src/lib
WORKDIR /usr/src/server

COPY . .
RUN cp ./package.json /usr/src/lib/; cp ./yarn.lock /usr/src/lib/
RUN cd /usr/src/lib/; yarn

EXPOSE 5000

CMD ["npm", "run", "start"]
