FROM node:14.19.0-stretch

COPY . /app
WORKDIR /app

CMD [ "yarn" ]

CMD [ "yarn", "start" ]

EXPOSE 3100