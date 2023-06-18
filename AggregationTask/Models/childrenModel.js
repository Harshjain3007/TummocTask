const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const childSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        min:6,
        max:25
    },
    category:{
        type:String,
        required:true,
        enum:['Teenager','Adult','child']
    },
    parentId:{
        type:ObjectId,
        required:true,
        ref:'user'
    },
    PlaceOfBirthId:{
        type:ObjectId,
        required:true,
        ref:'city'
    },
    ParentType:{
       type:String,
       required:true,
    },
    
},{timestamps:true})


module.exports = mongoose.model('child',childSchema)