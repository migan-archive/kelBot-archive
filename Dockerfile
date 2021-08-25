FROM node:16.6.1

RUN mkdir app
WORKDIR /app
COPY . .
RUN yarn

ENV SHELL=/bin/bash

CMD ["yarn", "start"]