const jwt = require('jsonwebtoken');
const db = require("../models/index");

const {User} = db;

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    // check jwt token exists and is verified
    if(token){
        jwt.verify(token,'Interview Secret',(error,decodedToken)=>{
            if(error){
                console.log(error.message)
                res.redirect("/login")
            }else{
                next();
            }
        })

    }else{
        res.redirect("/login")
    }
}

// check current user
const checkUser = (req,res,next)=>{
    const token = req.cookies.jwt;

    // check jwt token exists and is verified
    if(token){
        jwt.verify(token,'Interview Secret',async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findOne({where:{
                    id:decodedToken.id
                }})
                res.locals.user = user
                next();

            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}

module.exports = {requireAuth,checkUser}