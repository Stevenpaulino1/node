
const path = require('path')

const express = require('express')

const admin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')
const errorController = require("./controllers/404.js")
const mongoConnect = require('./utils/database').mongoConnect
const User = require('./models/user')

const app = express()


app.set('view engine','ejs')
app.set("views", "views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next)=>{
    User.findById("5e543aa3aa78203fc2ca4bfa")
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})


app.use("/admin",admin.routes)
app.use(routesShop)




app.use(errorController.get404)


mongoConnect(()=>{

    app.listen(8003)
})


