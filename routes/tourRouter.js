const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

//只用于这个路由的中间件可以放在这个路由中
//router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTours).post(tourController.postTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.patchTour)
  .delete(tourController.deleteTour);

module.exports = router;
