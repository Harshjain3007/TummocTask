const express = require("express");
const citycontroller = require("../controllers/cityController");
const usercontroller = require("../controllers/userController");
const childcontroller = require("../controllers/childController");
const router = express.Router();

router.post("/registerCity", citycontroller.registerCity);
router.get("/getCityDetails", citycontroller.getCityData);
router.post("/createUser", usercontroller.createUser);

router.post("/registerChild", childcontroller.registerChild);

router.get("/getChildDetails/:Id", childcontroller.childDetail);

router.get("/getChildren",childcontroller.getChildrenByState)

router.get("/getChildById/:Id",childcontroller.getChildById)

router.get("/getAllChildrenDetails",childcontroller.getAllChildrenDetails)

router.get("/getUserDetails/:Id",usercontroller.getUserByID)

router.get("/getAllUserDetails",usercontroller.getAllUserDetails)


module.exports = router;
