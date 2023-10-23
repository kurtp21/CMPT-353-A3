FROM node:latest
EXPOSE 8080

WORKDIR /usr/src/app

COPY *.json .
COPY server.js .
COPY pages/* pages

RUN npm install express --save
RUN npm install -g body-parser
RUN npm install -g loadtest
RUN npm install -g nodemon

CMD [ "/bin/bash" ]