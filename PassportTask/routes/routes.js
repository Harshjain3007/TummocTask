const express = require("express");

const usercontroller = require("../controllers/userController");
const  tokenChecker = require("../middleware/auth")

const router = express.Router();

router.post("/createProfile", usercontroller.CreateUserProfile);

router.post("/login", usercontroller.userLogin);

router.post("/logout", usercontroller.logout);

router.post("/updateUser",tokenChecker.tokenChecker,usercontroller.updateUserProfile)


module.exports = router;
