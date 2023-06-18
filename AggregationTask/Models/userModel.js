const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        requird:true,
        unique:true
     },
     gender:{
         type:String,
         required:true,
         enum:['Male','Female']
     },
     ResidentcityID:{
        type:ObjectId,
        required:true,
        ref:'city'
     },
     email:{
          type:String,
          required:true,
     },
     password:{
        type:String,
        required:true
     },
     contactNo:{
        type:Number
     },
},{timeStamps:true})


module.exports = mongoose.model('user',userSchema)
