### Project dependencies:
- [Redis Server](https://redis.io/) (as cache) - It doesn't need any specific configurations, no username and password is required, assumed to run on the default port (`6379`). The configuration can be found in `/backend/config.json` which will be used by `/backend/bin/redis.js`. 
- For database, the project use file-based `SQLite` by default, however you can use `MySQL`/`PostgreSQL` as well. The configuration can be found in `/backend/bin/db.js`.

### Backend Server (NodeJS)
It's Assumed to run on Port `8000`. If you want to run it on another port, the configuration can be found under `/backend/bin/www`.

### Client (ReactJS):
The client has no configuration except for `BASE_URL`, which can be found under `/client/src/config.js`

P.S.: You can start as many clients as you want.