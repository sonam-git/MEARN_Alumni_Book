// import necessary packages
<<<<<<< HEAD
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";
=======
const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
<<<<<<< HEAD
      token = token.split(" ").pop().trim();
=======
      token = token.split(' ').pop().trim();
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
<<<<<<< HEAD
      console.log(data, "im hit");
      req.user = data;
    } catch (e) {
      console.log(e);
      console.log("Invalid token");
=======
      req.user = data;
    } catch {
      console.log('Invalid token');
>>>>>>> 2577892e991a28eacb5ae745421cdf0ea014d1d2
    }

    return req;
  },
  signToken: function ({ email, username, _id }) {
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
