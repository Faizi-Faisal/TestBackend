const authMiddleware = (req, res, next) => {
    // Example middleware logic
    console.log('Request received');
    next();
  };
  
  module.exports = authMiddleware;
  