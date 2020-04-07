
const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const {password} = require('./mykeys.js')


const admin = require('./routes/admin')
const routesShop = require('./routes/shop')
const bodyParser = require('body-parser')
const errorController = require("./controllers/404.js")
const User = require('./models/user')


const app = express()


app.set('view engine','ejs')
app.set("views", "views")

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next)=>{
    User.findById("5e8cd4f12548b3531898feed")
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log("APP ERROR",err))
})


app.use("/admin",admin.routes)
app.use(routesShop)




app.use(errorController.get404)

mongoose.connect(`mongodb+srv://stevenpaulino1:${password}@cluster0-13cav.mongodb.net/shop?retryWrites=true&w=majority
`).then(result=>{
    User.findOne().then(user =>{
        if (!user){
            const user = new User({
                name: "Steven Paulino",
                email: "test@gmail.com",
                cart: { items: []}
            })

            user.save()
        }
    })
    app.listen('8003')
}).catch(err => console.log(err))


