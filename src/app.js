const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Desafio',
        name: 'Fabricio Barreto Nogueira',
        style:'life.css'
    })
})

app.get('/numero-romano', (req, res) => {
    res.render('converter', {
        title: 'Desafio',
        name: 'Fabricio Barreto Nogueira',
        style:'converter.css'
    })
})

app.get('/divisor-de-conta', (req, res) => {
    res.render('divisorConta', {
        title: 'Desafio',
        name: 'Fabricio Barreto Nogueira',
        style:'divisorConta.css'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port +'.')
})