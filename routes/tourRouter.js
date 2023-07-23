const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

//只用于这个路由的中间件可以放在这个路由中
//router.param('id', tourController.checkID);
//get(中间件, 控制器)
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.postTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
