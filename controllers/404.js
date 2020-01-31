exports.get404 = (req,res,next)=>{
    res.status(400).render('404.ejs', {pageTitle: "Not Found yo", path:"404"})
}