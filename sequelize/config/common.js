const jwt = require("jsonwebtoken");

validateToken = (req, res) => {
    const token = req.cookies.token;
    if(!token) return id = 0;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
       
    return decoded.id;
};

module.exports = {
    validateToken,
};