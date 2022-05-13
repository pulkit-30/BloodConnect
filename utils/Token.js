const TokenModel = require('../models/token');
/**
 * Token
 * generateToken()
 * VerifyToken()
 */

/**
 * generateToken
 *
 */
function generateToken(id) {
  let token = id;
  return token;
}
async function StoreToken(id, token, email) {
  const newToken = new TokenModel({
    user: id,
    email: email,
    token: token,
  });
  await newToken.save();
}
module.exports = { generateToken, StoreToken };
