const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 4000;

// Middleware
app.use(cors());

// end point
app.get('/',(req,res,next)=>{

    res.status(200).send('Hi')
    // res.status(200).send(Buffer.from('<p>some html</p>'))


})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})