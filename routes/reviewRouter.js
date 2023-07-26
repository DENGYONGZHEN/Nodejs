const express = require('express');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

//只用于这个路由的中间件可以放在这个路由中
//router.param('id', tourController.checkID);
//get(中间件, 控制器)

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.postReview,
  );
router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(reviewController.patchReview)
  .delete(reviewController.deleteReview);

module.exports = router;
