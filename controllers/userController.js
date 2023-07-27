const AppError = require('../utils/appError');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFileds) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFileds.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = factory.getAll(User);

/* exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users: users,
    },
  });
}); */

exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password update. Please use updateMyPassword',
        400,
      ),
    );
  }
  //2) filtered out unwanted fields names that are not allowed to be update
  const filterBody = filterObj(req.body, 'name', 'email');
  //2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUserById = factory.getOneById(User);
/* exports.getUserById = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
};
 */
exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use signup instead',
  });
};

exports.patchUser = factory.patchOne(User);

/* exports.patchUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
}; */

exports.deleteUser = factory.deleteOne(User);

/* exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not yet defined',
  });
}; */
