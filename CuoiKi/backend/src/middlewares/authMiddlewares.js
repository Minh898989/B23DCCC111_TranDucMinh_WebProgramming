const jwt = require('jsonwebtoken');
const secretKey = '12345';  // This must match the key used when creating the token

const authenticate = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];  // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No Authorization header provided' });
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, verifiedUser) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    // Log the verified user to debug
    console.log('Verified user:', verifiedUser);

    // Store the verified user info in the request object
    req.verifiedUser = verifiedUser;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = { authenticate };
