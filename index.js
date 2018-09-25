
require('dotenv').config()

const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

const { APP_PROTOCOL, APP_HOSTNAME, APP_PORT } = process.env

const addresses = require('./src/addresses')

app.prepare()
    .then(addresses.prepare)
    .then(() => {
        const server = express()

        server.get('/api', addresses.middleware)

        server.get('*', (req, res) => handle(req, res))

        server.listen(process.env.APP_PORT, (err) => {
            if (err) {
                throw err
            }
            
            console.log(`> Ready on ${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })