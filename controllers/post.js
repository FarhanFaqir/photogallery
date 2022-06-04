const db = require("../sequelize/models");
const { STATUS_ACTIVE, STATUS_INACTIVE } = require("../constants");
const { QueryTypes, sequelize } = require("sequelize");
const express = require("express");
const app = express();

module.exports.addPost = async (req, res) => {};

module.exports.updatePost = async (req, res) => {
  res.send('Update post');
};

module.exports.deletePost = async (req, res) => {
  const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
  if(token) {
        await db.post.update({status : STATUS_INACTIVE}, {where : {id : req.query.post_id, user_id : req.query.id}});
        const posts = await db.post.findAll({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        res.render('user/dashboard',{posts : posts, user : user});
  } else res.render('user/login');
};

module.exports.getPost = async (req, res) => {
  const token = await db.token.findOne({
    where: { user_id: req.query.id, status: STATUS_ACTIVE },
  });
  if (token) {
    const posts = await db.post.findAll({ where: { status: STATUS_ACTIVE } });
    const user = await db.user.findOne({ where: { id: req.query.id } });
    const newArr = posts.map(v => ({v, user: user.id}));
    // res.send(newArr)
    res.render("user/allPosts", { posts: newArr, user: user });
  } else res.render("user/login");
};

module.exports.getPostById = async (req, res) => {
  const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
  if(token) {
      const post = await db.post.findOne({where : { id : req.query.post_id, status : STATUS_ACTIVE}})
      const user = await db.user.findOne({ where : { id : req.query.id }});
      const data =  await db.sequelize.query(
        `SELECT c.comment, u.id as user_id, u.username , p.id as post_id, p.title, p.image
          FROM comments c
          JOIN users u ON c.user_id = u.id
          JOIN posts p ON c.post_id = p.id
          WHERE c.post_id = ${req.query.post_id}
           AND c.status = ${STATUS_ACTIVE}`,
          
        { type: QueryTypes.SELECT }
      );
      if(data) res.render('user/postDetail',{data : data, user : user , post : post});

  } else res.render('user/login');
};

module.exports.search = async (req, res) => {
  const search = req.body.search;

  const post = await db.post.findAll({ where: { title: search } });
  if (post) res.status(200).render("searchPost", { post: post });
};

module.exports.comment = async (req, res) => {
  const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}});
  if(token) {
    const comment = await db.comment.create({
      comment : req.body.comment,
      user_id : req.query.id,
      post_id : req.query.post_id
    });
    if(comment) {
        const posts = await db.post.findAll({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.redirect('back');
    } else res.send('Something wrong')
  }
};
