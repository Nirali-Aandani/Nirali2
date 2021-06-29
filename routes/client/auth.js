const express =  require("express")
const routes  =  express.Router()
const authController =  require("../../controller/client/authController")
routes.post("/",authController.login);


module.exports = routes;