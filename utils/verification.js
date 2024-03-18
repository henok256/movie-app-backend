const jwt = require("jsonwebtoken");

const verifyJWT = function (req, res, next) {
  const authHeader = req.headers.authorization;

  // Check if authorization header is present and formatted correctly
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  // Verify the token using the secret key
  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Forbidden" }); // Could be invalid token or expired
    }

    // Attach decoded user data to the request object (optional)
    req.user = decoded;
    next();
  });
};

module.exports = verifyJWT;
