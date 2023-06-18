const mongoose = require('mongoose')


const citySchema  = new mongoose.Schema({
       name:{
         type:String,
        required:true,
        unique:true
       },
       category:{
        type:String,
        required:true,
        enum:['Tier1','Tier2','Tier3']
       },
       RegionalLanguage:
       {
        type:String,
        required:true,
       },
       state:{
          type:String,
          required:true
       },
       country:{
          type:String,
          default:"India"
          }

},{timeStamps:true})


module.exports= mongoose.model('city',citySchema)