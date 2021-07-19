### Project dependencies:
- [Redis Server](https://redis.io/) (as cache) - Configuration can be found in `.env.example` which will be used by `/backend/bin/redis.js`. 
- The project use `PostgreSQL` as the database. The configuration can be found in `.env.example`.

### Backend Server (NodeJS)
It's Assumed to run on Port `8000`. If you want to run it on another port, the configuration can be found under `/backend/bin/www`.

### Client (ReactJS):
The client has no configuration except for `BASE_URL`, which can be found under `/client/src/config.js`

P.S.: You can start as many clients as you want.
