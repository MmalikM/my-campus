
const { readPayload } = require("../helper/jwt");
const { User } = require("../models");

async function authentification(req, res, next) {
  try {
    let token = req.headers.token;
    if (!token) throw { name: "Unauthenticated" };
    let payload = readPayload(token);
    let user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authentification;
