const NodeCache = require( "node-cache" )
const maps = require('@google/maps')
const cache = new NodeCache()

const googleMapsClient = maps.createClient({
    key: 'AIzaSyC2PdbxM6c-r9VTdzb5HtrARnPZu-XylH4',
    Promise: Promise
})

const path = require('path')
const fs = require('fs')
const parse = require('csv-parse')
const transform = require('stream-transform')

function middleware (res, req, next) {
    req.json({
        addresses: cache.mget(cache.keys())
    })
} 

function prepare () {
    return new Promise((resolve, reject) => {
        function geocode (iterator) {
            let { value, done } = iterator.next()
        
            if (done) {
                resolve();
                return;
            }
        
            if (!value || value === 'Address' || cache.get(value)) {
                geocode(iterator)
                return;
            }
        
            console.log('Processing address: ', value)
        
            googleMapsClient
                .geocode({
                    address: value
                })
                .asPromise()
                .then((response) => {
                    console.log('Caching address: ', value)
                    cache.set(value, response.json.results[0])
                    geocode(iterator)
                })
                .catch((err) => {
                    console.error(err);
                })
        }        

        const input = fs.createReadStream(path.join(__dirname, '..', 'addresses.csv'));
        const addresses = [];
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