const express =  require("express")
const router =  express.Router()


router.use("/api/v1/user",require("./userRoutes"))

router.use("/login",require("./auth"))

module.exports = router
