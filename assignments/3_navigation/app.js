const express = require('express')
const path = require("path")
const routes = require("./routes/index")


const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.use(routes)

app.use((req,res,next)=>{
    res.status(404).send("<h1>Not found</h1>")
    
})


app.listen(5000)