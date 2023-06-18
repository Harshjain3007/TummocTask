const userModel = require('../Models/userModel')
const cityModel = require('../Models/cityModel')

const mongoose = require('mongoose')

const createUser =  async function(req,res){
    try{
  let data = req.body
  let {name,gender,parentType,ResidentcityID,email, password,contactNo} = data
    let cityExistInDb = await cityModel.findById({_id:ResidentcityID})
    if(!cityExistInDb)  return res.status(400).send({message:'No such city exist'})
const user = new userModel({
    name:name,
    gender:gender,
    parentType:parentType,
    ResidentcityID:ResidentcityID,
    email:email,
    password:password,
    contactNo:contactNo,
})
await user.save()

return res.status(201).json(user)
    }catch(error){
        return res.status(500).send(error.message)
    }
}



const getAllUserDetails = async function(req,res){
    try{

        let userDetails = await userModel.find().populate({path:"ResidentcityID",select:'name state country'})

        res.status(200).send(userDetails)

    }catch(error){
        console.log({message:error.message});
    }
}

const getUserByID = async function(req,res){
    try{
    let userId = req.params.userId

    let findUser = await userModel.findOne(userId).populate({path:"ResidentcityID",select:'name state country'})
     console.log(findUser);
     
    if(!findUser){
        return res.status(400).send({message:'user not found'})
    }


    return res.status(200).send(findUser)
}catch(error){
    return res.status(500).send({message:error.message})
}

}




module.exports = {createUser,getUserByID,getAllUserDetails}