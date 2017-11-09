FROM node:7.7.1

ENV NODE_PATH /usr/src/lib/node_modules/
ENV PATH ${NODE_PATH}/.bin:${PATH}
WORKDIR /usr/src/client

RUN mkdir -p /usr/src/client; mkdir -p /usr/src/lib

COPY . .
# RUN cp ./package.json /usr/src/lib/; cp ./yarn.lock /usr/src/lib/
RUN cd /usr/src/lib; yarn

EXPOSE 3000

CMD ["npm", "run", "start"]