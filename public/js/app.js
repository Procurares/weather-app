console.log('Client side js file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector("#search")
const label = document.querySelector('#label')
const message = document.querySelector('#message')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    label.textContent = 'Loading'
    message.textContent = ""

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                label.textContent = 'Error'
                message.textContent = data.error
            } else {
                label.textContent = 'Temperature in ' + location
                message.textContent = data.temperature
            }
        })
    })
})