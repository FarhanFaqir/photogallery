const express = require("express");
const db = require("../sequelize/models");
const { STATUS_ACTIVE, STATUS_INACTIVE } = require('../constants');
const router = express.Router();

router.get("/", async (req, res) => {
    const posts = await db.post.findAll({where : {status : STATUS_ACTIVE}})
    res.render('index', { posts : posts });
});

module.exports = router;


