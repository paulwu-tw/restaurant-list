const express = require('express')
const hbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})