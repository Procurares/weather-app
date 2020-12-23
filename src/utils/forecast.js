const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d0962ad82a66180afb7602257b0f9ad7&query=' + latitude + ',' + longitude + ''

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location.')
        } else {
            const current = body.current
            const {temperature, feelslike} = current

            callback(undefined, {
                temperature,
                feelslike,
            })
        }
    })

}

module.exports = forecast