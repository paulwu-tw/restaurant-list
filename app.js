const express = require('express')
const hbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

const restaurants = restaurantList.results

const app = express()
const port = 3000

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { restaurants })
})

app.get('/restaurants/:id', (req, res) => {
    const id = req.params.id
    const restaurant = restaurants.find(restaurant => restaurant.id.toString() === id)
    res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurantsFilter = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.toLowerCase().trim())
            || restaurant.category.toLocaleLowerCase().includes(keyword.toLowerCase().trim())
    })

    if (restaurantsFilter.length) {
        res.render('index', { restaurants: restaurantsFilter, keyword })
    } else {
        res.render('error', { keyword })
    }

})

app.listen(port, () => {
    console.log(`Listen on http://localhost:${port}`)
})