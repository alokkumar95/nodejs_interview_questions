const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    // check jwt token exists and is verified
    if(token){
        jwt.verify(token,'Interview Secret',(error,decodedToken)=>{
            if(error){
                console.log(error.message)
                res.redirect("/login")
            }else{
                console.log(decodedToken)
                next();
            }
        })

    }else{
        res.redirect("/login")
    }
}

module.exports = {requireAuth}