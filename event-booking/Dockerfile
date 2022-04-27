# Dockerfile for React client

# Build react client
FROM node:10.16-alpine

# Working directory be app
WORKDIR /home/siddharth/Desktop/Event-Booking-Website/event-booking/src/app

COPY package*.json ./

###  Installing dependencies

RUN npm install --silent

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]