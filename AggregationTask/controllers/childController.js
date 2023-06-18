const cityModel = require("../Models/cityModel");
const userModel = require("../Models/userModel");
const childrenModel = require("../Models/childrenModel");

const mongoose = require("mongoose");

const registerChild = async function (req, res) {
  let data = req.body;
  let { name, age, category, parentId, PlaceOfBirthId, ParentType } = data;

  let parentIdExist = await userModel.findById(parentId);
  if (!parentIdExist)
    return res.status(400).send({ message: "parent not found" });
  let PlaceOfBirthIdExistInDb = await cityModel.findById(PlaceOfBirthId);
  if (!PlaceOfBirthId)
    return res.status(400).send({ message: "City not found in Db" });

  const children = new childrenModel({
    name: name,
    age: age,
    category: category,
    parentId: parentId,
    PlaceOfBirthId: PlaceOfBirthId,
    ParentType: ParentType,
  });
  await children.save();
  return res.status(201).json(children);
};

const childDetail = async function (req, res) {
  const childId = req.params.Id;

  //const isValidObjectId = mongoose.Types.ObjectId.isValid(childId);
  const objectId = new mongoose.Types.ObjectId(childId);

  if (!objectId) {
    return res.status(400).send({ status: false, message: "Invalid ChildId" });
  }

  console.log("childId:", childId);

  try {
    const pipeLine = [
      { $match: { _id: new mongoose.Types.ObjectId(childId) } },
      {
        $lookup: {
          from: "users",
          localField: "parentId",
          foreignField: "_id",
          as: "parentDetails",
        },
      },
      {
        $unset: ["parentDetails._id","parentDetails.gender","parentDetails.password","parentDetails.ResidentcityID"]
      },

      {
        $lookup: {
          from: "cities",
          localField: "PlaceOfBirthId",
          foreignField: "_id",
          as: "PlaceOfBirthDetails",
        },
      },
      {
        $unset:["PlaceOfBirthDetails._id"]
      }
    ];

    const result = await childrenModel.aggregate(pipeLine);
    return res.status(200).send(result);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("An error occurred");
  }
};


const getChildrenByState = async function(req,res){


        const {category,state} = req.body

    const pipeLine = await [
      {
        $match: {
          category: category,
        },
      },
      {
        $lookup: {
          from: "cities",
          localField: "PlaceOfBirthId",
          foreignField: "_id",
          as: "BirthPlaceDetails",
        },
      },
      {
            $unset:["BirthPlaceDetails._id"]
      },
      {
        $match: {
          "BirthPlaceDetails.state":state
        },
      }
    ]
    
  const result = await childrenModel.aggregate(pipeLine)
   return res.send(result)
}




const getChildById = async function(req,res){
  let childId = req.params.childId
   
     let findChild = await childrenModel.findOne(childId).populate({path:"parentId",select:'name email contactNo'})
                     .populate({path:"PlaceOfBirthId",select:'name state country'})

     res.status(200).send(findChild)

}

const getAllChildrenDetails = async function(req,res){
  let getChildrenDetails = await childrenModel.find().populate({path:"parentId",select:"name email contactNo"})
                           .populate({path:"PlaceOfBirthId",select:"name state country"})
       res.status(200).send(getChildrenDetails)
}

module.exports = { registerChild, childDetail,getChildrenByState,getChildById,getAllChildrenDetails };
