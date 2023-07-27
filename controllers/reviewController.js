const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.postReview = factory.postOne(Review);

/* exports.postReview = catchAsync(async (req, res, next) => {
  //TODO: 不应该直接用req.body
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
}); */

exports.getAllReviews = factory.getAll(Review);

/* exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) {
    filter = { tour: req.params.tourId };
  }
  const reviews = await Review.find(filter);
  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      review: reviews,
    },
  });
}); */

exports.patchReview = factory.patchOne(Review);

/* exports.patchReview = catchAsync(async (req, res, next) => {
  const review = await Review.findByIdAndUpdate(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      review: review,
    },
  });
}); */

exports.getReviewById = factory.getOneById(Review);

/* exports.getReviewById = catchAsync(async (req, res, next) => {
  const reviews = await Review.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      review: reviews,
    },
  });
}); */

exports.deleteReview = factory.deleteOne(Review);

/* exports.deleteReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      review: reviews,
    },
  });
});
 */
