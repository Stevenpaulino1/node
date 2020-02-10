
const path = require('path')

const express = require('express')

const admin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')
const errorController = require("./controllers/404.js")
const mongoConnect = require('./utils/database').mongoConnect

const app = express()


app.set('view engine','ejs')
app.set("views", "views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

// app.use((req,res,next)=>{
//     next()
// })
app.use("/admin",admin.routes)
app.use(routesShop)




app.use(errorController.get404)


mongoConnect(()=>{
    console.log('CLIENT');
    app.listen(8003)
})


