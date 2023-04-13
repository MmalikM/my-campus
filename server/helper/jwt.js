const jwt = require('jsonwebtoken')
const code = process.env.RHS;

const createToken = (payload) =>  jwt.sign(payload,code);
const readPayload = (token) => jwt.verify(token,code)


module.exports = {createToken,readPayload};