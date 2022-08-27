const router = require('express').Router();
const {
  getUser,
  getOneUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndIsAdmin,
} = require('../middlewares/verifyToken');

// find me
router.get('/find-me', verifyToken, getUser);

// Get one user
router.get('/:id', verifyTokenAndIsAdmin, getOneUser);

// Get all user
router.get('/', verifyTokenAndIsAdmin, getAllUsers);

// Update user
router.put('/:id', verifyTokenAndAuthorization, updateUser);

// Delete user
router.delete('/:id', verifyTokenAndIsAdmin, deleteUser);

module.exports = router;
