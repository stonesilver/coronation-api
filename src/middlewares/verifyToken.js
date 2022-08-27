const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You're not authenticated" });
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role !== 'user') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthenticated' });
    }
  });
};

const verifyTokenAndIsAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'user') {
      next();
    } else {
      res.status(403).json({ message: 'Unauthenticated', err: req.user.role  });
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
};
