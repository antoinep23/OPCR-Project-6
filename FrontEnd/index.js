'use strict'

// Déclaration variables
const gallery = document.querySelector('.gallery')
gallery.innerHTML = ''

const btnAll = document.querySelector('#filter-all')
const btnObject = document.querySelector('#filter-object')
const btnApartment = document.querySelector('#filter-apartment')
const btnHotel = document.querySelector('#filter-hotel')
const filtersBtn = Array.from(document.querySelectorAll('.filters__btn'))

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

// fetch('http://localhost:5678/api/works')
// .then((res) => res.json())
// .then ((x) => console.log(x))