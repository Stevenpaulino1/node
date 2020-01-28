
const express = require('express')

const routesAdmin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))


app.use(routesAdmin)
app.use(routesShop)


app.listen(3000)



