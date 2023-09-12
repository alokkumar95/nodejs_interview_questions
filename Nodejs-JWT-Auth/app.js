const express = require('express');
const app = express();
const mysql = require('mysql')
const db = require("./models")
const cookieParser = require('cookie-parser')
const {requireAuth} = require('./middlewares/authMiddleware')

const authRoutes = require('./routes/authRoutes')
const port = 3000


// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


// routes
app.get('/',(req,res)=>res.render('home'));
app.get("/cart",requireAuth,(req,res)=>res.render('cart'))


app.use(authRoutes)
