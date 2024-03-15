'use strict'

const gallery = document.querySelector('.gallery')
gallery.innerHTML = ''

let figure = ''
const data = []

const dataWorks = async () => {
    return await fetch('http://localhost:5678/api/works')
        .then((res) => res.json())
}

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


fetch('http://localhost:5678/api/works')
.then((res) => res.json())
.then ((x) => console.log(x))