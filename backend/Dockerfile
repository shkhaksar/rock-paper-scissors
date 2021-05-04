#Specify a base image
FROM node:12-alpine
#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install --silent

#Copy remaining files
COPY . .

EXPOSE 8000

ENTRYPOINT ["node", "./bin/www"]