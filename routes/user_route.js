const express = require("express");
const router = express.Router();
const { STATUS_ACTIVE } = require('../constants');
var userModel = require('../controllers/user');
const db = require("../sequelize/models");

router.get("/login", (req, res) => {
    res.render('user/login');
});

router.get("/register", (req, res) => {
    res.render('user/register');
});

router.get("/dashboard", async (req, res) => {
    const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
    if(token) {
        const posts = await db.post.findAll({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        res.render('user/dashboard',{posts : posts, user : user});
    } else res.render('user/login');
});

router.post("/searchPost", async (req, res) => {
    const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
    if(token) {
        const post = await db.post.findOne({where : {title : req.body.search,  status : STATUS_ACTIVE}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        res.render('user/searchPost',{post : post, user : user});
    } else res.render('user/login');
});

// router.post('/update', userModel.updateUser);

// router.post('/delete', userModel.deleteUser);

router.post('/register', userModel.addUser); 

router.post('/login', userModel.getUserLogin);

router.get('/logout', userModel.userLogout);

router.post('/search', userModel.search);


module.exports = router;