FROM node:12.16.2

ADD . /frontend/
WORKDIR /frontend

RUN npm install --only prod
CMD npm start
