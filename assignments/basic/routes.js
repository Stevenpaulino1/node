const routeHandler = (req,res)=>{
    const url = req.url
    const method = res.method
    
    if(url === "/"){
        res.setHeader('Content-Type', 'text/html');

        res.write("<html>")
        res.write("<head><title>My first node page</title></head>")
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>');
        res.write("<html>")
        return res.end()
    }
    if(url === "/users"){
        res.setHeader('Content-Type', 'text/html');
        res.write("<html><body><ul><li>Steven</li><li>Max</li><li>Shy</li></ul></body></html>")
        return res.end()
    }
    if(url ==="/create-user"){
        const body =[]
        
        req.on("data",(chunk)=>{
            console.log(chunk);
            
            body.push(chunk)
            
        })
        req.on("end", ()=>{
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody);
            
        })
        res.statusCode = 302
        res.setHeader("Location","/users")
        return res.end()
    }
}

module.exports = routeHandler


