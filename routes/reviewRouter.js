const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

//接收重写路由后传递的参数，用{ mergeParams: true }
const router = express.Router({ mergeParams: true });

//只用于这个路由的中间件可以放在这个路由中
//router.param('id', tourController.checkID);
//get(中间件, 控制器)

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.postReview,
  );
router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.patchReview,
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview,
  );

module.exports = router;
