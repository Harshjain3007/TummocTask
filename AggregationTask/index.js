const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')


const app = express()


app.use(express.json())


mongoose.connect("mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/childrecord-db").
then(()=>console.log('mongodb is connected')).
catch((err)=>console.log(err))


app.use("/",route)


app.listen(3000||prompt,()=>{
    console.log("app is running on port"||3000);
})