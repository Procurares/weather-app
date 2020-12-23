const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
        + encodeURIComponent(address)
        + '.json?access_token=pk.eyJ1IjoicHJvY3VyYXJlcyIsImEiOiJja2l1Znc5ZjkyeG1rMnNsYm9yODRiZmZ2In0.gkAMp-8lHhIAh4SHRdYcjQ&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to get mapbox data')
        } else if (body.error) {
            callback(error, undefined)
        } else {
            if (body.features.length === 0) {
                callback('Unable to find features', undefined)
            } else {
                const center = body.features[0].center
                const latitude = center[1]
                const longitude = center[0]

                callback(undefined, {latitude, longitude})
            }
        }
    })
}

module.exports = geocode