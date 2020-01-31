const path = require('path')

const express = require('express')

const admin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')
const errorController = require("./controllers/404.js")

const app = express()

app.set('view engine','ejs')
app.set("views", "views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use("/admin",admin.routes)
app.use(routesShop)

app.use(errorController.get404)

app.listen(3000)



