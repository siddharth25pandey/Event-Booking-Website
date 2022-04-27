#  Dockerfile for Node Express Backend

FROM node:14-slim

# Create App Directory
RUN mkdir -p /home/siddharth/Desktop/Event-Booking-Website/backend/index
WORKDIR /home/siddharth/Desktop/Event-Booking-Website/backend/index
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app
#WORKDIR /usr/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 4000

CMD ["npm","start"]