require('dotenv').config()

module.exports = {
    database: {
        development: {
            username: process.env.DEV_DB_USER,
            password: process.env.DEV_DB_PASS,
            database: process.env.DEV_DB_NAME,
            host: process.env.DEV_DB_HOST,
            port:process.env.DEV_DB_PORT,
            dialect: 'postgres',
        },
        test: {
            username: process.env.TEST_DB_USER,
            password: process.env.TEST_DB_PASS,
            database: process.env.TEST_DB_NAME,
            host: process.env.TEST_DB_HOST,
            port: process.env.TEST_DB_PORT,
            dialect: 'postgres',
        },
        production: {
            username: process.env.PROD_DB_USER,
            password: process.env.PROD_DB_PASS,
            database: process.env.PROD_DB_NAME,
            host: process.env.PROD_DB_HOST,
            port: process.env.PROD_DB_PORT,
            dialect: 'postgres'
        }
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    },
    secret: process.env.SECRET_KEY
}