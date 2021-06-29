const express =  require("express")
const router =  express.Router()

    
router.use("/user",require("./userRoutes"))

router.use("/login",require("./auth"))

module.exports = router
