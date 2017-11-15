const express = require('express');
const router = express.Router();
let userController = require("../Controller/userController");
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get("/SetMySQL", function (req, res, next) {
    userController.SetMySQL(req, res, next);
});

router.post("/userRegister", function (req, res, next) {
    userController.userRegister(req, res, next);
});

router.post("/userSignin", function (req, res, next) {
    userController.userSignin(req, res, next);
});
router.get('/hostList',function(req,res,next){
     userController.hostList(req, res, next);
})
router.post('/removeList',function(req,res,next){
    userController.removeList(req,res,next);
})
router.post('/forgetpassword',function(req,res,next){
    userController.forgetpassword(req,res,next);
})

module.exports = router;
