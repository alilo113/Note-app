const jwt = require('jsonwebtoken');
const User = require('../../server/module/user');

module.exports = async (req, res, next) => {
    try {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        return res.status(401).send('Authorization header missing');
      }
  
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      
      if (!user) {
        throw new Error();
      }
      
      req.user = user;
      next();
    } catch (err) {
      res.status(401).send('Please authenticate');
    }
  };  