const jwt = require('jsonwebtoken');
const Users = require('../Database/Dbconnection');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

const Auth = {
  createToken(userId,email) {
    const token = jwt.sign({ id: userId, email}, JWT_SECRET, { expiresIn: '1 day' });
    return token;
  },

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { valid: true, decoded };
    } catch (error) {
      return { valid: false, error: error.message };
    }
  },

  authenticate: async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, error: 'No token provided' });
  
    const { valid, decoded, error } = Auth.verifyToken(token);
    if (!valid) return res.status(401).json({ success: false, error });
  
    try {
      // Check if the user exists in the database by email
      const existingUser = await Users.findOne({ email: decoded.email });
      if (!existingUser) {
        return res.status(404).json({ success: false, error: 'User not found for the provided email.' });
      }
  

      // Add user details to the request object
      req.userId = existingUser._id;
      req.userEmail = existingUser.email;
  
      next();
    } catch (dbError) {
      console.error('Error authenticating user:', dbError.message);
      return res.status(500).json({ success: false, error: `Database error: ${dbError.message}` });
    }
  }
  
};

module.exports = Auth;
