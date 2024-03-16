'use strict'

// Déclaration variables
const main = document.querySelector('.main')
const gallery = document.querySelector('.gallery')
gallery.innerHTML = ''

const btnAll = document.querySelector('#filter-all')
const btnObject = document.querySelector('#filter-object')
const btnApartment = document.querySelector('#filter-apartment')
const btnHotel = document.querySelector('#filter-hotel')
const filtersBtn = Array.from(document.querySelectorAll('.filters__btn'))
const btnLogin = document.querySelector('#nav__login')

let indexPosition = 0
let figure = ''
const data = []


// Récupération données via API
const dataWorks = async () => {
    return await fetch('http://localhost:5678/api/works')
        .then((res) => res.json())
}

// Utilisation de ces données pour générer la page dynamiquement
dataWorks()
    .then(works => {
        for (const work of works) data.push(work)
    })
    .then(() => {
        for (let i = 0; i < data.length; i++) {
            figure += `<figure><img src='${data[i].imageUrl}' alt='${data[i].title}'><figcaption>${data[i].title}</figcaption></figure>`
        }
        gallery.innerHTML = figure
    })


// Filtrer
const figureFiltred = (index) => {
    const filteredData = data.filter(item => item.categoryId === index)
    return filteredData.map(item => `<figure><img src='${item.imageUrl}' alt='${item.title}'><figcaption>${item.title}</figcaption></figure>`).join('')
}

const filter = (index) => {
    filtersBtn.forEach(btn => btn.classList.remove('filters__btn--active'))
    filtersBtn[index].classList.add('filters__btn--active')
    gallery.innerHTML = ''
    index === 0 ? gallery.innerHTML = figure : gallery.innerHTML = figureFiltred(index)
}


btnAll.addEventListener('click', () => {
    indexPosition = 0
    filter(indexPosition)
})
btnObject.addEventListener('click', () => {
    indexPosition = 1
    filter(indexPosition)
})
btnApartment.addEventListener('click', () => {
    indexPosition = 2
    filter(indexPosition)
})
btnHotel.addEventListener('click', () => {
    indexPosition = 3
    filter(indexPosition)
})



///////////////////////////////////////////////////////////

// Login
btnLogin.addEventListener('click', () => {
    main.innerHTML = '<section><form method="post" class="login"><h1 class="login__title">Log in</h1><div class="login__input--label"><label for="email">E-mail</label><input type="email" name="email" class="login__input"></div><div class="login__input--label"><label for="password">Mot de passe</label><input type="password" name="password" class="login__input"></div><button class="login__btn">Se connecter</button><a href="#" class="login__forgot">Mot de passe oublié</a></form></section>'
    
   async function authentication () {
        const formLog = document.querySelector('.login')
        formLog.addEventListener('submit', async (event) => {
            event.preventDefault()
            const body = {
                "email": event.target.querySelector('[name=email]').value,
                "password": event.target.querySelector('[name=password]').value
            }
            console.log(body)
            const jsonBody = JSON.stringify(body)
    
            const response = await fetch('http://localhost:5678/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonBody
            })
            const data = await response.json()
            console.log(data)
        })
    }
    authentication()
})








///////////////////////////////////////////////////////////

// fetch('http://localhost:5678/api/works')
// .then((res) => res.json())
// .then ((x) => console.log(x))