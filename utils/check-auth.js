const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");


module.exports = (context) => {
  const auth = context.req.headers.authorization;
  if (auth) {
    const token = auth.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid / Expired Token");
      }
    }
    throw new Error("Authentication Token must be 'Bearer [token]'");
  }
  throw new Error("Authentication header must be provided");
};
