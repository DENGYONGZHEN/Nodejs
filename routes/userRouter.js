const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// 3) routes
const router = express.Router();

router.get('/logout', authController.logout);
router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//use middleware  执行后面的代码前都会先执行这个middleware
router.use(authController.protect);

router.patch(
  '/updateMyPassword',

  authController.updatePassword,
);

router.get(
  '/me',

  userController.getMe,
  userController.getUserById,
);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

//middleware will protect all route after this
router.use(authController.restrictTo('admin'));

router.route('/').get(userController.getAllUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
