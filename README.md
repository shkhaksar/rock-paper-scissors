# How to run the project

### Dependencies
[Redis Server](https://redis.io/) (as cache) - It doesn't need any specific configurations, no username and password is required, assumed to run on the default port (6379) 

### Starting backend server:
Assumed to run on Port 8000, however If you want to run on another port, you can change it from `backend/bin/www`, Line 15 `var port = normalizePort(process.env.PORT || '8000')`
, you need to change  `BASE URL` config for `client` through `client/src/config.js`

Then you can start the server with changing directory to `./backend`, then execute:
#### `npm start`

###Starting Clients:

You can start clients by changing directory to `./client`, then execute:

#### `npm start`

** you can start as many clients as you want.