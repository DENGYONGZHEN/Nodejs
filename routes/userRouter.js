const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// 3) routes
const router = express.Router();

router.post('/signup', authController.signup);

router.route('/').get(userController.getAllUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
