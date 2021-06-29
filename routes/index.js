const express = require("express")
const router =  express.Router()

router.use("/admin",require("./admin/index"));
router.use("/device",require("./device/index"));
router.use("/client",require("./client/index"));
router.use("/desktop",require("./desktop/index"));

module.exports =router