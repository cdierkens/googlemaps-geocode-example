const maps = require('@google/maps')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const _ = require('lodash')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ addresses: [], count: 0 })
  .write()

const googleMapsClient = maps.createClient({
    key: process.env.GOOGLE_MAPS_API_KEY,
    Promise: Promise
})

const path = require('path')
const fs = require('fs')
const parse = require('csv-parse')
const transform = require('stream-transform')

function middleware (req, res, next) {
    let addresses = db.get('addresses')
    
    _.forEach(req.query, function(value, key) {
        addresses = addresses.filter((address) =>  _.get(address, key) === value ) 
    })

    addresses.uniqBy((address) => _.get(address, "formatted_address"))

    res.json({
        count: addresses.size(),
        addresses: addresses.value()
    })
}

function prepare () {
    return new Promise((resolve, reject) => {
        function geocode (iterator) {
            let { value, done } = iterator.next()
        
            if (done) {
                resolve()
                return
            }
        
            let skipProcessing = !value || value === 'Address' || db.get('addresses').find({ id: value }).value()

            if (skipProcessing) {
                geocode(iterator)
                return
            }

            console.log('Geocode address: ', value)
        
            googleMapsClient
                .geocode({
                    address: value
                })
                .asPromise()
                .then((response) => {
                    console.log('Storing address: ', value)
                    
                    db.get('addresses')
                        .push(Object.assign({
                            id: value
                        }, response.json.results[0]))
                        .write()

                    db.update('count', n => n + 1)
                        .write()

                    geocode(iterator)
                })
                .catch((err) => {
                    console.error(err)
                })
        }        

        const input = fs.createReadStream(path.join(__dirname, '..', 'addresses.csv'))
        const addresses = []
        const transformer = transform(data => {
            const [ address ] = data
            addresses.push(address)   
        }, () => {
            const addressIterator = addresses[Symbol.iterator]()
            geocode(addressIterator)
        })
        
        input.pipe(parse()).pipe(transformer)
    })
}

module.exports = {
    prepare,
    middleware
}