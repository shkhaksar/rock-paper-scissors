#Specify a base image
FROM node:12-alpine
#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install --production --silent

#Copy remaining files
COPY . .

#Build the project for production
RUN npm run build