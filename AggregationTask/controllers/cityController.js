const cityModel = require('../Models/cityModel')



const registerCity = async function(req,res){
    try{
    let data = req.body
    let {name,category,RegionalLanguage,state,country} = data
    let saveData = await cityModel.create(data)
    res.status(201).json(saveData)
    }catch(error){
        res.status(500).send({status:false,msg:error.msg})
    }
}



const getCityData = async function(req,res){
        try{
        const getCities=  await cityModel.find()
        return res.status(200).send(getCities)
        }catch(error){
            res.status(500).send({message:error.message})
        }
}


module.exports={registerCity,getCityData}
