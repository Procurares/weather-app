const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'This is weather',
        name: 'Roman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is about',
        name: 'Roman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is help',
        name: 'Roman',
        helpText: 'Anything you want you can find here'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                latitude,
                longitude,
                temperature: forecastData.temperature,
                feelslike: forecastData.feelslike
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Web page not found',
        name: 'Roman',
        errorMessage: 'Unable to find help article'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Web page not found',
        name: 'Roman',
        errorMessage: 'No results'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})