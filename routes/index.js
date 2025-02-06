const express = require("express");
const router = express.Router();
const UserRoutes=require("./user/Auth");
router.use("/v1",UserRoutes);
module.exports=router;