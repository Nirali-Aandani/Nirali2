const express =  require("express")
const routes  =  express.Router()
const authController =  require("../../controller/admin/authController")
routes.post("/",authController.login);


module.exports = routes;