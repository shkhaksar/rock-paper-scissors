#Specify a base image
FROM node:12-alpine

#Copy the dependencies file
COPY package.json .
COPY package-lock.json .
RUN npm ci --silent

#Copy remaining files
COPY . .
EXPOSE 8000
ENTRYPOINT ["sh","./entrypoint.sh"]