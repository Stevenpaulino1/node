const path = require('path')

const express = require('express')

const routesAdmin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))


app.use("/admin",routesAdmin)
app.use(routesShop)

app.use((req,res,next)=>{
    res.status(400).sendFile(path.join(__dirname,'views', 'not-found.html'))
})

app.listen(3000)



