FROM node:16.6.1

RUN yarn

WORKDIR /home/node/app

CMD ["yarn", "start"]