const db = require("../sequelize/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AvatarGenerator } = require("random-avatar-generator");
const generator = new AvatarGenerator();
const { STATUS_ACTIVE, STATUS_INACTIVE } = require("../constants");

module.exports.addUser = async (req, res) => {
  const { username, email, password, confirmpassword, ageradio, tos } =
    req.body;

  const email_exist = await db.user.findOne({
    where: { email, status: STATUS_ACTIVE },
  });

  if (email_exist)
    res.status(403).render("user/register", { msg: "Email already exist." });
  // else if(password.lenght < 5) res.status(403).render("user/register", { msg: "Password must be six characters long." });
  else if (password != confirmpassword)
    res.status(403).render("user/register", { msg: "Password not matched." });
  else {
    const avatar = generator.generateRandomAvatar("avatar");

    // const hash = await bcrypt.hashSync(password, 10);

    const user = await db.user.create({
      username,
      email,
      password,
      age: ageradio,
      terms: tos,
      status: STATUS_ACTIVE,
    });
    if (user) {
      res.status(200).redirect("/user/login");
    } else {
      res.status(500).render("user/register", { msg: "Somthing went wrong." });
    }
  }
};

module.exports.updateUser = async (req, res) => {};

module.exports.deleteUser = async (req, res) => {};

module.exports.getUser = async (req, res) => {};

module.exports.getUserLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email)
    res.status(403).render("user/login", { msg: "Email is required." });
  if (!password)
    res.status(403).render("user/login", { msg: "Password is required." });
  else {
    const user = await db.user.findOne({
      where: { email, status: STATUS_ACTIVE },
    });
    if (user) {
      // const valid = await bcrypt.compareSync(password, user.password);      
      // res.send(valid)
      // if (valid) {
        const token = jwt.sign({ id: user.id }, 'photolab');
        if (token) {
          await db.token.create({ token, user_id: user.id });
          res.status(200).redirect(`/user/dashboard?id=${user.id}`);
        }
      // } else res.status(403).render("user/login", { msg: "Invalid pass." });
    } else res.status(403).render("user/login", { msg: "Invalid Credentials." });
  }
};

module.exports.userLogout = async (req, res) => {
  await db.token.update(
    { status: STATUS_INACTIVE },
    { where: { user_id: req.query.id, status: STATUS_ACTIVE } }
  );
  res.redirect("/");
};

module.exports.search = async (req, res) => {
  const post = await db.post.findAll({ where: { title: req.body.search } });
  if (post) res.status(200).redirect("user/searchPost", { post: post });
};
