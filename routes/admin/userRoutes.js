var express = require('express');
var router = express.Router();
var rateLimit=require('express-rate-limit');

const userController = require("../../controller/admin/userController")
const auth = require("../../middleware/auth");
