FROM node:current-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN apk --update add imagemagick
RUN npm install
RUN npm install pm2 -g

EXPOSE 5000
CMD [ "pm2-runtime", "web.js" ]
