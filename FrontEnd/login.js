'use strict'

function authentication () {
    const formLog = document.querySelector('.login')
    formLog.addEventListener('submit', (event) => {
        event.preventDefault()

        const body = {
            "email": event.target.querySelector('[name=email]'),
            "password": event.target.querySelector('[name=password]')
        }
        console.log(body)
    })
}