const express = require("express");
const router = express.Router();
var postModel = require("../controllers/post");
const db = require("../sequelize/models");
const path = require("path");
const { STATUS_ACTIVE } = require("../constants");

const multer = require("multer");
// Set Storage Engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init Upload
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");
// Check File Type
function checkFileType(file, cb) {
  // Allowed extension
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error : Images Only!");
  }
}

router.get("/getForm", async (req, res) => {
  const token = await db.token.findOne({
    where: { user_id: req.query.id, status: STATUS_ACTIVE },
  });
  if (token) {
    const user = await db.user.findOne({ where: { id: req.query.id } });
    res.render("user/addPost", { user: user });
  } else res.redirect("/user/login");
});

router.get("/editForm", async (req, res) => {
  const token = await db.token.findOne({ where: { user_id: req.query.id, status: STATUS_ACTIVE },});
  if (token) {
    const post = await db.post.findOne({ where: { id: req.query.post_id } });
    const user = await db.user.findOne({ where: { id: req.query.id } });
    res.render("user/editPost", { post: post , user : user });
  } else res.redirect("/user/login");
});

router.post("/add", upload, async (req, res) => {
  const post = await db.post.create({
    title: req.body.title,
    image: req.file.filename,
    user_id: req.query.id,
    status: STATUS_ACTIVE,
  });

  if (post) res.redirect(`/user/dashboard?id=${req.query.id}`);
  else
    res
      .status(500)
      .render("post/addPost", { msg: "Error : No file selected." });
});

router.post("/update", postModel.updatePost);

router.get("/delete", postModel.deletePost);

router.get("/get", postModel.getPost);

router.get("/getById", postModel.getPostById);

router.post("/search", postModel.search);

router.post("/comment", postModel.comment);

module.exports = router;
